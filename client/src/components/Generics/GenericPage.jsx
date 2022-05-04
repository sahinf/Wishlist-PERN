
import '../../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import Header from '../Header'
import { Route, Routes } from 'react-router-dom'

// import AddItem from './GenericAddItem'
import Item from './GenericItem'
import { green } from '@material-ui/core/colors'

const GenericPage = ({ genericInfo, ItemComponent, AddComponent }, props) => {

    const [showAdd, setShowAdd] = useState(false);
    let [items, setItems] = useState([]);

    const { displayInfo } = genericInfo;
    items.forEach(e => {
        e.one = e[displayInfo.one];
        e.two = e[displayInfo.two];
        e.three = e[displayInfo.three];
    })

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemsFromServer = await fetchItems();
                console.log(itemsFromServer)
                setItems(itemsFromServer);
            } catch (e) {
                alert(`Error: ${e?.response?.data}`)
            }
        }
        getItems();
    }, [])

    const { urls } = genericInfo;
    //* Fetch all data from URL
    const fetchItems = async () => {
        const { data } = await axios({
            method: "get",
            url: urls.getURL,
            body: {
                table: 'manufacturer'
            }
        })
        return data;
    }

    //* Add OR update existing!
    const { table, pk } = genericInfo.crud;
    const addItem = async (item) => {
        try {
            const { data } = await axios({
                method: "put",
                url: urls.putURL,
                data: {
                    items: {
                        ...item
                    },
                    table,
                    pk
                }
            });
            setItems(
                items.map((i) =>
                    i[pk] === item[pk] ? { ...item } : i
                )
            )
        } catch (e) {
            alert(`Error: ${e?.response?.data}`)
        }
    }

    //* Delete if can
    const deleteItem = async (item) => {
        try {
            await axios({
                method: "delete",
                url: urls.delURL,
                data: {
                    items: { ...item },
                    table,
                    pk
                }
            });
            setItems(items.filter((i) => i[pk] !== item[pk]));
        } catch (e) {
            alert(`Error: ${e?.response?.data}`)
        }
    }

    const onToggle = () => {
        console.log("Clicked an Item! This does nothing for now :D")
    }
    return (
        <div className='container'>
            <Header
                onAdd={() => setShowAdd(!showAdd)}
                showAdd={showAdd}
                title={genericInfo.head_title}
                path={genericInfo.head_path}
            />
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            {showAdd && <AddComponent onAdd={addItem} addInfo={genericInfo.addInfo} />}
                            {items.length > 0 ? (
                                <>
                                    {items.map((item, index) => (
                                        <ItemComponent key={index} item={item} onDelete={deleteItem} onToggle={onToggle} />
                                    ))}
                                </>

                            ) : (
                                `No ${genericInfo.head_title} To Show`
                            )}
                        </>
                    }
                />
            </Routes >
        </div>
    )
}

export default GenericPage;

