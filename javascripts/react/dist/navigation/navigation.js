/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function NavigationComponent() {
  let [rerender, setRerender] = React.useState(false);
  let [tab, setTab] = React.useState("");
  React.useEffect(function () {
    setTab(player.navigation.primary);
    let update_loop_id = setInterval(function () {
      setRerender(cache.navigation.rerender);

      if (rerender) {
        setTab(player.navigation.primary);
      }
    }, 50);
    return function () {
      clearInterval(update_loop_id);
    };
  }, []);

  function NavigationButton(props) {
    function changeTab() {
      player.navigation.primary = props.tab;
      setTab(props.tab);
    }

    return /*#__PURE__*/React.createElement("button", {
      className: "bg-light-gray b--dark-gray b--solid br2 bw1 mh1 f3",
      onClick: changeTab
    }, props.text);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center fixed bottom-0 z-4 bg-mid-gray min-vw-100 pv2"
  }, /*#__PURE__*/React.createElement(NavigationButton, {
    tab: "reactors",
    text: "Reactors"
  }), /*#__PURE__*/React.createElement(NavigationButton, {
    tab: "options",
    text: "Options"
  }), player.unlocked.overspin.overspin ? /*#__PURE__*/React.createElement(NavigationButton, {
    tab: "overspin",
    text: "Overspin"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null));
}