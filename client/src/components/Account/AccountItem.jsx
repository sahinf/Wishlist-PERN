import { FaTimes } from 'react-icons/fa'

const AccountItem = ({ item, onDelete, onToggle, genericInfo }) => {
    if (genericInfo.user != item.users_id) {
        return <></>
    }
    return (
        <div
            onDoubleClick={() => onToggle(item.users_id)}
        >
            <h1 style={h3style} >
                {`Account ID: ${item.users_id}--------`}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(item)}
                />
            </h1>
            <h1 style={h3style}>{`Password: ${item.user_password}`}</h1>
            <br></br>
        </div>
    )
}

const h3style = {
    color: 'navy',
    backgroundColor: 'pink',
    'border': '2px solid maroon',
    'borderRadius': '20%',
    'justify-content' : 'left'
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

export default AccountItem