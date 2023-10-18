import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from "react-icons/hi";

const TimeSetter = ({ time, setTime, min, max, interval }) => {
    return (
        <div className="setters">
            <button
                onClick={() => (time > min ? setTime(time - interval) : null)}
            >
                <HiOutlineArrowSmDown size={35} />
            </button>
            <span>{time / interval}</span>
            <button
                onClick={() => (time < max ? setTime(time + interval) : null)}
            >
                <HiOutlineArrowSmUp size={35} />
            </button>
        </div>
    )
}

export default TimeSetter
