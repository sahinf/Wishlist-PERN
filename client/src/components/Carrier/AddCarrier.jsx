import { useState } from 'react'

const AddCarrier = ({ onAdd }) => {
  const [carrier_name, setCarrierName] = useState('')
  const [carrier_phone, setPhoneNum] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!carrier_name) {
      alert('Please add a carrier')
      return
    }

    onAdd({ carrier_name, carrier_phone })

    setCarrierName('')
    setPhoneNum('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Carrier</label>
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

export default AddCarrier