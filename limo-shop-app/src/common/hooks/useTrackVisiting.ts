import { useEffect } from "react";

const URL = import.meta.env.VITE_URL;

export function useTrackVisiting() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const response = await fetch(`${URL}track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: window.location.pathname,
          }),
        });
        if (!response.ok) {
          console.error("Tracking failed with status:", response.status);
        }
      } catch (err) {
        console.error();
      }
    };
    trackVisit();
  }, []);
}
