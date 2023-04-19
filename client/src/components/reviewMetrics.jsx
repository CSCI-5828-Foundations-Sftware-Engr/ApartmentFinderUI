// // import React, { useEffect, useState } from 'react';
// // import { PieChart } from 'react-minimal-pie-chart';

// // function ReviewMetrics({data}) {
// //   const [chartData, setChartData] = useState([]);
// //   const [fullValues, setFullValues] = useState({
// //     positive: 0,
// //     negative: 0,
// //     neutral: 0
// //   })
// //   console.log(data)

// // //   const fetchData = async () => {
// // //     const response = await fetch('/api/review-analysis');
// // //     const data = await response.json();
// // //     const positive = data.reduce((acc, cur) => acc + cur.positive, 0);
// // //     const negative = data.reduce((acc, cur) => acc + cur.negative, 0);


// //   useEffect(() => {
// //     const positive = data.reduce((acc, cur) => acc + cur.positive, 0);
// //     const negative = data.reduce((acc, cur) => acc + cur.negative, 0);
// //     const neutral = data.reduce((acc, cur) => acc + cur.neutral || 0, 0);
// //     setFullValues({
// //       positive,
// //       negative,
// //       neutral
// //     })
// //     setChartData([
// //       { title: 'Positive', value: positive, color: '#E38627' },
// //       { title: 'Negative', value: negative, color: '#C13C37' },
// //       { title: 'Neutral', value: neutral, color: '#F13C37' },
// //     ]);
// //   }, [data]);

// //   return (
// //     <div style={{
// //       width: 200,
// //       height: 200
// //     }}>
// //       <h2>Property Review Analysis</h2>
// //       <PieChart data={chartData}/>
// //       <p>Positive: {fullValues.positive}</p>
// //       <p>Negative: {fullValues.negative}</p>
// //       <p>Neutral: {fullValues.neutral}</p>
// //     </div>
// //   );
// // }

// // export default ReviewMetrics;

// import React, { useEffect, useState } from 'react';
// import { PieChart } from 'react-minimal-pie-chart';

// function ReviewMetrics({ data }) {
//   const [chartData, setChartData] = useState([]);
//   const [fullValues, setFullValues] = useState({
//     positive: 0,
//     negative: 0,
//     neutral: 0,
//   });
//   console.log(data);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const positive = data.reduce((acc, cur) => acc + cur.positive, 0);
//       const negative = data.reduce((acc, cur) => acc + cur.negative, 0);
//       const neutral = data.reduce((acc, cur) => acc + (cur.neutral || 0), 0);
//       setFullValues({
//         positive,
//         negative,
//         neutral,
//       });
//       setChartData([
//         { title: 'Positive', value: positive, color: '#E38627' },
//         { title: 'Negative', value: negative, color: '#C13C37' },
//         { title: 'Neutral', value: neutral, color: '#F13C37' },
//       ]);
//     }
//   }, [data]);

//   return (
//     <div
//       style={{
//         width: 200,
//         height: 200,
//       }}
//     >
//       <h2>Property Review Analysis</h2>
//       <PieChart data={chartData} />
//       <p>Positive: {fullValues.positive}</p>
//       <p>Negative: {fullValues.negative}</p>
//       <p>Neutral: {fullValues.neutral}</p>
//     </div>
//   );
// }

// export default ReviewMetrics;
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function ReviewMetrics({ data }) {
  const [chartData, setChartData] = useState([]);
  const [fullValues, setFullValues] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  console.log(data);

  useEffect(() => {
    if (data && data.length > 0) {
      const positive = data.reduce((acc, cur) => acc + cur.positive, 0);
      const negative = data.reduce((acc, cur) => acc + cur.negative, 0);
      const neutral = data.reduce((acc, cur) => acc + (cur.neutral || 0), 0);
      setFullValues({
        positive,
        negative,
        neutral,
      });
      setChartData([
        { title: 'Positive', value: positive, color: '#E38627' },
        { title: 'Negative', value: negative, color: '#C13C37' },
        { title: 'Neutral', value: neutral, color: '#F13C37' },
      ]);
    }
  }, [data]);

  const hasChartData = chartData.length > 0;

  return (
    <>
      {hasChartData && (
        <div
          style={{
            width: 200,
            height: 200,
          }}
        >
          <h2>Property Review Analysis</h2>
          <PieChart data={chartData} />
          <p>Positive: {fullValues.positive}</p>
          <p>Negative: {fullValues.negative}</p>
          <p>Neutral: {fullValues.neutral}</p>
        </div>
      )}
    </>
  );
}

export default ReviewMetrics;