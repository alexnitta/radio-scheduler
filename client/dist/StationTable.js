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