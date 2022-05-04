import { useState } from 'react'

const AddComplaint = ({ onAdd, genericInfo }) => {

    const [complaint_id, setInput1] = useState('')
    const [complaint_status, setInput2] = useState('')
    const [complaint_text, setInput3] = useState('')
    // const [review]

    const onSubmit = (e) => {
        e.preventDefault()
        
        //* Not adding product description
        onAdd({ complaint_id, complaint_status, users_customer_id : genericInfo.user, users_id : '21', complaint_date : '2022-05-04', complaint_text })
        setInput1('')
        setInput2('')
        setInput3('')
    }

    return (

        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Complaint ID</label>
                <input
                    type='complaint_id'
                    placeholder='<text>'
                    value={complaint_id}
                    onChange={(e) => setInput1(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Status of your complaint</label>
                <input
                    type='complaint_id'
                    placeholder='<number>'
                    value={complaint_status}
                    onChange={(e) => setInput2(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Tell us your complaint</label>
                <input
                    type='complaint_id'
                    placeholder='<text>'
                    value={complaint_text}
                    onChange={(e) => setInput3(e.target.value)}
                />
            </div>
            {/* <div className='form-control'>
                <label>Product ID</label>
                <input
                    type='complaint_id'
                    placeholder='<number>'
                    value={complaint_text}
                    onChange={(e) => setInput4(e.target.value)}
                />
            </div> */}
            <input type='submit' value='Save review' className='btn btn-block' />
        </form>
    )
}

export default AddComplaint