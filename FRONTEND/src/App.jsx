import { LoginStatus } from './Atoms/LoginStatus'
import {LandingPage} from './components/LandingPage'
import { SignStatus } from './Atoms/SignStatus'
import { useRecoilState } from 'recoil'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {

  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatus)
  const [signStatus, setSignStatus] = useRecoilState(SignStatus)

  return (<> {loginStatus.status ? <LandingPage /> : <>{signStatus==0 ? <SignIn /> : <SignUp />}</> } </>)
}

export default App
