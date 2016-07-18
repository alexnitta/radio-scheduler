"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stations = function (_React$Component) {
  _inherits(Stations, _React$Component);

  function Stations(props) {
    _classCallCheck(this, Stations);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Stations).call(this, props));
  }

  _createClass(Stations, [{
    key: "render",
    value: function render() {
      return React.createElement("table", null, React.createElement("tr", null, React.createElement("th", null, "Call"), React.createElement("th", null, "Frequency"), React.createElement("th", null, "Band"), React.createElement("th", null, "Show"), React.createElement("th", null, "Website")), React.createElement("tr", null, React.createElement("td", null, "KQED"), React.createElement("td", null, "88.5"), React.createElement("td", null, "FM"), React.createElement("td", null, "Forum"), React.createElement("td", null, "http://kqed.org")));
    }
  }]);

  return Stations;
}(React.Component);