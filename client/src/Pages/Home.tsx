import Navbar from "@/layout/Navbar"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useBlogs } from "@/hooks"

function Home() {

    const {loading, blogs} = useBlogs()
    if(loading || !blogs ) {
        return <div className="w-screen h-screen flex justify-center items-center">
            <p className="text-4xl font-mono font-semibold">Loading...</p>
        </div> 
    }
    console.log(loading, blogs)
    

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <Navbar />

            <div className="w-[60vw] h-[90vh] mx-auto grid grid-cols-4">
                <div className="font-mono flex flex-col mt-12 col-span-4 lg:col-span-3">
                    {blogs.map((post) => (
                        <SingleBlogCard 
                            id = {post["id"]} 
                            author = {post["author"]["username"]}
                            title = {post["title"]}
                            content = {post["content"]["blocks"][1]["data"]["text"]}
                        />
                    ))}
                    {/* <SingleBlogCard /> */}
                </div>

                <div className="font-mono text-2xl font-semibold col-span-1 border-l-2 border-black pl-4 pt-7 hidden lg:block">
                    Tags
                </div>
            </div>
        </div>
    )
}

interface CardProps {
    id: number;
    author: string;
    title: string;
    content: string;
}

function SingleBlogCard({id, author, title, content}: CardProps) {
    const maxWords = 25; 

    // Function to truncate content to words
    function truncateTextToWords(text: string, maxWords: number): string {
        const words = text.split(" ");
        if (words.length <= maxWords) {
            return text;
        } else {
            return words.slice(0, maxWords).join(" ") + "...";
        }
    }
                        
    return (
        <div className="h-1/3 w-[90%] mb-10">
            <div className="flex justify-between items-center">
                <div className="bg-blue-400 h-6 w-20 rounded-sm flex justify-center items-center tracking-tighter text-sm text-black font-semibold">
                    articles
                </div>

                <div className="text-sm">12 days ago</div>
            </div>

            <div className="font-semibold text-xl font-sans mt-4">
                {title}
            </div>

            <div className="text-sm text-gray-500 mt-3">
                {truncateTextToWords(content, maxWords)}
                {/* Lorem ipsum dolor asdfHehladsjfsdklfklsjdfelit. Tempora eos repudiandae suscipit magnam consequuntur laborum praesentium fugit illo accusamus aliq hellow world i am they sky uam ipsa, vel veniam.  hellish nigh tunder the  asdjfkjsldjfHello w<sdfjsdHelllwo asjdfjklasdjfklsjdkfljbia m th sky klads */}
            </div>

            <div className="mt-3 flex justify-between items-center">
                <div className="w-fit gap-3 flex justify-between items-center">
                    <Avatar>
                        <AvatarImage src="#"/>
                        <AvatarFallback>{author[0]}</AvatarFallback>
                    </Avatar> 

                    <p className="text-sm">{author}</p>
                </div>

                <p className="font-semibold text-blue-600">
                   <Link to={`/feed/${id}`}>
                        ReadMore
                   </Link> 
                </p>
            </div>

            <hr className="mt-4"/>
        </div>
    )
}

export default Home
