import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import {toast} from "sonner"

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
};

export function NewNoteCard(props: NewNoteCardProps){

  const [shouldShowText, setShouldShowText] = useState(true);
  const [userText, setUserText] = useState("");

  function handleTextEditor(){
    setShouldShowText(false);
  }

  function handleText(event:ChangeEvent<HTMLTextAreaElement>){
    setUserText(event.target.value);

    if(event.target.value === ""){
      setShouldShowText(true);
    }
  }

  function handleSaveNote(event: FormEvent){
    event.preventDefault();

    props.onNoteCreated(userText);

    toast.success("Nota salva");
  }

  return(
      <Dialog.Root>
        <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 overflow-hidden text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto automaticamente.
          </p>
        </Dialog.Trigger>

        <Dialog.Portal>
          
          <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md outline-none overflow-hidden">

            <Dialog.Close className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 rounded-bl-md hover:text-slate-100">
              <X className="size-5"/>
            </Dialog.Close>

            <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                    Adicionar nota
                </span>
                {shouldShowText ? (
                  <p className="text-sm leading-6 text-slate-400">
                  Comece <button className="font-medium text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleTextEditor} className="font-medium text-lime-400 hover:underline">utilize apenas texto</button>.
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="text-sm leading-6 bg-transparent text-slate-400 resize-none outline-none flex-1"
                    onChange={handleText}
                  />
                )}
              </div>
              <button
              type="submit"
              className="w-full text-center py-4 text-sm bg-lime-400 text-lime-950 outline-none font-medium hover:bg-lime-500">
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}