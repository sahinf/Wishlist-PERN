import { useState } from 'react'

const addItem = ({ onAdd }) => {
  const [carrier_id, setCarrierID] = useState('')
  const [carrier_name, setCarrierName] = useState('')
  const [carrier_phone, setPhoneNum] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!carrier_name) {
      alert('Please add a carrier')
      return
    }

    onAdd({ carrier_id, carrier_name, carrier_phone })

    // setCarrierID('')
    // setCarrierName('')
    // setPhoneNum('')
  }

  return (
    
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Carrier ID</label>
        <input
          type='carrier_name'
          placeholder='Carrier ID'
          value={carrier_id}
          onChange={(e) => setCarrierID(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Carrier Name</label>
        <input
          type='carrier_name'
          placeholder='Carrier Name'
          value={carrier_name}
          onChange={(e) => setCarrierName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Phone Number</label>
        <input
          type='carrier_name'
          placeholder='xxx-xxx-xxxx'
          value={carrier_phone}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default addItem