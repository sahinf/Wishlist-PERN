import { useState } from 'react'

const AddEmployee = ({ onAdd, addInfo }) => {

  const [users_id, setInput1] = useState('')
  const [employee_fname, setInput2] = useState('')
  const [employee_lname, setInput3] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ users_id, employee_fname, employee_lname })

    setInput1('')
    setInput2('')
    setInput3('')
  }

  return (

    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>{addInfo.label1}</label>
        <input
          type='employee_fname'
          placeholder={addInfo.placeholder1}
          value={users_id}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label2}</label>
        <input
          type='employee_fname'
          placeholder={addInfo.placeholder2}
          value={employee_fname}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label3}</label>
        <input
          type='employee_fname'
          placeholder={addInfo.placeholder3}
          value={employee_lname}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddEmployee