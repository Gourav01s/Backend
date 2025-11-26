import { Routes,Route } from 'react-router-dom';
import './App.css'
import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";



function App() {

  return (
    <>
      <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addemployee" element={<CreateEmployeePage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
