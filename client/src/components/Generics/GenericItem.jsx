import { FaTimes } from 'react-icons/fa'

const Item = ({ item, onDelete, onToggle }) => {
    return (
        <div
            // className={`Employee ${item.users_id && 'phone'}`}
            onDoubleClick={() => onToggle(item.users_id)}
        >
            <h3>
                {`${item.one}: ${item.two} ${item.three}`}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(item)}
                />
            </h3>
            {/* <p>{item.}</p> */}
            <br></br>
        </div>
    )
}

export default Item