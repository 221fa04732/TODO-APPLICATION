import axios from "axios"
import {useRecoilState} from "recoil"
import {Loading} from "../Atoms/LoaderAtom"
import { NotificationAtom } from "../Atoms/NotificationAtom"

export default function TodoList({todos}) {
    const [loading, setloading] = useRecoilState(Loading)
    const [notification, setNotification] = useRecoilState(NotificationAtom)

    return (
        <div className="group flex items-start gap-4 bg-stone-800/50 hover:bg-stone-800/70 border border-stone-700 p-4 rounded-lg transition-all duration-200 relative mb-4">
            <button 
                className={`flex-shrink-0 mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${todos.completed ? "border-blue-500 bg-blue-500/20" : "border-stone-500 hover:border-stone-400"}`}
                onClick={async()=>{
                    setloading(true)
                    try{
                        const tododata = await axios.put("https://todo-application-cz2m.onrender.com/todoMark/mark-as-done",{id: todos._id, todoStatus : todos.completed})

                        setNotification({
                            show : true,
                            message : tododata.data.msg,
                            status : tododata.status
                        })
                    }
                    catch(error){
                        setNotification({
                            show : true,
                            message : 'An Error Occured',
                            status : 404
                        })
                        setloading(false)
                    }
                }}>
                {todos.completed && (
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>
            <div className={`flex-1 min-w-0 ${todos.completed ? "opacity-80" : ""}`}>
                <h1 className={`text-stone-100 font-medium ${todos.completed ? "line-through" : ""} break-words`}>
                    {todos.title}
                </h1>
                {todos.description && (
                    <p className={`text-stone-400 text-sm mt-1 ${todos.completed ? "line-through" : ""} break-words`}>
                        {todos.description}
                    </p>
                )}
            </div>
            {todos.completed && (
                <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-stone-700/50"
                    onClick={async()=>{
                        setloading(true)
                        try{
                            const tododata = await axios.put('https://todo-application-cz2m.onrender.com/delete/delete-todo' , {id : todos._id})

                            setNotification({
                                show : true,
                                message : tododata.data.msg,
                                status : tododata.status
                            })
                        }
                        catch(error){
                            setNotification({
                                show : true,
                                message : 'An Error Occured',
                                status : 404
                            })
                            setloading(false)
                        }
                    }}>
                    <svg className="h-5 w-5 text-stone-400 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}
        </div>
    )
}