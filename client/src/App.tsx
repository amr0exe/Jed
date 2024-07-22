import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Write from "./Pages/Write"
import Feed from "./Pages/Feed"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/write" element={<Write />}/>
          <Route path="/feed/:id" element={<Feed />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App
