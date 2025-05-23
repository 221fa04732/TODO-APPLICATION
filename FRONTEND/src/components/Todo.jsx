import TodoList from './TodoList'

export function Todo({todo}) {
    return (
        <div className='w-11/12 mx-auto space-y-6'>
            <div className='space-y-3'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50'></div>
                    <h2 className='text-lg font-medium text-blue-400 whitespace-nowrap'>
                        Pending Tasks
                    </h2>
                    <div className='h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50'></div>
                </div>
                
                {todo.map(function(todos) {
                    if(!todos.completed)
                    return <TodoList todos={todos} key={todos._id} />
                })}
            </div>
            <div className='space-y-3'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50'></div>
                    <h2 className='text-lg font-medium text-blue-400 whitespace-nowrap'>
                        Completed Tasks
                    </h2>
                    <div className='h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50'></div>
                </div>
                
                {todo.map(function(todos) {
                    if(todos.completed)
                    return <TodoList todos={todos} key={todos._id} />
                })}
            </div>
        </div>
    )
}