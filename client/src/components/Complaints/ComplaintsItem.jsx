import { FaTimes } from 'react-icons/fa'

const ComplaintsItem = ({ item, onDelete, onToggle, genericInfo }) => {
    if (item.users_customer_id != genericInfo.user) {
        return <></>
    }
    return (
        <div
            onDoubleClick={() => onToggle(item.users_id)}
        >
            <h2 style={h3style} >
                {`${item.complaint_id} --- ${item.complaint_status} --- ${item.complaint_date}`}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(item)}
                />
            </h2>
            <h3>{`\"${item.complaint_text}\"`}</h3>
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

export default ComplaintsItem