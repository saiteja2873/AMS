import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBarComponent from './navBarComponent'

function App() {
  return (
    <>
    <NavBarComponent/>
    <Routes>
      <Route path='/' element={<>hello</>}/>
      <Route path='/login' element={<>login</>}/>
    </Routes>
    </>
  )
}

export default App
