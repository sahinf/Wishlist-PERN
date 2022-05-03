import { useState } from 'react'

const AddCarrier = ({ onAdd }) => {
  const [carrierName, setCarrierName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!carrierName) {
      alert('Please add a carrier')
      return
    }

    onAdd({ carrierName, phoneNum })

    setCarrierName('')
    setPhoneNum('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Carrier</label>
        <input
          type='carrierName'
          placeholder='Carrier Name'
          value={carrierName}
          onChange={(e) => setCarrierName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Phone Number</label>
        <input
          type='carrierName'
          placeholder='xxx-xxx-xxxx'
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddCarrier