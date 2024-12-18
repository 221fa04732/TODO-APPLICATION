import axios from "axios"
import {useRecoilState} from "recoil"
import {Loading} from "../Atoms/LoaderAtom"
import { NotificationAtom } from "../Atoms/NotificationAtom"

export default function TodoList({todos})
{
    const [loading, setloading] = useRecoilState(Loading)
    const [notification, setNotification] = useRecoilState(NotificationAtom)

    return (<div className="flex items-center gap-4 border border-gray-600 p-2 m-1 rounded relative">

        <button className={`border-2 border-gray-500 rounded-full max-h-4 min-h-4 max-w-4 min-w-4 ${todos.completed ? "bg-blue-700" : "bg-stone-800"} `}
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
            }

        }}></button>

        <div className={`${todos.completed ? "line-through" : ""}`}>
            <h1 className="pr-12 pb-1">{todos.title}</h1>
            <h2 className="text-gray-300 text-sm pr-12">{todos.description}</h2>
        </div>
        
        {todos.completed && <button className="absolute bottom-1 right-1" onClick={async()=>{
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
            }
        }}><img src="delete.png" className="max-h-5 min-h-5 max-w-5 min-w-5" /></button>}

    </div>)
}