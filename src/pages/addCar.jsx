import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
    const [carName, setcarName] = useState()
    const [maker, setmaker] = useState()
    const [type, settype] = useState()
    const [chassis, setchassis] = useState()
    const [model, setmodel] = useState()
    const [engineCode, setengineCode] = useState()
    const [mileage, setmileage] = useState()
    const [engineSize, setengineSize] = useState()
    const [year, setyear] = useState()
    const [regYear, setregYear] = useState()
    const [color, setcolor] = useState()
    const [wheeldrive, setwheeldrive] = useState()
    const [transmission, settransmission] = useState()
    const [location, setlocation] = useState()
    const [steering, setsteering] = useState()
    const [fuel, setfuel] = useState()
    const [seats, setseats] = useState()
    const [doors, setdoors] = useState()
    const [weight, setweight] = useState()
    const [availabilty, setavailability] = useState()
    const [price, setprice] = useState()
    const [totalPrice, settotalPrice] = useState()
    const [images, setimages] = useState([])
    const [newCar, setnewCar] = useState(" ")
    const [imgRes, setimgRes] = useState([])
    const nav = useNavigate();
    const [accepted, setaccepted] = useState(false);

    useEffect(() => {
        if (!window.sessionStorage.getItem('auth-token')) {
            console.log('no auth token set');
            nav("/");
        } else {
            const authToken = '123456abcdef';
            if (window.sessionStorage.getItem('auth-token') == authToken) {
                console.log('good token. Log in.')
                //do something like redirect to todo page
                setaccepted(true)
            } else {
                console.log('bad token.')
                nav("/");
            }
        }
    }, []);


    const handleChange1 = (e) => {
        setcarName(e.target.value)
    }
    const handleChange2 = (e) => {
        setmaker(e.target.value)
    }
    const handleChange3 = (e) => {
        settype(e.target.value)
    }
    const handleChange4 = (e) => {
        setchassis(e.target.value)
    }
    const handleChange5 = (e) => {
        setmodel(e.target.value)
    }
    const handleChange6 = (e) => {
        setengineCode(e.target.value)
    }
    const handleChange7 = (e) => {
        setmileage(e.target.value)
    }
    const handleChange8 = (e) => {
        setengineSize(e.target.value)
    }
    const handleChange9 = (e) => {
        setyear(e.target.value)
    }
    const handleChange10 = (e) => {
        setregYear(e.target.value)
    }
    const handleChange11 = (e) => {
        setcolor(e.target.value)
    }
    const handleChange12 = (e) => {
        setwheeldrive(e.target.value)
    }
    const handleChange13 = (e) => {
        settransmission(e.target.value)
    }
    const handleChange14 = (e) => {
        setlocation(e.target.value)
    }
    const handleChange15 = (e) => {
        setsteering(e.target.value)
    }
    const handleChange16 = (e) => {
        setfuel(e.target.value)
    }
    const handleChange17 = (e) => {
        setseats(e.target.value)
    }
    const handleChange18 = (e) => {
        setdoors(e.target.value)
    }
    const handleChange19 = (e) => {
        setweight(e.target.value)
    }
    const handleChange20 = (e) => {
        setavailability(e.target.value)
    }
    const handleChange21 = (e) => {
        setprice(e.target.value)
    }
    const handleChange22 = (e) => {
        settotalPrice(e.target.value)
    }
    const handleChange23 = (e) => {
        setimages(e.target.files);
        const car = {
            name: carName,
            chassis: chassis,
            maker: maker,
            type: type,
            model: model,
            engineCode: engineCode,
            mileage: mileage,
            engineSize: engineSize,
            registrationYear: regYear,
            manufacturingYear: year,
            color: color,
            wheelDrive: wheeldrive,
            transmission: transmission,
            location: location,
            steering: steering,
            fuel: fuel,
            seats: seats,
            doors: doors,
            weight: weight,
            availability: availabilty,
            price: price,
            totalPrice: totalPrice,
        }

        axios.post("http://localhost:3000/cars", car)
            .then(res => {
                setnewCar(res.data.car);
                // console.log(newCar)
            })
    }

    const handleSubmit = (event) => {
        const id = newCar.carid;
        // console.log(newCar.carid)
        const imgs = new FormData();
        [...images].forEach(file => {
            imgs.append("images", file);
            imgs.append("carid", id);
            const bg = {
                images: imgs.get("images"),
                carid: imgs.get("carid")
            }
            axios.post("http://localhost:3000/images/uploads", bg,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    //console.log(res)
                    alert('Car Added Succesfully')
                })
        },
        )
    }

    return !accepted ? (<></>) : (
        <div className=" w-screen">
            <h2 className=" font-sans font-bold text-3xl m-3 text-sky-900">Add Car</h2>
            <form onSubmit={handleSubmit}>
                <div className=" flex mx-6 my-2 p-5">
                    <div className=" font-sans font-semibold text-lg">
                        <tr className=" ">CARNAME: <input className=" p-1 font-thin my-1" type="text" value={carName} onChange={handleChange1} required /></tr>
                        <tr className=" ">MAKER: <input className=" p-1 font-thin my-1" type="text" value={maker} onChange={handleChange2} required /></tr>
                        <tr className=" ">TYPE: <input className=" p-1 font-thin my-1" type="text" value={type} onChange={handleChange3} required /></tr>
                        <tr className=" ">CHASSIS: <input className=" p-1 font-thin my-1" type="text" value={chassis} onChange={handleChange4} required /></tr>
                        <tr className=" ">MODEL: <input className=" p-1 font-thin my-1" type="text" value={model} onChange={handleChange5} required /></tr>
                        <tr className=" ">ENGINECODE: <input className=" p-1 font-thin my-1" type="text" value={engineCode} onChange={handleChange6} required /></tr>
                        <tr className=" ">MILEAGE: <input className=" p-1 font-thin my-1" type="text" value={mileage} onChange={handleChange7} required /></tr>
                        <tr className=" ">ENGINESIZE: <input className=" p-1 font-thin my-1" type="text" value={engineSize} onChange={handleChange8} required /></tr>
                        <tr className=" ">YEAR: <input className=" p-1 font-thin my-1" type="number" value={year} onChange={handleChange9} required /></tr>
                        <tr className=" ">REG YEAR: <input className=" p-1 font-thin my-1" type="number" value={regYear} onChange={handleChange10} required /></tr>
                        <tr className=" ">COLOR: <input className=" p-1 font-thin my-1" type="text" value={color} onChange={handleChange11} required /></tr>
                        <tr className=" ">WHEELDRIVE: <input className=" p-1 font-thin my-1" type="text" value={wheeldrive} onChange={handleChange12} required /></tr>
                        <tr className=" ">TRANSMISSION: <input className=" p-1 font-thin my-1" type="text" value={transmission} onChange={handleChange13} required /></tr>
                        <tr className=" ">LOCATION: <input className=" p-1 font-thin my-1" type="text" value={location} onChange={handleChange14} required /></tr>
                        <tr className=" ">STEERING: <input className=" p-1 font-thin my-1" type="text" value={steering} onChange={handleChange15} required /></tr>
                        <tr className=" ">FUEL: <input className=" p-1 font-thin my-1" type="text" value={fuel} onChange={handleChange16} required /></tr>
                        <tr className=" ">SEATS: <input className=" p-1 font-thin my-1" type="number" value={seats} onChange={handleChange17} required /></tr>
                        <tr className=" ">DOORS: <input className=" p-1 font-thin my-1" type="number" value={doors} onChange={handleChange18} required /></tr>
                        <tr className=" ">WEIGHT: <input className=" p-1 font-thin my-1" type="text" value={weight} onChange={handleChange19} required /></tr>
                        <tr className=" ">AVAILABILITY: <input className=" p-1 font-thin my-1" type="text" value={availabilty} onChange={handleChange20} required /></tr>
                        <tr className=" ">PRICE: <input className=" p-1 font-thin my-1" type="number" value={price} onChange={handleChange21} required /></tr>
                        <tr className=" ">TOTALPRICE: <input className=" p-1 font-thin my-1" type="number" value={totalPrice} onChange={handleChange22} required /></tr>
                    </div>
                    <div className="font-sans font-semibold">
                        <tr className="">IMAGES: <input onChange={handleChange23} type="file" accept=".jpg,.png,.jpeg" multiple required /></tr>
                        <button type="submit" onSubmit={handleSubmit} className=" bg-blue-900 text-white p-2 m-5 rounded items-center"> POST CAR</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddCar;