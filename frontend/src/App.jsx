import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './componets/Navbar'
import CreatorList from './componets/CreatorList'
import CreatorDetails from './componets/CreatorDetails'
import CreatorForm from './componets/CreatorForm'

function App() {

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4 md:p-8 bg-gray-800 text-white min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<CreatorList />} />
            <Route path="/creator/:id" element={<CreatorDetails />} />
            <Route path="/add" element={<CreatorForm />} />
            <Route path="/edit/:id" element={<CreatorForm />} />  
          </Routes>
        </div>
      </div>
  )
}

export default App
