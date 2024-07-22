import Navbar from "@/layout/Navbar"
import edjsHTML from "editorjs-html"
import { useBlog } from "@/hooks"
import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Feed() {
    const {id} = useParams()
    const {loading, blog} = useBlog({id : id || ""})
    console.log(blog)

    if(loading || !blog) {
        return <div>
            <p className="text-5xl font-semibold">Loading</p>
        </div>
    }

    console.log(blog)
    const author = blog["author"]
    const edjsParser = edjsHTML()
    const htmlArray =  edjsParser.parse(blog["content"]) //since editorjs-data is saved as array of block
    const htmlContent = htmlArray.join("")

    return <div className="w-screen h-screen">
        <Navbar />

        <div className="bg-slate-100 grid grid-cols-2 pl-60">

            <div className="decentfix mx-auto  pt-4 font-mono h-[90vh] w-full">
                <div dangerouslySetInnerHTML={{ __html: htmlContent}}></div>
            </div>

            <div className="text-gray-500 font-mono mt-14">
                <div className="flex items-center">
                    <Avatar className="border border-gray-300 text-xl">
                        <AvatarImage src="#"></AvatarImage>
                        <AvatarFallback>{author["username"][0]}</AvatarFallback>
                    </Avatar>

                    <p className="text-lg font-semibold ml-2">{author["username"]}</p>
                </div>
            </div>
            

            {/* <div className="border-b bg-slate-400 w-[90vw] mx-auto"></div> */}
            {/* comment section  <div></div>*/}
        </div>

    </div>
}

export default Feed
