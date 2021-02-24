/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function OptionsComponent() {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: save_game
  }, "Save Game")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: load_save
  }, "Load Game"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: import_save
  }, "Save Game")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: export_save
  }, "Load Game"))));
}