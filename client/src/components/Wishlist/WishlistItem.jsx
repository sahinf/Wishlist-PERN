import { red } from '@material-ui/core/colors'
import { FaTimes } from 'react-icons/fa'

const Item = ({ item, onDelete, onToggle, genericInfo }) => {
    return (
        < tr >
            <td> <strong>{item.product_desc}  </strong></td>
            <td> {item.product_price}  </td>
            <td> {item.carrier_name}  </td>
            <td> {item.carrier_phone}  </td>
            <td> {item.seller_name}  </td>
            <td> <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(item)} /></td>
        </tr >
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