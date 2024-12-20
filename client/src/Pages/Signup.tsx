import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { backendurl } from "@/hooks"

function Signup() {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    async function sendCred() {
        try{
            setIsLoading(true)
            const response = await axios.post(`${backendurl}/api/v1/user/signup`, {email, username, password})
            const token = response.data
            setIsLoading(false)
            localStorage.setItem("token", token)
            navigate("/signin")
        } 
        catch(err) {
            console.log("Error while signing up!", err)
        }
    }
    return (
        <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-lg p-6 bg-white rounded shadow-md mx-4 md:mx-auto md:min-h-fit">
                <div className="w-full flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <p className="font-bold text-4xl">J</p>
                        <p className="font-bold text-xl">ed</p>
                    </div>
                    <p className="opacity-45 text-sm">"share your ideas, be more articulate!"</p>
                </div>

                <h1 className="text-center text-2xl font-medium mt-2">Signup</h1>
                <p className="font-extralight text-center mb-4">
                    Already have an account?
                    <span className="text-blue-500 font-normal cursor-pointer ml-1"> 
                        <Link to="/signin">Signin</Link>
                    </span>
                </p>

                <div className="w-full flex flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="test@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Label htmlFor="name">Username</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="testcom"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="pas****d"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex mt-2 items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox id="rememberMe" />
                            <Label htmlFor="rememberMe" className="ml-2 font-light">Remember Me!</Label>
                        </div>
                        <p className="text-sm text-blue-500 cursor-pointer">Forgot your password?</p>
                    </div>

                    <Button className="mt-4 mb-8" onClick={sendCred}>{isLoading ? "signingUp..." : "Submit"}</Button>
                </div>
            </div>
        </div>
    )
}

export default Signup

