import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

// Example fetch function
async function fetchMonthlyNYA() {
  const url = `https://api.twelvedata.com/time_series?start_date=2015-05-06&symbol=pltr&interval=1day&apikey=c8deb5ad35bc4130ac1fae7fcbd59677`;
  const res = await fetch("/pltr.json");
  const json = await res.json();
  // parse json.values array into { date, close }
  const data = json.values.map((v: any) => ({
    t: new Date(v.datetime),
    close: parseFloat(v.close),
  })).reverse(); // chronological order
  return data;
}

type DataPoint = {
  t: Date;
  close: number;
};


const Line3DChart: React.FC = () => {
  const [x, setX] = useState<Date[]>([]);
  const [y, setY] = useState<number[]>([]);
  const [z, setZ] = useState<number[]>([]);

  useEffect(() => {
    fetchMonthlyNYA().then(data => {
      setX(data.map((d: DataPoint) => d.t));
      setY(data.map((d: DataPoint) => d.close));
      setZ(data.map((_: number, i: number) => 0));
    });
  }, []);

  return (
    <Plot
      data={[
        {
          type: 'scatter3d',
          mode: 'lines',
          x,
          y,
          z,
          line: { width: 4, color: 'blue' },
        },
      ]}
      layout={{
        title: "3D Line Chart of NYSE (^NYA) Monthly",
        scene: {
          xaxis: { title: "Date", tickangle: -45 },
          yaxis: { title: "Close Price" },
          zaxis: { title: "Month Index" },
        },
        autosize: true,
        margin: { l: 0, r: 0, b: 0, t: 40 },
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "600px" }}
      config={{ responsive: true }}
    />
  );
};

export default Line3DChart;
