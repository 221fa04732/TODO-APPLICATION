import {NotificationAtom} from '../Atoms/NotificationAtom'
import Notification from './Notification'
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DisplayPass from './DisplayPass';
import { VisiblePass } from '../Atoms/VisiblePass';

export default function SignIn(){

    const navigate = useNavigate();
    const [notification, setNotification]= useRecoilState(NotificationAtom)
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')
    const [visiblePassword, setVisiblePassword] = useRecoilState(VisiblePass)


    async function signInbtn(){

        try{
            const user=await axios.post('https://todo-application-cz2m.onrender.com/signin/user',{
                    Email : email, 
                    Password : password
                }
            );
            
            if(user.status === 200){
                localStorage.setItem('id', user.data.id)
                localStorage.setItem('username', user.data.userName)
                setEmail('')
                setPassword('')
                setNotification({
                    show : true,
                    message : `Welcome ${user.data.userName}`,
                    status : user.status
                })
                navigate('/todo')
                setVisiblePassword({
                    signin : 0,
                    signup : 0
                })
            }

            else{
                setNotification({
                    show : true,
                    message : user.data.msg,
                    status : user.status
                })
            }

        }
        catch(error){
            setNotification({
                show : true,
                message : "An Error Occured",
                status : 404
            })
        }

    }


    return(<div className="min-h-screen bg-stone-900 w-full flex items-center">
        <div className='grid grid-cols-1 md:grid-cols-2 place-items-center py-10 px-5 w-full'>
            <div className='flex flex-col justify-center items-center pb-16 md:pb-0'>  
                <img src="/list.png" className='md:max-h-40 md:max-w-36 max-h-28 max-w-20 pb-3'/>
                <div className='text-orange-600 font-semibold text-4xl font-serif'>TODO APP</div>
            </div>
            <div className='w-11/12 flex flex-col items-center justify-center'>


                <div className='w-full flex flex-col items-center justify-center'>

                    <div className='text-blue-600 font-semibold text-3xl font-serif pb-5'>SignIn</div>

                    <fieldset className='border border-blue-400 rounded w-full mb-5'>
                        <legend className='ml-3 font-semibold text-blue-400 px-1'>Email</legend>
                        <input className='border-none focus:outline-none w-full bg-stone-900 px-3 py-1 text-white'
                        type='text'
                        required
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}></input>
                    </fieldset>

                    <fieldset className='border border-blue-400 rounded w-full mb-5 flex items-center'>
                        <legend className='ml-3 font-semibold text-blue-400 px-1'>Password</legend>
                        <input className='border-none focus:outline-none w-full bg-stone-900 px-3 py-1 text-white'
                        type={visiblePassword.signin === 0 ? 'password' : 'text'}
                        required
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}></input>
                        
                        <DisplayPass btntype={"signin"} />
                    </fieldset>

                    <button onClick={()=>{signInbtn()}} className='border bg-blue-700 rounded w-full border-blue-700 p-2 text-white font-semibold hover:bg-blue-600 mb-1'>SignIn</button>

                </div>

                <div className='w-full'>
                    <span className='text-blue-600 text-lg'>Don't Have an Account? </span>
                    <Link to={'/signUp'} >Create One</Link>
                </div>

            </div>
        </div>

        <div className={`fixed ${notification.show ? 'block' : 'hidden'} right-4 top-4 z-20`}><Notification type={290} message={"An Error Occured"}/>
        </div>

    </div>)

}

