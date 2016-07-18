class Container extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="main">
        <h1>
          <img src={'assets/radio-tower-icon.png'} className="radio-tower" />
          Local Radio
        </h1>
        <Location />
      </div>
    );
  }
}
