import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Mascot from '../components/Mascot'
import SelectableOption from '../components/SelectableOption'
import flagLuganda from '../assets/flag-luganda.png'
import flagLangi from '../assets/flag-langi.png'
import flagLugisu from '../assets/flag-lugisu.png'
import flagLusoga from '../assets/flag-lusoga.png'
import flagAteso from '../assets/flag-ateso.png'
import flagRuyankore from '../assets/flag-ruyankore.png'
import flagRunyoro from '../assets/flag-runyoro.png'

const LANGUAGES = [
  { id: 'luganda', label: 'Luganda', flag: flagLuganda, available: true },
  { id: 'langi', label: 'Langi', flag: flagLangi, available: false },
  { id: 'lugbara', label: 'Lugbara', flag: flagLangi, available: false },
  { id: 'lugisu', label: 'Lugisu', flag: flagLugisu, available: false },
  { id: 'lusoga', label: 'Lusoga', flag: flagLusoga, available: false },
  { id: 'ateso', label: 'Ateso', flag: flagAteso, available: false },
  { id: 'ruyankore', label: 'Ruyankore', flag: flagRuyankore, available: false },
  { id: 'runyoro', label: 'Runyoro', flag: flagRunyoro, available: false },
]

function FlagThumb({ src, dimmed }) {
  return (
    <span className="inline-block w-[30px] h-[20px] rounded-[2px] overflow-hidden bg-[#e8e8f4] relative">
      {src && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {dimmed && <span className="absolute inset-0 bg-[rgba(48,44,44,0.55)] backdrop-blur-[1px]" />}
    </span>
  )
}

export default function Languages() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('luganda')

  function handleSelect(id) {
    setSelected(id)
    setTimeout(() => navigate('/question/1'), 200)
  }

  return (
    <div className="flex-1 bg-white relative overflow-y-auto">
      <Mascot
        variant="default"
        size={70}
        withCircle={false}
        className="absolute top-[80px] left-[27px]"
      />
      <div className="absolute top-[82px] left-[117px] w-[228px] h-[84px] bg-[rgba(85,137,244,0.05)] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-4 pt-3">
        <p className="text-left text-[18px] font-baloo font-bold leading-snug text-[#1e1c1c]">
          What language would you like to learn?
        </p>
      </div>
      <div className="absolute top-[232px] left-[12px] w-[335px] flex flex-col gap-[18px]">
        {LANGUAGES.map((lang) => (
          <SelectableOption
            key={lang.id}
            leading={<FlagThumb src={lang.flag} dimmed={!lang.available} />}
            selected={selected === lang.id && lang.available}
            disabled={!lang.available}
            onClick={() => handleSelect(lang.id)}
            style={{ height: 47 }}
          >
            {lang.label}
          </SelectableOption>
        ))}
      </div>
    </div>
  )
}
