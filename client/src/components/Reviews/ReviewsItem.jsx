import { red } from '@material-ui/core/colors'
import { FaTimes } from 'react-icons/fa'

const Item = ({ item, onDelete, onToggle }) => {
    return (
        <div
            // className={`Employee ${item.users_id && 'phone'}`}
            onDoubleClick={() => onToggle(item.users_id)}
        >
            <h2 style={h3style} >
                {`${item.product_desc} --- ${item.review_rating} stars --- $${item.product_price}`}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(item)}
                />
            </h2>
            <h3>{`\"${item.review_text}\"`}</h3>
        
            <br></br>
        </div>
    )
}

const h3style = {
    color: 'white',
    backgroundColor: 'black',
    'border': '2px solid cyan',
    'borderRadius': '20%',
}

const style2 = {
    'height': '5vw',
    'width': '80vw',
    'border': '2px solid green',
    'border-top-right-radius': '30px',
    'border-bottom-left-radius': '30px',
    'font-size-adjust': '0.78',
    'padding-left': '50px'
}

export default Item