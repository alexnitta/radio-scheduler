const StationTable = ({data}) => {
  
  const stationRows = data.items.map((station, index) => {
    
    const row = {};
    row.call = station.attributes.call;
    row.frequency = station.attributes.frequency;
    row.band = station.attributes.band;
    row.name = station.attributes.name;
    row.website = station.links.web[0].href;
    
    return (
      <StationRow row={row} key={index} />  
    );
  }); 
  
  return (
    <div className="stations">
      <table className="info">
        <thead>
          <tr>
            <th>Call</th>
            <th>Frequency</th>
            <th>Band</th>
            <th>Show</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {stationRows}
        </tbody>
      </table>
    </div>
  );
  
};
