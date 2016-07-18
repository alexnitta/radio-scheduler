'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const userLocation = {
//   lat: 0,
//   long: 0
// };

// if (!navigator) {
//   let navigator = {};
// }

// if ('geolocation' in navigator) {
//   /* geolocation is available */
//   navigator.geolocation.getCurrentPosition(function(position) {
//     userLocation.lat = position.coords.latitude;
//     userLocation.long = position.coords.longitude;
//     console.log('userLocation is: ', userLocation);
//   });
// } else {
//   /* geolocation IS NOT available */
//   console.log('userLocation is not available');
// }

var Location = function (_React$Component) {
  _inherits(Location, _React$Component);

  function Location(props) {
    _classCallCheck(this, Location);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Location).call(this, props));

    _this.state = {
      userLocation: {
        lat: '...',
        long: '...'
      }
    };

    var setLocation = function setLocation(position) {
      _this.setState({
        userLocation: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      });
      console.log('userLocation is: ', _this.props.userLocation);
    };

    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(setLocation.bind(_this));
    } else {
      /* geolocation IS NOT available */
      console.log('userLocation is not available');
    }
    return _this;
  }

  _createClass(Location, [{
    key: 'render',
    value: function render() {
      return React.createElement("div", null, "Your location is lat: ", this.state.userLocation.lat, ", long: ", this.state.userLocation.long);
    }
  }]);

  return Location;
}(React.Component);