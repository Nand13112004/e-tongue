import React, { useEffect, useState } from 'react';

export default function TdsReader() {
  const [tds, setTds] = useState('');

  useEffect(() => {
    const fetchTds = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/tds');
        const data = await res.json();
        setTds(data.tds);
      } catch (err) {
        setTds('Error');
      }
    };
    const interval = setInterval(fetchTds, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>TDS Value</h2>
      <div>{tds ? tds + ' ppm' : 'Loading...'}</div>
    </div>
  );
}
