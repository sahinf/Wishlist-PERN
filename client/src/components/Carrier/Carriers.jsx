import Carrier from "./Carrier"

const Carriers = ({ carriers, onDelete, onToggle }) => {
    return (
        <>
            {carriers.map((carrier, index) => (
                <Carrier key={index} carrier={carrier} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Carriers