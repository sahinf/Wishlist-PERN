
import '../../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import Header from '../Header'
import { Route, Routes } from 'react-router-dom'

// import AddItem from './GenericAddItem'

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
                console.log('Get request from server: ',itemsFromServer)
                setItems(itemsFromServer);
            } catch (e) {
                alert(`Error: ${e?.response?.data}`)
            }
        }
        getItems();
    }, [])

    const { urls } = genericInfo;
    const { crud } = genericInfo;
    //* Fetch all data from URL
    const fetchItems = async () => {
        const { data } = await axios({
            method: "get",
            url: urls.getURL,
            body: {
                table: crud.table
            }
        })
        return data;
    }

    //* Add OR update existing!
    const { table, pk } = genericInfo.crud;
    const addItem = async (item) => {
        console.log('trying to add item: ', item)
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
            setItems([...items, item]);
        } catch (e) {
            alert(`Error: ${e?.response?.data}`)
        }
    }

    //* Delete if can
    const deleteItem = async (item) => {
        try {
            // console.log('deleteing', genericInfo.user)
            await axios({
                method: "delete",
                url: urls.delURL,
                data: {
                    items: { ...item, },
                    table,
                    pk,
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
                            {showAdd && <AddComponent onAdd={addItem} addInfo={genericInfo.addInfo} genericInfo={genericInfo} />}
                            {items.length > 0 ? (
                                <>
                                    {items.map((item, index) => (
                                        <ItemComponent key={index} item={item} onDelete={deleteItem} onToggle={onToggle} genericInfo={genericInfo}/>
                                    ))}
                                </>

                            ) : (
                                `No data to show :(`
                            )}
                        </>
                    }
                />
            </Routes >
        </div>
    )
}

export default GenericPage;

