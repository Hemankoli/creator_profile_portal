import { Route, Routes } from 'react-router-dom'
import { AdminRoute, Navbar, UserRoute } from './componets'
import { Account, CreatorDetails, CreatorForm, Home, Login } from './pages'

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 md:p-8 bg-gray-800 text-white min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/register" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserRoute />} >
            <Route path="" element={<Home />} />
            <Route path="/creator/:id" element={<CreatorDetails />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/" element={<AdminRoute />} >
            <Route path="/add" element={<CreatorForm />} />
            <Route path="/edit/:id" element={<CreatorForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
