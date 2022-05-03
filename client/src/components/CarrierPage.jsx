
import '../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { getAllCarriersURL } from "../URLs"
import Carriers from './Carrier/Carriers'
import Header from './Carrier/Header'
import { Route, Routes } from 'react-router-dom'
import AddCarrier from './Carrier/AddCarrier'


const CarrierShipping = (props) => {

    const [showAddCarrier, setShowAddCarrier] = useState(false);

    // const [carriers, setCarriers] = useState({ id: "", name: "", phone: "" });
    const [carriers, setCarriers] = useState([]);

    const onClickAdd = () => {

    }

    const addCarrier = () => {

    }

    const deleteCarrier = (id) => {

    }

    const updateCarrier = () => {

    }


    useEffect(() => {
        const getCarriers = async () => {
            try {
                const { data } = await axios.get(getAllCarriersURL())
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

