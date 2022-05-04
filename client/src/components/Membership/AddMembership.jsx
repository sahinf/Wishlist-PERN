import { useState } from 'react'

const AddMembership = ({ onAdd, addInfo }) => {

  const [membership_id, setInput1] = useState('')
  const [users_customer_id, setInput2] = useState('')
  const [membership_status, setInput3] = useState('')
  const [users_id, setInput4] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ membership_id, users_customer_id, membership_status, users_id})

    setInput1('')
    setInput2('')
    setInput3('')
    setInput4('')
  }

  return (

    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>{addInfo.label1}</label>
        <input
          type='users_customer_id'
          placeholder={addInfo.placeholder1}
          value={membership_id}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label2}</label>
        <input
          type='users_customer_id'
          placeholder={addInfo.placeholder2}
          value={users_customer_id}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label3}</label>
        <input
          type='users_customer_id'
          placeholder={addInfo.placeholder3}
          value={membership_status}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Employee ID</label>
        <input
          type='users_customer_id'
          placeholder='<number>'
          value={users_id}
          onChange={(e) => setInput4(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Membership' className='btn btn-block' />
    </form>
  )
}

export default AddMembership