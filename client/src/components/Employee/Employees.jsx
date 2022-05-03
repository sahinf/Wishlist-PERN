import Item from "./Employee"

const Employees = ({ carriers, onDelete, onToggle }) => {
    return (
        <>
            {carriers.map((carrier, index) => (
                <Item key={index} carrier={carrier} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Employees