/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { Text } from 'react-native';


export default function CurrentTime() {
    const [hours, setHours] = useState(new Date().getHours())
    const [mins, setMins] = useState(new Date().getMinutes())

    useEffect(() => {
        setInterval(() => {
            setHours(new Date().getHours())
            setMins(new Date().getMinutes())
        }, new Date().getMinutes())

    }, [])

    return (
        <Text>{hours}:{mins < 10 ? "0" : null}{mins}{new Date().getHours() > 12 ? "PM" : "AM"}</Text>
    );
}
