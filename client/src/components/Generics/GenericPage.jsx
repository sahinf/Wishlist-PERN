
import '../../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import Header from '../Header'
import { Route, Routes } from 'react-router-dom'

import AddItem from './GenericAddItem'
import Item from './GenericItem'
import { green } from '@material-ui/core/colors'

const GenericPage = ({ genericInfo, ItemComponent, AddComponent }, props) => {

    const [showAdd, setShowAdd] = useState(false);
    let [items, setItems] = useState([]);

    const { displayInfo } = genericInfo;
    console.log(displayInfo)
    items.forEach(e => {
        e.one = e[displayInfo.one];
        e.two = e[displayInfo.two];
        e.three = e[displayInfo.three];
    })

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemsFromServer = await fetchItems();
                setItems(itemsFromServer);
            } catch (error) {
                console.error(error.message);
            }
        }
        getItems();
    }, [])

    const { urls } = genericInfo;
    console.log(urls);
    //* Fetch all data from URL
    const fetchItems = async () => {
        const { data } = await axios.get(urls.getURL)
        return data;
    }

    //* Add OR update existing!
    const addItem = async (item) => {
        try {
            const { data } = await axios({
                method: "put",
                url: urls.putURL,
                data: item
            });
            console.log(data);
            setItems([...items, item]);
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
                data: item
            });
            setItems(items.filter((i) => i.users_id !== item.users_id));
        } catch (e) {
            alert(`Error: ${e?.response?.data}`)
        }
    }

    const onToggle = () => {
        console.log("Clicked an Item!")
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
                            {showAdd && <AddItem onAdd={addItem} addInfo={genericInfo.addInfo} />}
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

