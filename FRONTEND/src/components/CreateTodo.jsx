import { useState } from "react";
import { Loading } from '../Atoms/LoaderAtom'
import { NotificationAtom } from "../Atoms/NotificationAtom";
import { useRecoilState } from 'recoil'

export function CreateTodo() {
    const id = localStorage.getItem('id')
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setloading] = useRecoilState(Loading)
    const [notification, setNotification] = useRecoilState(NotificationAtom)

    async function handlesubmit(event) {
        event.preventDefault()
        setloading(true)
        
        try {
            const response = await fetch("https://todo-application-cz2m.onrender.com/create/new-todo", {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const json = await response.json()
            if (response.status === 200) {
                setTitle('')
                setDescription('')
                setNotification({
                    show: true,
                    message: json.msg,
                    status: response.status
                })
            }
        } catch (error) {
            setNotification({
                show: true,
                message: "An Error Occured",
                status: 404
            })
            setloading(false)
        }
    }

    return (
        <form onSubmit={handlesubmit} className="bg-stone-800 w-11/12 border border-stone-600 rounded-lg p-2 flex items-center">
            <div className="flex-1 space-y-1 pr-8">
                <input
                    className="w-full bg-transparent text-white text-sm px-2 py-1 focus:outline-none placeholder-stone-500 truncate"
                    type="text"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="w-full bg-transparent text-white text-sm px-2 py-1 focus:outline-none placeholder-stone-500 truncate"
                    type="text"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                className="p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={loading}
            >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </form>
    )
}