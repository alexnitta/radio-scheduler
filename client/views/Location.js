class Location extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {
        lat: '[ ... ]',
        long: '[ ... ]'
      },
      data: {
        items: []
      }
    };
    
    const setLocation = (position) => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      });
      console.log('userLocation is: ', this.props.userLocation);
    };
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(setLocation.bind(this));
    } else {
      console.log('userLocation is not available');
    }
  } // end of constructor function
  
  // when component updates with the location, send a request to the NPR API 
  componentDidUpdate() {
    
    this.setState({
      data: sampleData
    });
    
    // const HOST = require('../../server/config/network-settings.').HOST;
    const HOST = 'https://127.0.0.1';
    
    fetch(`${HOST}/api/npr-data?lat=${this.state.userLocation.lat}&long=${this.state.userLocation.long}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data from api request:', data);
      })
      .catch((err) => {
        console.log('Error in api request: ', error);
      });
     
  }
  
  render() {
    
    return (
      <div>
        <div className="location">
          {this.state.data.items[0] ? 
            `Your location is lat: ${this.state.userLocation.lat}, long: ${this.state.userLocation.long}`
            : `Finding your location . . .`}
        </div>
        <StationTable data={this.state.data} />
      </div>
    );
  }
}
