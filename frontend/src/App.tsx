import { Routes, Route } from 'react-router-dom'
import NavBarComponent from './navBarComponent'
import Landing from './landing'
import Servics from './services'
import Login from './login'
import SignUp from './signUp'
import CostTracking from './costTracking'

function App() {
  return (
    <>
    <NavBarComponent/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/services' element={<Servics/>}/>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/signUp' element = {<SignUp/>}></Route>
      <Route path='/costTracking' element = {<CostTracking/>}></Route>
    </Routes>
    </>
  )
}

export default App
