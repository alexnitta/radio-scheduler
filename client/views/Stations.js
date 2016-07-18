class Stations extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <table>
        <tr>
          <th>Call</th>
          <th>Frequency</th>
          <th>Band</th>
          <th>Show</th>
          <th>Website</th>
        </tr>
        <tr>
          <td>KQED</td>
          <td>88.5</td>
          <td>FM</td>
          <td>Forum</td>
          <td>http://kqed.org</td>
        </tr>
      </table>  
    );
  }
  
}

