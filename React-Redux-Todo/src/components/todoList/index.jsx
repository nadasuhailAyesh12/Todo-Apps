import { deleteTodo,editTodo } from '../../actions/TodoListActions';
import './style.css'
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux'

export const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleEdit = (id,todoText) => {
    Swal.fire({
      title: 'Edit Todo',
      input: 'text',
      inputValue: todoText,
      showCancelButton: true,
      confirmButtonText: 'Save',
      inputValidator: (value) => {
        if (!value) {
          return 'todo cannot be empty ,please enter one!';
        }
        else if (value === todoText) {
            return 'todo hasn’t changed ,please change it';
        }
      },

      preConfirm: (text) => {
          dispatch(editTodo(id, text))
         
      }
    })
  }
    return (
      <ul className="allTodos">
        {todos.length ?
            todos.map((todo) => (
              <li key={todo.id} className="singleTodo">
                <span className="todoText" >
                  {todo.text}
                </span>
                <button onClick={() =>
                  handleEdit(todo.id, todo.text)}
                >Edit</button>
                <button onClick={() => { dispatch(deleteTodo(todo.id)) }}>Delete</button>
              </li>
            ))
          :
          <p>you dont have any todos right now ,please add one</p>
        }
      </ul>
  
      
    )
  }

export default TodoList