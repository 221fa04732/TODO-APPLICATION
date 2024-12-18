import { useState, useEffect } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todo } from './components/Todo'
import Notification from './components/Notification'
import Loader from './components/Loader'
import { Loading } from './Atoms/LoaderAtom'
import {NotificationAtom} from './Atoms/NotificationAtom'
import { useRecoilState } from 'recoil'
import axios from 'axios'

const API_BASE_URL= process.env.REACT_APP_API_URL;


function App() {

  const[todo, setTodo] = useState([]);
  const[loading, setloading] = useRecoilState(Loading)
  const [notification, setNotification]= useRecoilState(NotificationAtom)


  useEffect(()=>{
      fetch(`${API_BASE_URL}/api/your/todo-list`)
      .then(async function(res){
        const json = await res.json();
        setTodo(json.todo)
        setloading(false)  
      })
  }, [loading])

  useEffect(()=>{
    setInterval(async()=>{
      const tempTodo = await axios.get(`${API_BASE_URL}/api/your/todo-list`)
      setTodo(tempTodo.data.todo)
    },60000)
    
  },[])

  return (
    <div className='bg-stone-800 text-white w-full min-h-screen'>
      <div className='fixed w-full text-center font-bold text-2xl p-4 z-10 bg-stone-800 font-serif text-blue-600'> 
        TODO APPLICATION
      </div>
      <div className='p-20 pb-28'>
        {loading ? <Loader /> : <Todo todo={todo}></Todo>}

      </div>
      
      <div className='fixed bottom-0 w-full text-center py-4 px-20 bg-stone-800'>
        <CreateTodo></CreateTodo>
      </div>

      <div className={`fixed ${notification.show ? 'block' : 'hidden'}  top-4 left-4 z-20`}>
        <Notification type={290} message={"An Error Occured"}/>
      </div>
       
    </div>
  )
}

export default App


