"use client"
import { useEffect, useState } from 'react';

//styling

const Count = props => {
    // label of counter
    // number to increment to
    // duration of count in seconds
    // console.log(props)
    const { number, duration } = {
        number: props.number || "1000",
        duration: props.duration || "10"

    }
    // console.log(number, duration)


    // number displayed by component
    const [count, setCount] = useState("0")

    useEffect(() => {
        let start = 0;
        // first three numbers from props
        const end = parseInt(number.substring(0,3))
        // if zero, return
        if (start === end) return;

        // find duration per increment
        let totalMilSecDur = parseInt(duration);
        let incrementTime = (totalMilSecDur / end) * 1000;

        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + number.substring(3))
            if (start === end) clearInterval(timer)
        }, incrementTime);

    }, [number, duration]);

    return (
        <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{count}+</h6>
    );
}

export default Count;
