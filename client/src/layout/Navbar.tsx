import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

function Navbar() {
    const username = "amr"

    return <div className="w-screen h-16 border-b">
        <div className="flex justify-between mx-10 mt-2">
            <Link to={"/"}>
                <div className="flex items-center">
                    <p className="font-bold text-5xl">J</p>
                    <p className="font-bold text-2xl">ed</p>
                </div>
            </Link>

            <div className="flex items-center gap-5">
                <Link to="/write" className="font-medium opacity-75">write</Link>
                

                <Avatar>
                    <AvatarImage src="#"/>
                    <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    </div>
}

export default Navbar