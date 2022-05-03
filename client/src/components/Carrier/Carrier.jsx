import { FaTimes } from 'react-icons/fa'

const Carrier = ({ carrier, onDelete, onToggle }) => {
    return (
        <div
            className={`carrier ${carrier.carrier_phone && 'phone'}`}
            onDoubleClick={() => onToggle(carrier.id)}
        >
            <h3>
                {`${carrier.carrier_id}: ${carrier.carrier_name}`}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(carrier)}
                />
            </h3>
            <p>{carrier.carrier_phone}</p>
        </div>
    )
}

export default Carrier