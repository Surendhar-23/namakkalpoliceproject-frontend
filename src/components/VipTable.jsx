function Table({ vipdataList }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>place</th>
          <th>date</th>
          <th>modeofArrival</th>
          <th>entryRoute</th>
          <th>exitRoute</th>
          <th>PlaceofStay</th>
          <th>crowd</th>
          <th>officer</th>
        </tr>
      </thead>
      <tbody>
        {vipdataList.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.place}</td>
            <td>{item.date}</td>
            <td>{item.modeofArrival}</td>
            <td>{item.entryRoute}</td>
            <td>{item.exitRoute}</td>
            <td>{item.PlaceofStay}</td>
            <td>{item.crowd ? "Yes" : "No"}</td>
            <td>{item.officer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
