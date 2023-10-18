import { useEffect, useRef } from "react";

const useStopWatch = (callback) => {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = (time) => {
        if (previousTimeRef.current != undefined) {
            const deltatime = time - previousTimeRef.current;
            callback(deltatime)
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current)
    }, []);

    return () => cancelAnimationFrame(requestRef.current)
}

export default useStopWatch;


