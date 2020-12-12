/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
class AchievementsRowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  rows() {
    const row = this.props.row;
    return new Array(8).map(function (v, i) {
      return /*#__PURE__*/React.createElement(AchievementComponent, {
        id: row * 10 + 1
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, this.rows());
  }

}