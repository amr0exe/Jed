import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import EditorJS from "@editorjs/editorjs"
import Paragraph from "@editorjs/paragraph"
import List from "@editorjs/list"
import SimpleImage from "@editorjs/simple-image"
import Header from "@editorjs/header"

import { backendURL } from "@/hooks"
import axios from "axios"

function Editor() {
	const editorRef = useRef<EditorJS | null | boolean>(null)
	const navigate = useNavigate()
	const [PostData, setPostData] = useState("")

	useEffect(() => {
		if(!editorRef.current) {
			editorRef.current = new EditorJS({
				holder: "editorjs",
				inlineToolbar: true,

				tools: {
					paragraph: Paragraph,
					header: {
						class: Header,
						config: {
							placeholder: "heading",
							defaultLevel: 3,
						}
					},
					list: {
						class: List,
					},
					image: {
						class: SimpleImage,
						inlineToolbar: true
					}
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
			})
		}

		//cleanup function
		return () => {
			if(!editorRef.current) {
				editorRef.current = true
			}
		}
		
	}, [])


	//save data to backend
	const savePost = () => {
		if(editorRef.current) {
			editorRef.current.save()
			.then(async (outputData: any) => {
				setPostData(outputData) 
				console.log(outputData)
				const token = localStorage.getItem("token")
				console.log(token)

				//backend Request	
				const response = await axios.post(`${backendURL}/api/v1/blog/`, {
					title: outputData.blocks[0].data.text,
					content: outputData 

				}, {
					headers: {
						Authorization: `Bearer ${token}` 
					}
				})

				const {id} = response['data']
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