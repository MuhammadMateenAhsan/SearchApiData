import React, { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    async function get() {
       
            const data = await fetch(
                'https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100'
            );
             const Data = await data.json();
            setData(Data.data);
    }

    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, data]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterData = () => {
        const filteredResults = data.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredResults);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table className="table border text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(filteredData) &&
                        filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.date_of_birth}</td>
                                <td>{item.email}</td>
                                <td>{item.imageUrl}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;
