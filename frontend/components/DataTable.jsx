import React from 'react';

const DataTable = ({ title, data }) => {
  return (
    <div className="overflow-x-auto mb-8 p-4 rounded-xl" data-aos="zoom-in-up" data-aos-duration="1000" data-theme="luxury">
    <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
    <table className="table table-zebra text-center w-full   p-4">
      <thead>
        <tr>
          <th className="p-2">Value</th>
          <th className="p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="p-2">{item.value}</td>
            <td className="p-2">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default DataTable;
