import { useEffect } from 'react'
import {useRecoilState} from 'recoil'
import { NotificationAtom } from '../Atoms/NotificationAtom'

export default function Notification(){

    const [notifications, setNotifications]= useRecoilState(NotificationAtom)

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setNotifications({show : false})
        },3000)

        return()=>{
            clearTimeout(timeout)
        }

    },[notifications.show])

    return(<div className={`${notifications.status === 200 ? "bg-green-500" : "bg-red-500"} text-white text-center py-1 px-5 rounded-sm`}>
        {notifications.message}
    </div>)
}