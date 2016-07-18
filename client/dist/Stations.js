"use strict";

var StationTable = function StationTable(_ref) {
  var data = _ref.data;
  return React.createElement("div", { className: "stations" }, React.createElement("table", { className: "info" }, React.createElement("tr", null, React.createElement("th", null, "Call"), React.createElement("th", null, "Frequency"), React.createElement("th", null, "Band"), React.createElement("th", null, "Show"), React.createElement("th", null, "Website")), stationRows));
};