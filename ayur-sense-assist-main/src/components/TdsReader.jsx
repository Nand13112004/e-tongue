import { useEffect, useState } from "react";

export default function TdsReader() {
  const [tds, setTds] = useState("Loading...");

  useEffect(() => {
    const fetchTDS = async () => {
      try {
        const res = await fetch("http://localhost:5000/tds");
        const data = await res.json();
        setTds(data.tds || "No Data");
      } catch (err) {
        console.error("Error fetching TDS:", err);
      }
    };

    const interval = setInterval(fetchTDS, 1000); // fetch every 1s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">TDS Sensor Reading</h2>
      <p className="text-lg">{tds}</p>
    </div>
  );
}
    