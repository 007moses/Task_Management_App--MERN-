import React, { useState } from 'react'

const Tasks = () => {
    const [input,setInput] = useState("false");

    const handleChange = (e) =>{
        console.log(e.target.checked);
        setInput(e.target.checked);
    }
    
  return (
    <div>
      <h1>Tasks</h1>
      <input type='checkbox' className='form-check-input' value={input} onChange={(e)=>handleChange(e)}/>

    </div>
  )
}

export default Tasks
