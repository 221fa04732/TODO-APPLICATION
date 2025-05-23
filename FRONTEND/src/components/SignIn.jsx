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


    return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 to-stone-900 w-full flex items-center justify-center p-4">
        <div className='max-w-4xl w-full bg-stone-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-stone-700/50'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Left side - illustration */}
                <div className='hidden md:flex bg-gradient-to-br from-blue-900/30 to-stone-900/70 items-center justify-center p-8'>
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold text-blue-400 mb-2 font-sans'>Welcome Back</h2>
                        <p className='text-stone-400'>Sign in to access your account!</p>
                    </div>
                </div>
                
                {/* Right side - form */}
                <div className='p-8 md:p-10 flex flex-col'>
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-blue-500 mb-1 font-sans'>Sign In</h1>
                        <p className='text-stone-400'>Enter your credentials to continue</p>
                    </div>

                    <div className='space-y-6'>
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-stone-300'>Email</label>
                            <div className='relative'>
                                <input 
                                    className='w-full bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                                    type='text'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='your@email.com'
                                />
                            </div>
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-stone-300'>Password</label>
                            <div className='relative'>
                                <input 
                                    className='w-full bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12'
                                    type={visiblePassword.signin === 0 ? 'password' : 'text'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='••••••••'
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                    <DisplayPass btntype={"signin"} />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => signInbtn()} 
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        >
                            Sign In
                        </button>
                    </div>

                    <div className='mt-6 text-center text-sm text-stone-400'>
                        Don't have an account?{' '}
                        <Link 
                            to={'/signUp'} 
                            className='text-blue-500 hover:text-blue-400 font-medium transition-colors'
                        >
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <div className={`fixed ${notification.show ? 'block' : 'hidden'} right-4 top-4 z-20`}>
            <Notification type={290} message={"An Error Occured"}/>
        </div>
    </div>
)
}