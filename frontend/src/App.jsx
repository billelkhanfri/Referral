import {Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import Dashboard from './pages/Dashboard'
import Header from './components/Header/Header'

function App() {


  return (
    <> 
    <Header></Header>
    <Routes>
    
      <Route path='/' element= {<Dashboard/>}></Route>
    </Routes>
    </>
   
  )
}

export default App
