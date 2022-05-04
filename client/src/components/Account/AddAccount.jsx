import { useState } from 'react'

const AddComplaint = ({ onAdd, genericInfo }) => {

    const [user_password, setInput1] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        
        onAdd({ users_id : genericInfo.user, user_password})
        setInput1('')
    }

    return (

        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Choose your new password</label>
                <input
                    type='password'
                    placeholder='<password>'
                    value={user_password}
                    onChange={(e) => setInput1(e.target.value)}
                />
            </div>
            <input type='submit' value='Save Password' className='btn btn-block' />
        </form>
    )
}

export default AddComplaint