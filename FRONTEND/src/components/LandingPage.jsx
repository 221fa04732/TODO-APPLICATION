import { useState, useEffect } from 'react'
import { CreateTodo } from './CreateTodo'
import { Todo } from './Todo'
import Notification from './Notification'
import Loader from './Loader'
import { Loading } from '../Atoms/LoaderAtom'
import { NotificationAtom } from '../Atoms/NotificationAtom'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import SignIn from './SignIn'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const id = localStorage.getItem('id')
    const [todo, setTodo] = useState([])
    const [loading, setloading] = useRecoilState(Loading)
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const Navigate = useNavigate()

    useEffect(() => {
        fetch("https://todo-application-cz2m.onrender.com/your/todo-list", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(async function (res) {
            const json = await res.json()
            setTodo(json.todo)
            setloading(false)
        })
    }, [loading, id])

    useEffect(() => {
        const interval = setInterval(async () => {
            const tempTodo = await axios.post('https://todo-application-cz2m.onrender.com/your/todo-list', {
                id: id
            })
            setTodo(tempTodo.data.todo)
            setloading(false)
        }, 60000)

        return () => clearInterval(interval)
    }, [id])

    if(!id){
      return (
        <SignIn />
      )
    }

    return (
        <div className='bg-stone-800 text-white w-full min-h-screen'>
          <div className="fixed w-full z-40 bg-gradient-to-r from-stone-900 to-stone-800 border-b border-blue-500/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white animate-bounce-slow"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path 
                        d="M20 6L9 17l-5-5" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 rounded-lg bg-blue-400/30 blur-sm group-hover:opacity-100 opacity-0 transition-opacity"></div>
                </div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 tracking-tight">
                  ZenTasks
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-stone-300 hover:text-blue-400 transition-colors font-medium text-sm">
                  Dashboard
                </a>
                <a href="#" className="text-stone-300 hover:text-blue-400 transition-colors font-medium text-sm">
                  Projects
                </a>
                <a href="#" className="text-stone-300 hover:text-blue-400 transition-colors font-medium text-sm">
                  Calendar
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="p-1.5 rounded-full bg-stone-700/50 hover:bg-stone-700 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button className="px-2 h-8 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium"
                onClick={()=>{
                  localStorage.removeItem("id")
                  Navigate('/signIn')
                }}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
            <div className='flex justify-center pt-20 pb-28 w-full'>
                {loading ? <Loader /> : <Todo todo={todo} />}
            </div>
            <div className='fixed flex justify-center bottom-0 w-full text-center py-4 bg-stone-800 z-10 border-t border-stone-700'>
                <CreateTodo />
            </div>
            <div className={`fixed right-4 top-4 z-50 transition-all duration-300 ease-out ${notification.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <Notification />
            </div>
        </div>
    )
}