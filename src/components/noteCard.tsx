import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { X } from "lucide-react"

interface NoteCardProps{
  note: {
    id: string,
    date: Date,
    content: string
  },
  onNoteDeleted: (id:string) => void
};

export function NoteCard(props: Readonly<NoteCardProps>){

  return(
      <Dialog.Root>
        <Dialog.Trigger className="rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
          
          <span className="text-sm font-medium text-slate-300">
            {formatDistanceToNow(props.note.date, {locale: ptBR, addSuffix: true})}
          </span>
          <p className="text-sm leading-6 text-slate-400">
            {props.note.content}
          </p>

          <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
        </Dialog.Trigger>

        <Dialog.Portal>
          
          <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
          <Dialog.Content className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md outline-none overflow-hidden">

            <Dialog.Close className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 rounded-bl-md hover:text-slate-100">
              <X className="size-5"/>
            </Dialog.Close>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(props.note.date, {locale: ptBR, addSuffix: true})}
              </span>
              <p className="text-sm leading-6 text-slate-400">
                {props.note.content}
              </p>
            </div>

            <button 
            type="button"
            className="w-full text-center py-4 text-sm bg-slate-800 text-slate-300 outline-none font-medium group">
              Deseja <span
                      onClick={() => props.onNoteDeleted(props.note.id)}
                      className="text-red-400 group-hover:underline"
                      role="button">
                        apagar essa nota
                      </span>?
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}