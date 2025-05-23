import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { NotificationAtom } from '../Atoms/NotificationAtom'

export default function Notification() {
    const [notifications, setNotifications] = useRecoilState(NotificationAtom)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNotifications({ show: false })
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [notifications.show, setNotifications])

    return (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${notifications.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className={`flex items-center shadow-lg rounded-md overflow-hidden ${notifications.status === 200 ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
                <div className="px-3 py-2">
                    {notifications.status === 200 ? (
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
                <div className={`px-4 py-2 text-sm font-medium ${notifications.status === 200 ? 'text-green-800' : 'text-red-800'}`}>
                    {notifications.message}
                </div>
                <button 
                    className="px-2 py-1 text-gray-400 hover:text-gray-500"
                    onClick={() => setNotifications({ show: false })}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}