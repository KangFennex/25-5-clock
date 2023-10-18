import { BsFillPlayFill, BsPauseFill, BsFillStopFill } from "react-icons/bs";

const Display = ({ displayState, reset, startStop, formatTime }) => {
    return (
        <div className="display">
            <h4 id="timer-label">{displayState.timeType}</h4>
            <span
                className="time-display"
                style={{ color: `${displayState.timerRunning ? "red" : "white"}` }}
            >
                {formatTime(displayState.time)}
            </span>
            <div className="controls">
                <button id="start-stop" onClick={startStop}>
                    {displayState.timerRunning ? <BsPauseFill size={35} id="control" /> : <BsFillPlayFill size={35} id="control" />}
                </button>
                <button id="reset" onClick={reset}>
                    <BsFillStopFill size={35} id="control" />
                </button>
            </div>
        </div>
    )
}

export default Display
