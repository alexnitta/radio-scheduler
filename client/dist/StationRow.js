"use strict";

var StationRow = function StationRow(_ref) {
  var row = _ref.row;
  return React.createElement("tr", null, React.createElement("td", { className: "station-row" }, row.call), React.createElement("td", { className: "station-row" }, row.frequency), React.createElement("td", { className: "station-row" }, row.band), React.createElement("td", { className: "station-row" }, row.name), React.createElement("td", { className: "station-row" }, React.createElement("a", { href: row.website }, row.website)));
};