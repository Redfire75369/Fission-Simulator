/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function RootComponent() {
  let [navigation, setNavigation] = React.useState("reactors");
  React.useEffect(function () {
    let update_loop_id = setInterval(function () {
      setNavigation(player.navigation.primary);
    }, 50);
    return function () {
      clearInterval(update_loop_id);
    };
  });

  function current_tab() {
    let tab = /*#__PURE__*/React.createElement(React.Fragment, null);

    switch (navigation) {
      case "reactors":
        tab = /*#__PURE__*/React.createElement(ReactorsTabComponent, null);
        break;

      case "options":
        tab = /*#__PURE__*/React.createElement(OptionsComponent, null);
        break;

      case "overspin":
        tab = /*#__PURE__*/React.createElement(OverspinTabComponent, null);
        break;
    }

    return tab;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResourcesComponent, null), /*#__PURE__*/React.createElement(React.Fragment, null, current_tab()), /*#__PURE__*/React.createElement(NavigationComponent, null), /*#__PURE__*/React.createElement(PopupComponent, null));
}

ReactDOM.render( /*#__PURE__*/React.createElement(RootComponent, null), $("root"));