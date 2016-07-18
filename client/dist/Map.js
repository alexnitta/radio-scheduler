'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map(props) {
    _classCallCheck(this, Map);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, props));
  }

  _createClass(Map, [{
    key: 'render',
    value: function render() {

      var coords = this.props.lat + ',' + this.props.long;
      var src = 'https://maps.google.com/maps?q=' + coords + '&hl=es;z=14&amp;output=embed';
      return React.createElement("div", null, React.createElement("iframe", { width: "300", height: "170", frameBorder: "0", scrolling: "no", marginHeight: "0", marginWidth: "0", src: src }), React.createElement("br", null), React.createElement("small", null, React.createElement("a", { href: "https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=es;z=14&output=embed", target: "_blank" }, "See map bigger")));
    }
  }]);

  return Map;
}(React.Component);