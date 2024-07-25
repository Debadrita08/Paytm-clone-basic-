import { BrowserRouter, Route,Routes } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { Transferdone } from "./pages/Transferdone"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/signup"} element={<Signup></Signup>}></Route>
      <Route path={"/signin"} element={<Signin></Signin>}></Route>
      <Route path={"/dashboard"} element={<Dashboard></Dashboard>}></Route>
      <Route path={"/sendmoney"} element={<SendMoney></SendMoney>}></Route>
      <Route path={"/transferdone"} element={<Transferdone></Transferdone>}></Route>
    </Routes>
    </BrowserRouter>
        
    
  )
}

export default App
