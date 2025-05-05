import { useEffect, useState } from "react";

const useDateCountDown = () => {
  const timeOfEvent = new Date("2025-05-12").getTime();
  const timeNow = new Date().getTime();
  const distance = timeOfEvent - timeNow;
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [distance, setDays, setHours, setMinutes, setSeconds]);
  return { days, hours, minutes, seconds, timeOfEvent };
};
export default useDateCountDown;
