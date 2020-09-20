class NavigationChevronIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 256 512"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z",
      class: ""
    }));
  }

}

class NavigationGearIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z",
      class: ""
    }));
  }

}

function NavigationDropdownComponent() {
  const [activeMenu, setActiveMenu] = React.useState(player.navigation.naviTab);
  const [menuHeight, setMenuHeight] = React.useState(null);
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    var _dropdownRef$current;

    setMenuHeight((_dropdownRef$current = dropdownRef.current) === null || _dropdownRef$current === void 0 ? void 0 : _dropdownRef$current.firstChild.offsetHeight);
  }, []);

  function calculateHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "menu-item",
      onClick: () => props.goToMenu && setActiveMenu(props.goToMenu)
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon-button"
    }, props.leftIcon), props.children, /*#__PURE__*/React.createElement("span", {
      className: "icon-right"
    }, props.rightIcon));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown",
    style: {
      height: menuHeight
    },
    ref: dropdownRef
  }, /*#__PURE__*/React.createElement(CSSTransition, {
    in: activeMenu === "production_tab",
    timeout: 500,
    classNames: "menu-primary",
    onEnter: calculateHeight
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu"
  }, /*#__PURE__*/React.createElement(DropdownItem, null, "Production"), /*#__PURE__*/React.createElement(DropdownItem, {
    leftIcon: /*#__PURE__*/React.createElement(NavigationGearIcon, null),
    rightIcon: /*#__PURE__*/React.createElement(NavigationChevronIcon, null),
    goToMenu: "reactors"
  }, "Mines"), /*#__PURE__*/React.createElement(DropdownItem, {
    leftIcon: /*#__PURE__*/React.createElement(NavigationGearIcon, null),
    rightIcon: /*#__PURE__*/React.createElement(NavigationChevronIcon, null),
    goToMenu: "mines"
  }, "Reactors"))));
}

class NavigationComponent extends ReactStateComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavigationDropdownComponent, null));
  }

}