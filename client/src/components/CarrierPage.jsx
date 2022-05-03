
import '../css/Common.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { carriersURL, getAllCarriersURL } from "../URLs"
import Carriers from './Carrier/Carriers'
import Header from './Carrier/Header'
import { Route, Routes } from 'react-router-dom'
import AddCarrier from './Carrier/AddCarrier'


const CarrierShipping = (props) => {

    const [showAddCarrier, setShowAddCarrier] = useState(false);
    const [carriers, setCarriers] = useState([]);

    const onClickAdd = () => {

    }

    //* Add carrier, OR update existing!
    const addCarrier = async (carrier) => {
        const { data } = await axios({
            method: "put",
            url: carriersURL(),
            data: carrier
        });
        console.log(data);
        setCarriers(...carriers, data);
    }

    const deleteCarrier = (carrier) => {

    }

    //* After addCarier is called, refresh carrier list! WORKS YAY
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
    }, [addCarrier])

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

