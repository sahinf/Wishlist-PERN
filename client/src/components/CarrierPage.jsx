
import '../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import urls from "../URLs"
import Header from './Header'
import { Route, Routes } from 'react-router-dom'

import AddCarrier from './Carrier/AddCarrier'
import Carriers from './Carrier/Carriers' 

const { carriersURL } = urls;
const CarrierShipping = (props) => {

    const [showAddCarrier, setShowAddCarrier] = useState(false);
    const [carriers, setCarriers] = useState([]);

    //* Add carrier, OR update existing!
    const addCarrier = async (carrier) => {
        try {
            const { data } = await axios({
                method: "put",
                url: carriersURL(),
                data: carrier
            });
            setCarriers(...carriers, data);
        } catch (e) {
            console.error(e.message);
        }
    }

    const deleteCarrier = async (carrier) => {
        try {
            const { data } = await axios({
                method: "delete",
                url: carriersURL(),
                data: carrier
            });
            console.log(data);
            //* For some reason, we don't need to setCarriers here after deleting, 
        } catch (e) {
            console.error(e.message);
        }
    }

    //* After addCarier is called, refresh carrier list! WORKS YAY
    useEffect(() => {
        console.log("use effect called in carrier")
        const getCarriers = async () => {
            try {
                const { data } = await axios.get(carriersURL())
                setCarriers(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        getCarriers();
    }, [])

    const onToggle = () => {
        console.log("Clicked a carrier!")
    }
    return (
        <div className='container'>
            <Header
                onAdd={() => setShowAddCarrier(!showAddCarrier)}
                showAdd={showAddCarrier}
                title='Carriers'
                path='/carrier-shipping'
            />
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            {showAddCarrier && <AddCarrier onAdd={addCarrier} />}
                            {carriers.length > 0 ? (
                                <Carriers
                                    carriers={carriers}
                                    onDelete={deleteCarrier}
                                    onToggle={onToggle}
                                />
                            ) : (
                                'No Carriers To Show'
                            )}
                        </>
                    }
                />
            </Routes >
        </div>
    )
}

export default CarrierShipping;

