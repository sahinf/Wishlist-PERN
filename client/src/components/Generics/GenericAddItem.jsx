import { useState } from 'react'

const AddItem = ({ onAdd, addInfo }) => {

  const [users_id, setUsersID] = useState('')
  const [employee_fname, setFname] = useState('')
  const [employee_lname, setLname] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!employee_fname) {
      alert('Please add a carrier')
      return
    }

    onAdd({ users_id, employee_fname, employee_lname })

    setUsersID('')
    setFname('')
    setLname('')
  }

  return (

    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>{addInfo.label1}</label>
        <input
          type='employee_fname'
          placeholder={addInfo.placeholder1}
          value={users_id}
          onChange={(e) => setUsersID(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label2}</label>
        <input
          type='employee_fname'
          placeholder={addInfo.placeholder2}
          value={employee_fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label3}</label>
        <input
          type='employee_fname'
          placeholder={addInfo.placeholder3}
          value={employee_lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddItem