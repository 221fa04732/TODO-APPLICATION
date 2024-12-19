import { useState } from "react";
import { Loading } from '../Atoms/LoaderAtom'
import { NotificationAtom } from "../Atoms/NotificationAtom";
import { useRecoilState } from 'recoil'

export function CreateTodo(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setloading] = useRecoilState(Loading)
    const [notification , setNotification] = useRecoilState(NotificationAtom)

    async function handlesubmit(event)
    {
        event.preventDefault()

        setloading(true)
        try{
            fetch("https://todo-application-cz2m.onrender.com/create/new-todo", {
                method :"POST",
                body : JSON.stringify({
                    title: title,
                    description : description
                }),
                headers:{
                    "Content-type": "application/json"
                }
            })
            .then(async function (res){
                const json = await res.json();
                if(res.status === 200){
                    setTitle('')
                    setDescription('')
                    setNotification({
                        show : true,
                        message : json.msg,
                        status : res.status
                    })
                }
            })
        }

        catch(error){
            setNotification({
                show : true,
                message : "An Error Occured",
                status : 404
            })
            setloading(false)
        }

    }

    return <form onSubmit={handlesubmit} className="bg-stone-800 w-11/12 flex relative border border-gray-400 p-2 rounded">
        <div className="w-full pr-8">
            <input className="bg-stone-800 w-full border-b border-gray-400 px-1 focus:outline-none" type="text"     
                placeholder="title"
                required
                value={title}
                onChange={function(e){
                const value = e.target.value;
                setTitle(e.target.value)
            }}></input><br />

            <input className="bg-stone-800 w-full border-b border-gray-400 px-1 mt-1 focus:outline-none" type="text" 
                placeholder="description" 
                required
                value={description}
                onChange={function(e){
                const value = e.target.value;
                setDescription(e.target.value)
            }}></input><br />
        </div>

        <button className="absolute right-1 bottom-1" type="submit"><img src="send.png" className="min-h-6 max-h-6 min-w-6 max-w-6"/></button>
    </form>
}