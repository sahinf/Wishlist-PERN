/**
 * 
Create carrier
Read/check carrier status
Update carrier info
Delete carrier
 */

import axios from "axios"

import { useEffect, useState } from "react"

import { getAllCarriersURL } from "../URLs"
import Carrier from "./misc/Carrier";


const CarrierShipping = (props) => {

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
                console.log('Carriers data:', data);
            } catch (error) {
                console.error(error.message);
            }
        }
        getCarriers();
    }, [])

    const onToggle = () => {
        console.log("Clicked a carrier!")
    }
    // console.log(carriers);
    return (
        <>
            {carriers.map( (carrier, index) => (
                <Carrier key={index} carrier={carrier} onDelete={deleteCarrier} onToggle={onToggle} />
            ) )}
            {/* <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Task</label>
                    <input
                        type='text'
                        placeholder='Add Task'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Day & Time</label>
                    <input
                        type='text'
                        placeholder='Add Day & Time'
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input
                        type='checkbox'
                        checked={reminder}
                        value={reminder}
                        onChange={(e) => setReminder(e.currentTarget.checked)}
                    />
                </div>

                <input type='submit' value='Save Task' className='btn btn-block' />

            </form> */}
        </>
    )
}

export default CarrierShipping;

