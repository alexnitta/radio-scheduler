const StationRow = ({row}) => (
  <tr>
    <td className="station-row">{row.call}</td>
    <td className="station-row">{row.frequency}</td>
    <td className="station-row">{row.band}</td>
    <td className="station-row">{row.name}</td>
    <td className="station-row"><a href={row.website}>{row.website}</a></td>
  </tr>  
);
