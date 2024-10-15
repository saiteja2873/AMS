import { Routes, Route } from 'react-router-dom'
import NavBarComponent from './navBarComponent'
import Landing from './landing'

function App() {
  return (
    <>
    <NavBarComponent/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      {/* <Route path='/login' element={<>login</>}/> */}
    </Routes>
    </>
  )
}

export default App
