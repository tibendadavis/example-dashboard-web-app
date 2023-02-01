import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';

//import all_Cars from '../../constants/Cars';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';
import axios from "axios";

function Cars() {
    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [Cars, setCars] = useState([]);
    const [AllCars, setAllCars] = useState([]);
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
        axios.get("http://localhost:3000/cars")
            .then(res => {
                setPagination(calculateRange(res.data.cars, 15));
                setAllCars(res.data.cars);
                setCars(sliceData(res.data.cars, page, 15));
                console.log("checking.....")
            })
    }, []);





    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            const search_results = AllCars.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.maker.toLowerCase().includes(search.toLowerCase()) ||
                item.type.toLowerCase().includes(search.toLowerCase()) ||
                item.model.toLowerCase().includes(search.toLowerCase()) ||
                item.engineCode.toLowerCase().includes(search.toLowerCase()) ||
                item.engineSize.toLowerCase().includes(search.toLowerCase()) ||
                item.mileage.toLowerCase().includes(search.toLowerCase()) ||
                item.color.toLowerCase().includes(search.toLowerCase()) ||
                item.wheelDrive.toLowerCase().includes(search.toLowerCase()) ||
                item.transmission.toLowerCase().includes(search.toLowerCase()) ||
                item.location.toLowerCase().includes(search.toLowerCase()) ||
                item.steering.toLowerCase().includes(search.toLowerCase()) ||
                item.fuel.toLowerCase().includes(search.toLowerCase()) ||
                item.weight.toLowerCase().includes(search.toLowerCase()) ||
                item.registrationYear.toString().toLowerCase().includes(search.toLowerCase()) ||
                item.manufacturingYear.toString().toLowerCase().includes(search.toLowerCase()) ||
                item.doors.toString().toLowerCase().includes(search.toLowerCase()) ||
                item.seats.toString().toLowerCase().includes(search.toLowerCase()) ||
                item.price.toString().toLowerCase().includes(search.toLowerCase()) ||
                item.totalPrice.toString().toLowerCase().includes(search.toLowerCase())
            );
            setCars(search_results);
        }
        else {
            __handleChangePage(page);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        axios.get("http://localhost:3000/cars")
            .then(res => {
                setCars(sliceData(res.data.cars, new_page, 15));
                console.log("checking.....")
            })

    }

    return !accepted ? (<></>) : (
        <div className=' ml-0'>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Car List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={__handleSearch} />
                    </div>
                </div>

                <table className=' '>
                    <thead className=''>
                        <th>ID</th>
                        <th>CARNAME</th>
                        <th>MAKER</th>
                        <th>TYPE</th>
                        <th>CHASSIS</th>
                        <th>MODEL</th>
                        <th>ENGINECODE</th>
                        <th>MILEAGE</th>
                        <th>ENGINESIZE</th>
                        <th>YEAR</th>
                        <th>REG YEAR</th>
                        <th>COLOR</th>
                        <th>WHEELDRIVE</th>
                        <th>TRANSMISSION</th>
                        <th>LOCATION</th>
                        <th>STEERING</th>
                        <th>FUEL</th>
                        <th>SEATS</th>
                        <th>DOORS</th>
                        <th>WEIGHT</th>
                        <th>AVAILABILITY</th>
                        <th>PRICE</th>
                        <th>TOTALPRICE</th>
                        <th> </th>
                    </thead>

                    {Cars.length !== 0 ?
                        <tbody>
                            {Cars.map((Cars, index) => (
                                <tr key={index}>
                                    <td><span>{Cars.carid}</span></td>
                                    <td><span>{Cars.name}</span></td>
                                    <td><span>{Cars.maker}</span></td>
                                    <td><span>{Cars.type}</span></td>
                                    <td><span>{Cars.chassis}</span></td>
                                    <td><span>{Cars.model}</span></td>
                                    <td><span>{Cars.engineCode}</span></td>
                                    <td><span>{Cars.mileage}</span></td>
                                    <td><span>{Cars.engineSize}</span></td>
                                    <td><span>{Cars.registrationYear}</span></td>
                                    <td><span>{Cars.manufacturingYear}</span></td>
                                    <td><span>{Cars.color}</span></td>
                                    <td><span>{Cars.wheelDrive}</span></td>
                                    <td><span>{Cars.transmission}</span></td>
                                    <td><span>{Cars.location}</span></td>
                                    <td><span>{Cars.steering}</span></td>
                                    <td><span>{Cars.fuel}</span></td>
                                    <td><span>{Cars.seats}</span></td>
                                    <td><span>{Cars.doors}</span></td>
                                    <td><span>{Cars.weight}</span></td>
                                    <td><span>{Cars.availability}</span></td>
                                    <td><span>{Cars.price}</span></td>
                                    <td><span>{Cars.totalPrice}</span></td>
                                    <td><button className=' bg-blue-900 text-white p-2 rounded-lg' onClick={() => {
                                        axios.delete("http://localhost:3000/cars/" + Cars.carid)
                                            .then(res => {
                                                axios.get("http://localhost:3000/cars")
                                                    .then(res => {
                                                        setCars(res.data.cars)
                                                    }
                                                    )
                                            }
                                            )
                                    }}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                        : null}
                </table>

                {Cars.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((Cars, index) => (
                            <span
                                key={index}
                                className={Cars === Cars ? 'active-pagination' : 'pagination'}
                                onClick={() => { __handleChangePage(Cars) }}>
                                {Cars}
                            </span>
                        ))}
                    </div>
                    :
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cars;