import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import {toast} from "sonner"

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
};

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard(props: NewNoteCardProps){

  const [shouldShowText, setShouldShowText] = useState(true);
  const [userText, setUserText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  function handleTextEditor(){
    setShouldShowText(false);
  }

  function handleText(event: ChangeEvent<HTMLTextAreaElement>){
    setUserText(event.target.value);

    if(event.target.value === ""){
      setShouldShowText(true);
    }
  }

  function handleSaveNote(event: FormEvent){
    event.preventDefault();

    if(userText === ""){
      setShouldShowText(true);
      return
    }

    props.onNoteCreated(userText);

    setUserText("");
    setShouldShowText(true);

    toast.success("Nota salva");
  }

  function handleStartRecording(){
    const isSpeechRecognitionAPIAvalible = "SpeechRecognition" in window || "webkitSpeechRecognition" in window
    
    if(!isSpeechRecognitionAPIAvalible){
      alert("Infelizmente o seu navegador não suporta a ferramenta usada para a transcrição de audio, caso queira usar está funcionalidade por favor mude para uma das seguintes opções: safari(apenas nos aparelhos da apple), google chrome, edge");

      return;
    }

    setIsRecording(true);
    setShouldShowText(false);

    const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new speechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;


    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setUserText(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    }

    speechRecognition.start();
  }

  function handleStopRecording(){
    setIsRecording(false);
    
    if(speechRecognition !== null){
      speechRecognition.stop();
    }
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

            <form className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                    Adicionar nota
                </span>
                {shouldShowText ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleTextEditor} className="font-medium text-lime-400 hover:underline">utilize apenas texto</button>.
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="text-sm leading-6 bg-transparent text-slate-400 resize-none outline-none flex-1"
                    onChange={handleText}
                    value={userText}
                  />
                )}
              </div>

              {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full text-center py-4 text-sm bg-slate-900 text-slate-300 outline-none font-medium hover:text-slate-100 flex justify-center items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
                  Gravando, aperte para parar a gravação
              </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="w-full text-center py-4 text-sm bg-lime-400 text-lime-950 outline-none font-medium hover:bg-lime-500">
                    Salvar nota
                </button>
                )}
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}