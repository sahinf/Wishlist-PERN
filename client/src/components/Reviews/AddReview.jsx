import { useState } from 'react'

const AddReview = ({ onAdd, addInfo, genericInfo }) => {

    console.log('review user: ', genericInfo.user);
    console.log(genericInfo)
    const [product_desc, setInput1] = useState('')
    const [review_rating, setInput2] = useState('')
    const [review_text, setInput3] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onAdd({ product_desc, review_rating, review_text, users_id : genericInfo.user, review_date : '2022-05-04' })
        setInput1('')
        setInput2('')
        setInput3('')
    }

    return (

        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Product description</label>
                <input
                    type='review_rating'
                    placeholder='<text>'
                    value={product_desc}
                    onChange={(e) => setInput1(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Your rating out of 5 stars</label>
                <input
                    type='review_rating'
                    placeholder='<number>'
                    value={review_rating}
                    onChange={(e) => setInput2(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Your review of the product</label>
                <input
                    type='review_rating'
                    placeholder='<text>'
                    value={review_text}
                    onChange={(e) => setInput3(e.target.value)}
                />
            </div>
            {/* <div className='form-control'>
        <label>Employee ID</label>
        <input
          type='review_rating'
          placeholder='<number>'
          onChange={(e) => setInput4(e.target.value)}
        />
      </div> */}
            <input type='submit' value='Save Membership' className='btn btn-block' />
        </form>
    )
}

export default AddReview