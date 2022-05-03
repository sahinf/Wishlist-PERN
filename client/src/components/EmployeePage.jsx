
import '../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { employeesURL } from "../URLs"
import Header from './Header'
import { Route, Routes } from 'react-router-dom'

import AddEmployee from './Employee/AddEmployee'
import Items from './Employee/Items'

const EmployeePage = (props) => {

    const headerInfo = {
        path: '/employees'
    }

    const [showAdd, setShowAdd] = useState(false);
    const [items, setItems] = useState([]);

    items.forEach( e => {
        e.one = e.users_id
        e.two = `${e.employee_fname} ${e.employee_lname}`
        e.three = null
    })
    
    //TODO work in progress this bullshit
    //TODO useEffect fires infinite times wtf
    useEffect(() => {
        console.log(`using my ass`)
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

    //* Fetch all data from URL
    const fetchItems = async () => {
        const { data } = await axios.get(employeesURL())
        return data;
    }

    //* Add carrier, OR update existing!
    const addItem = async (item) => {
        console.log("Called additem!")
        try {
            const { data } = await axios({
                method: "put",
                url: employeesURL(),
                data: item
            });
            setItems(...items, data);
        } catch (e) {
            console.error(e.message);
        }
    }

    const deleteItem = async (item) => {
        try {
            console.log('calling ondelte with', item)
            const { data } = await axios({
                method: "delete",
                url: employeesURL(),
                data: item
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    const onToggle = () => {
        console.log("Clicked an Employee!")
    }
    return (
        <div className='container'>
            <Header
                onAdd={() => setShowAdd(!showAdd)}
                showAdd={showAdd}
                title='Employees'
                path={headerInfo.path}
            />
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            {showAdd && <AddEmployee onAdd={addItem} />}
                            {items.length > 0 ? (
                                <Items
                                    items={items}
                                    onDelete={deleteItem}
                                    onToggle={onToggle}
                                />
                            ) : (
                                'No Items To Show'
                            )}
                        </>
                    }
                />
            </Routes >
        </div>
    )
}

export default EmployeePage;

