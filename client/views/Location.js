class Location extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {
        lat: '[ ... ]',
        long: '[ ... ]'
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
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(setLocation.bind(this));
    } else {
      /* geolocation IS NOT available */
      console.log('userLocation is not available');
    }
  }
  
  
  render() {
    return (
      <div>
        Your location is lat: {this.state.userLocation.lat}, long: {this.state.userLocation.long}
      </div>
    );
  }
}
