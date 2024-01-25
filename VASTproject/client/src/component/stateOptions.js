import React, { useEffect, useState, Component } from "react";

export default function StateOptions() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`https://carsoe2.eastus.cloudapp.azure.com/node/api/windVel`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records[0].states);
        }

        getRecords();

        return;
    }, [records.length]);

    //const records = this.props.records;
    return records.map((record, i) => {
        return (
            <option
                value={record.name}
            >{record.name}</option>
        );
    })
}