function Table({ normaldataList, message }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>place</th>
          <th>date</th>
          <th>time</th>
          <th>duration</th>
          <th>attender</th>
          <th>permission</th>
          <th>crowd</th>
          <th>case history</th>
        </tr>
      </thead>
      <tbody>
        {normaldataList.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.place}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.duration}</td>
            <td>{item.attender}</td>
            <td>{item.permission}</td>
            <td>{item.crowd ? "Yes" : "No"}</td>
            <td>{item.caseHistory}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
