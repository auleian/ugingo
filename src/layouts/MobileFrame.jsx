export default function MobileFrame({ children }) {
  return (
    <div className="min-h-[100dvh] w-full flex bg-white sm:bg-zinc-100 sm:items-center sm:justify-center sm:p-6">
      <div className="relative flex flex-col w-full h-[812px] bg-white overflow-hidden sm:w-[374px] sm:rounded-[40px] sm:shadow-2xl sm:ring-1 sm:ring-black/5 mx-auto">
        {children}
      </div>
    </div>
  )
}
