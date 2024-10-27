import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import EditorJS, { OutputData } from "@editorjs/editorjs"
import Header from "@editorjs/header"
import axios from "axios"

interface EditorConfig {
  holder: string;
  inlineToolbar: boolean;
  tools: {
    [key: string]: {
      class: any;
      config?: any;
    };
  };
  autofocus?: boolean;
  data?: any;
}

function Editor() {
  const editorRef = useRef<EditorJS | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        inlineToolbar: true,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "heading",
              defaultLevel: 3,
            }
          },
        },
        autofocus: true,
        data: {
          "time": 2342343242323,
          "blocks": [
            {
              "id": "lsajdfklj23",
              "type": "header",
              "data": {
                "text": "Title goes here!",
                "level": 2
              }
            },
            {
              "id": "idsfk2ksjdf24",
              "type": "paragraph",
              "data": {
                "text": "Content goes here!",
              }
            },
          ],
          "version": "3.8.1"
        },
      } as EditorConfig)
      
      editorRef.current = editor
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [])

  const savePost = () => {
    if (editorRef.current) {
      editorRef.current.save()
        .then(async (outputData: OutputData) => {
          const token = localStorage.getItem("token")
          const response = await axios.post(`/api/v1/blog/`, {
            title: outputData.blocks[0].data.text,
            content: outputData
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          const { id } = response['data']
          navigate(`/feed/${id}`)
        })
        .catch((err: Error) => {
          console.log("saving PostData failed", err)
        })
    }
  }

  return (
    <div className="w-screen h-[90vh] mx-auto bg-slate-100 flex items-start justify-center">
      <div id="editorjs" className="decentfix w-[60vw] text-slate-800 font-mono pt-2 justify-left"></div>
      <button onClick={savePost} className="bg-black px-3 py-2 text-white rounded-md font-medium mt-5 mr-3">Post</button>
    </div>
  )
}

export default Editor
