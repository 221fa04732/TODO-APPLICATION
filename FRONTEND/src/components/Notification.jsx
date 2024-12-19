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

    
    return(<div className={`${notifications.status === 200 ? "bg-green-300" : "bg-red-300"} flex justify-center items-center pl-4 rounded-sm`}>
        <div>{notifications.status===200 ? <img src='mark.png' className='max-h-4 min-h-4 max-w-4 min-w-4'></img> : <img src='cross.png' className='max-h-4 min-h-4 max-w-4 min-w-4'></img> }</div>
        <div className={`text-black text-center py-1 pr-6 pl-4 rounded-sm`}>
        {notifications.message}
        </div>
    </div>
    )
}