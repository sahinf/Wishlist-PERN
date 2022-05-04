import { useState } from 'react'

const AddManufacturer = ({ onAdd, addInfo }) => {

  const [man_id, setInput1] = useState('')
  const [seller_name, setInput2] = useState('')
  const [users_id, setInput3] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ man_id, seller_name, users_id })

    setInput1('')
    setInput2('')
    setInput3('')
  }

  return (

    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>{addInfo.label1}</label>
        <input
          type='seller_name'
          placeholder={addInfo.placeholder1}
          value={man_id}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label2}</label>
        <input
          type='seller_name'
          placeholder={addInfo.placeholder2}
          value={seller_name}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label3}</label>
        <input
          type='seller_name'
          placeholder={addInfo.placeholder3}
          value={users_id}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddManufacturer