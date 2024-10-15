import { Routes, Route } from 'react-router-dom'
import NavBarComponent from './navBarComponent'
import Landing from './landing'
import Servics from './services'
import Login from './login'

function App() {
  return (
    <>
    <NavBarComponent/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/services' element={<Servics/>}/>
      <Route path='/login' element = {<Login/>}></Route>
    </Routes>
    </>
  )
}

export default App
