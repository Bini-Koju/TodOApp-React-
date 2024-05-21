import React from 'react'
import { Button } from 'reactstrap'

const ToDoList = (props) => {

  return (
    <>
    
    <div className='d-flex justify-content-between align-items-center gap-4 w-25 mx-auto my-3  border px-2 py-1'>   
      <span >{props.item}</span>
      <Button onClick={e=>{
        props.deleteFromList(props.index )
      }} >Delete</Button>
    </div>
    </>
  )
}

export default ToDoList
