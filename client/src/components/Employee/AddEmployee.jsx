import { useState } from 'react'

const AddEmployee = ({ onAdd }) => {
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
        <label>Carrier ID</label>
        <input
          type='employee_fname'
          placeholder='Employee ID (20-40)'
          value={users_id}
          onChange={(e) => setUsersID(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Employee First Name</label>
        <input
          type='employee_fname'
          placeholder='First Name'
          value={employee_fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Employee Last Name</label>
        <input
          type='employee_fname'
          placeholder='Last Name'
          value={employee_lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddEmployee