import TodoList from './TodoList'

export function Todo({todo}){
    return <div className='w-11/12'>
        {todo.map(function(todos){
            if(!todos.completed)
            return(<TodoList todos={todos} key={todos._id}/>)
           
        })}

        <div className='text-xl font-serif p-2 text-blue-500'>
            Completed Task
        </div>

        {todo.map(function(todos){
            if(todos.completed)
            return(<TodoList todos={todos} key={todos._id} />)
           
        })}
    </div>
}

