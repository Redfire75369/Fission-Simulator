/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function RootComponent() {
  let [navigation, setNavigation] = React.useState(player.navigation);
  let [unlocked, setUnlocked] = React.useState(player.unlocked);

  function CurrentTab(props) {
    switch (props.navigation.primary) {
      case "reactors":
        return /*#__PURE__*/React.createElement(ReactorsTabComponent, {
          unlocked: unlocked
        });

      case "options":
        return /*#__PURE__*/React.createElement(OptionsComponent, null);

      case "overspin":
        return /*#__PURE__*/React.createElement(OverspinTabComponent, null);

      default:
        return /*#__PURE__*/React.createElement(React.Fragment, null);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResourcesComponent, {
    unlocked: unlocked
  }), /*#__PURE__*/React.createElement(CurrentTab, {
    navigation: navigation
  }), /*#__PURE__*/React.createElement(NavigationComponent, {
    unlocked: unlocked,
    setNavigation: setNavigation
  }), /*#__PURE__*/React.createElement(PopupComponent, null));
}

ReactDOM.render( /*#__PURE__*/React.createElement(RootComponent, null), $("root"));