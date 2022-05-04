import { red } from '@material-ui/core/colors'
import { FaTimes } from 'react-icons/fa'

const Item = ({ item, onDelete, onToggle }) => {
    return (
        <div
            // className={`Employee ${item.users_id && 'phone'}`}
            onDoubleClick={() => onToggle(item.users_id)}
        >
            <h3 style={h3style} >
                {`Customer ${item.two} is a ${item.three} tier Customer`}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(item)}
                />
            </h3>
            <div style={style2}> {`Managed by Employee: ${item.one}`} </div>
            {/* <p>{item.}</p> */}
            <br></br>
        </div>
    )
}

const h3style = {
    color: 'white',
    backgroundColor: 'black',
    'border': '2px solid cyan',
    'border-radius': '20%',
}

const style2 = {
    'height': '5vw',
    'width': '80vw',
    'border': '2px solid green',
    'border-top-right-radius': '30px',
    'border-bottom-left-radius': '30px',
    'font-size-adjust' : '0.78',
    'padding-left' : '50px'
}

export default Item