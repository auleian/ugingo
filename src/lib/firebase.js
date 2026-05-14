// Firebase auth wrapper. One file, all consumers go through these helpers.
// Config values come from Vite env vars (VITE_FIREBASE_*) loaded from
// .env.local locally and from Vercel env vars in production. The values
// themselves are NOT secrets — Firebase web config is meant to be public;
// security comes from Firebase Auth's Authorized Domains list and Firestore
// rules.

import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut as fbSignOut,
  updateProfile,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

// --- React hook ----------------------------------------------------------

// Firebase only fires `onAuthStateChanged` on sign-in/out — *not* on
// `updateProfile()`. So updates to displayName don't propagate to consumers
// unless we nudge them. Tiny pub/sub: `updateDisplayName()` calls bumpProfile()
// after the underlying Firebase write completes, every `useUser` re-reads
// `auth.currentUser` (which Firebase has already updated in place).
let profileVersion = 0
const profileListeners = new Set()
function bumpProfile() {
  profileVersion += 1
  for (const l of profileListeners) l(profileVersion)
}

// useUser() — subscribe to auth state. Returns:
//   { user, loading } where `user` is the Firebase User (with .email, .uid,
//   .displayName, .photoURL) or null when signed out. `loading` is true on
//   the first render before Firebase has finished its initial check, so
//   route guards can avoid a flash of "/sign-in".
export function useUser() {
  const [user, setUser] = useState(auth.currentUser)
  const [loading, setLoading] = useState(auth.currentUser === null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    const onBump = () => setUser(auth.currentUser)
    profileListeners.add(onBump)
    return () => {
      unsub()
      profileListeners.delete(onBump)
    }
  }, [])

  return { user, loading }
}

// useUserDisplay() — convenience over useUser(). Centralises the display
// fallbacks so every screen renders the same thing:
//   - `name`    : `user.displayName` if set, otherwise the email (per spec:
//                 greet by email when no name is on file).
//   - `initial` : first letter of `name`, uppercased — used for the round
//                 "A" badge in the AppHeader and the avatar chip in Settings.
//   - `email`   : `user.email` (always populated for email-pwd + Google auth).
// All three are empty strings while not signed in; `loading` mirrors useUser().
export function useUserDisplay() {
  const { user, loading } = useUser()
  if (!user) return { name: '', initial: '?', email: '', loading }
  const name = user.displayName || user.email || 'Friend'
  const initial = (name[0] || '?').toUpperCase()
  return { name, initial, email: user.email || '', loading: false }
}

// --- helpers -------------------------------------------------------------

// Sign up with email/password. Auto-derives a display name from the email
// local-part so the rest of the app (Welcome, Profile, MyAccount, EditProfile)
// has something to show right away — falls back gracefully if missing.
export async function signUpWithEmail({ email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  const localPart = (email.split('@')[0] || '').slice(0, 24)
  const displayName = localPart
    ? localPart.charAt(0).toUpperCase() + localPart.slice(1)
    : 'Friend'
  try {
    await updateProfile(cred.user, { displayName })
  } catch {
    // non-fatal — account exists either way
  }
  return cred.user
}

export async function signInWithEmail({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider)
  return cred.user
}

export async function sendResetEmail(email) {
  await sendPasswordResetEmail(auth, email)
}

export async function signOut() {
  await fbSignOut(auth)
}

// Update the signed-in user's display name. Reflected immediately in
// auth.currentUser.displayName, then bumpProfile() nudges every useUser /
// useUserDisplay subscriber to re-read (Firebase doesn't refire
// onAuthStateChanged for profile edits).
export async function updateDisplayName(displayName) {
  if (!auth.currentUser) throw new Error('Not signed in.')
  await updateProfile(auth.currentUser, { displayName })
  bumpProfile()
}

// Friendly auth error message for inline display. Firebase's raw codes
// look like "auth/wrong-password" — map the common ones to plain English.
export function friendlyAuthError(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/email-already-in-use':
      return 'That email is already registered. Try signing in instead.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email or password is incorrect.'
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.'
    case 'auth/network-request-failed':
      return 'Network problem — check your connection and try again.'
    case 'auth/too-many-requests':
      return 'Too many attempts — wait a minute and try again.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
