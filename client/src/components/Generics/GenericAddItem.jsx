import { useState } from 'react'

const AddItem = ({ onAdd, addInfo }) => {

  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ input1, input2, input3 })

    setInput1('')
    setInput2('')
    setInput3('')
  }

  return (

    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>{addInfo.label1}</label>
        <input
          type='input2'
          placeholder={addInfo.placeholder1}
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label2}</label>
        <input
          type='input2'
          placeholder={addInfo.placeholder2}
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>{addInfo.label3}</label>
        <input
          type='input2'
          placeholder={addInfo.placeholder3}
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddItem