"use strict";

var sampleData = {
  "version": "1.0",
  "href": "string",
  "attributes": {
    "query": "string",
    "city": "string",
    "state": "string",
    "lat": 0,
    "long": 0
  },
  "items": [{
    "version": "1.0",
    "href": "string",
    "attributes": {
      "apps": {
        "npr_one": {
          "name": "string",
          "logo": "string",
          "donation_url": "string",
          "donation_audio": "string",
          "thankyou_audio": "string",
          "sonic_id_audio": ["string"],
          "hello_id_audio": ["string"]
        }
      },
      "guid": "string",
      "org_id": "string",
      "name": "Public media for Northern California",
      "title": "string",
      "abbreviation": "string",
      "call": "KQED",
      "frequency": "88.5",
      "band": "FM",
      "tagline": "",
      "address": ["string"],
      "market_city": "string",
      "market_state": "string",
      "format": "Public Radio",
      "music_only": false,
      "status": "1",
      "status_name": "Member",
      "email": "string",
      "area_code": "string",
      "phone": "string",
      "phone_extension": "string",
      "fax": "string",
      "network": {
        "org_id": "string",
        "name": "string"
      },
      "npr_one": true
    },
    "items": [null],
    "links": {
      "web": [{
        "href": "http://kqed.org",
        "type_name": "string",
        "title": "",
        "type_id": "1"
      }],
      "audio": [{
        "href": "string",
        "type_name": "string",
        "title": "",
        "type_id": "10",
        "stream_guid": "string",
        "primary_stream": true
      }],
      "image": [{
        "href": "string",
        "type_name": "string",
        "title": "",
        "type_id": "18"
      }],
      "related": [{
        "href": "string",
        "type_name": "string",
        "title": "",
        "type_id": "7"
      }]
    },
    "errors": [null]
  }, { // station
    'attributes': {
      'call': 'KALW',
      'band': 'FM',
      'frequency': '91.7',
      'name': 'Local public radio'
    },
    'links': {
      'web': [{
        'href': 'http://kalw.org'
      }]
    }
  }, { // station
    'attributes': {
      'call': 'KPFA',
      'band': 'FM',
      'frequency': '94.1',
      'name': 'Community Powered Radio'
    },
    'links': {
      'web': [{
        'href': 'https://kpfa.org/'
      }]
    }
  }],
  "links": {},
  "errors": [null]
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Location = function (_React$Component) {
  _inherits(Location, _React$Component);

  function Location(props) {
    _classCallCheck(this, Location);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Location).call(this, props));

    _this.state = {
      userLocation: {
        lat: '[ ... ]',
        long: '[ ... ]'
      },
      data: {
        items: []
      }
    };

    var setLocation = function setLocation(position) {
      _this.setState({
        userLocation: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      });
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(setLocation.bind(_this));
    } else {
      console.log('userLocation is not available');
    }
    return _this;
  } // end of constructor function

  // when component updates with the location, send a request to the NPR API 


  _createClass(Location, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.setState({
        data: sampleData
      });

      // const HOST = 'https://127.0.0.1';

      // fetch(`${HOST}/api/npr-data?lat=${this.state.userLocation.lat}&long=${this.state.userLocation.long}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log('data from api request:', data);
      //   })
      //   .catch((err) => {
      //     console.log('Error in api request: ', error);
      //   });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement("div", null, React.createElement("div", { className: "location" }, this.state.data.items[0] ? 'Your location is lat: ' + this.state.userLocation.lat + ', long: ' + this.state.userLocation.long : 'Finding your location . . .'), React.createElement(StationTable, { data: this.state.data }));
    }
  }]);

  return Location;
}(React.Component);
"use strict";

var StationRow = function StationRow(_ref) {
  var row = _ref.row;
  return React.createElement("tr", null, React.createElement("td", { className: "station-row" }, row.call), React.createElement("td", { className: "station-row" }, row.frequency), React.createElement("td", { className: "station-row" }, row.band), React.createElement("td", { className: "station-row" }, row.name), React.createElement("td", { className: "station-row" }, React.createElement("a", { href: row.website }, row.website)));
};
"use strict";

var StationTable = function StationTable(_ref) {
  var data = _ref.data;


  var stationRows = data.items.map(function (station, index) {

    var row = {};
    row.call = station.attributes.call;
    row.frequency = station.attributes.frequency;
    row.band = station.attributes.band;
    row.name = station.attributes.name;
    row.website = station.links.web[0].href;

    return React.createElement(StationRow, { row: row, key: index });
  });

  return React.createElement("div", { className: "stations" }, React.createElement("table", { className: "info" }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Call"), React.createElement("th", null, "Frequency"), React.createElement("th", null, "Band"), React.createElement("th", null, "Show"), React.createElement("th", null, "Website"))), React.createElement("tbody", null, stationRows)));
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, props));
  }

  _createClass(Container, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { id: "main" }, React.createElement("h1", null, React.createElement("img", { src: 'assets/radio-tower-icon.png', className: "radio-tower" }), "Local Radio"), React.createElement(Location, null));
    }
  }]);

  return Container;
}(React.Component);
'use strict';

ReactDOM.render(React.createElement(Container, null), document.getElementById('app'));