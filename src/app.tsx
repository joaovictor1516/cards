import logo from "./assets/logo-nlw-expert.svg"
import { NoteCard} from "./components/noteCard"
import { NewNoteCard } from "./components/newNoteCard"

const note = {
  date: new Date,
  content: "Olá mundo"
}

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo nlw expert" />

      <form className="w-full">
        <input 
          type="text" 
          placeholder="Busque em suas notas..." 
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
         />
      </form>

      <div className="h-px bg-slate-700"/>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard/>
        <NoteCard note={note}/>
        <NoteCard note={{
          date: new Date(2021, 9, 18),
          content:"Novo conteudo"
        }}/>
      </div>
    </div>
)
}
