import { lazy } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
const SignIn = lazy(()=> import('./components/SignIn')) 
const SignUp = lazy(() => import('./components/SignUp'))
const LandingPage = lazy(()=>import('./components/LandingPage'))

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/todo' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
