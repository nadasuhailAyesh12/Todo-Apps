import './style.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../actions/TodoListActions'
import { useState } from 'react'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodo() {
    const dispatch = useDispatch()
    const [input,setInput]=useState('')
  return (
      <form className="todoForm" onSubmit={(e) => {
          e.preventDefault()
          if (input) {
              dispatch(addTodo(input))
              setInput('')
          }
          else {
         toast.error('please add a todo  title!')
          }
      }}>
          <input type='text' value={input} placeholder='add  new todo' onChange={(e)=>setInput(e.target.value)}/>
          <button type="submit" >+</button>
        
    </form>
  )
}

export default AddTodo