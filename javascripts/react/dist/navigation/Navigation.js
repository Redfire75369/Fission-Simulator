function NavigationDropdownComponent() {
  const [activeMenu, setActiveMenu] = React.useState("main");
  const [menuHeight, setMenuHeight] = React.useState(null);
  const dropdownRef = React.useRef(null);
  const [unlockedMines, setUnlockedMines] = React.useState(false);
  const [unlockedAutomation, setUnlockedAutomation] = React.useState(false);
  const [unlockedPrestige, setUnlockedPrestige] = React.useState(false);
  const [unlockedCheats, setUnlockedCheats] = React.useState(false);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setUnlockedMines(unlockedMines || player.energy.gte(1e50) || player.unlocked.mines);
      setUnlockedAutomation(unlockedAutomation || player.reactors.pebblebeds[2].bought > 0);
      setUnlockedPrestige(unlockedPrestige || player.unlocked.prestige);
      setUnlockedCheats(cheatsEnabled);
      setMenuHeight(dropdownRef.current?.firstChild?.offsetHeight);
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);

  function calculateHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    function onClick() {
      setActiveMenu(props.goToMenu || "main");

      switch (props.type) {
        case "main":
          showNaviTab(props.tab + "_tab");
          break;

        case "production":
          player.navigation.production = props.tab;
          break;

        default:
      }
    }

    return /*#__PURE__*/React.createElement("a", {
      href: "#",
      id: props.tab + "_btn",
      onClick: onClick,
      style: props.style
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon-left"
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
  }, /*#__PURE__*/React.createElement(ReactTransitionGroup.CSSTransition, {
    in: activeMenu === "main",
    timeout: 500,
    classNames: "menu-primary",
    onEnter: calculateHeight,
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DropdownItem, {
    rightIcon: /*#__PURE__*/React.createElement(NavigationIcon, {
      type: "chevron"
    }),
    type: "main",
    tab: "production",
    goToMenu: "production"
  }, "Production"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "main",
    tab: "statistics"
  }, "Statistics"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "main",
    tab: "achievements"
  }, "Achievements"), /*#__PURE__*/React.createElement(DropdownItem, {
    leftIcon: /*#__PURE__*/React.createElement(NavigationIcon, {
      type: "gear"
    }),
    type: "main",
    tab: "options"
  }, "Options"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "main",
    tab: "automation",
    style: {
      display: unlockedAutomation ? "" : "none"
    }
  }, "Automation"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "main",
    tab: "prestige",
    style: {
      display: unlockedPrestige ? "" : "none"
    }
  }, "Prestige"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "main",
    tab: "cheats",
    style: {
      display: unlockedCheats ? "" : "none"
    }
  }, "Cheats"))), /*#__PURE__*/React.createElement(ReactTransitionGroup.CSSTransition, {
    in: activeMenu === "production",
    timeout: 500,
    classNames: "menu-secondary",
    onEnter: calculateHeight,
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DropdownItem, {
    goToMenu: "main",
    leftIcon: /*#__PURE__*/React.createElement(NavigationIcon, {
      type: "caret"
    })
  }, "Production"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "production",
    tab: "mines",
    style: {
      display: unlockedMines ? "" : "none"
    }
  }, "Mines"), /*#__PURE__*/React.createElement(DropdownItem, {
    type: "production",
    tab: "reactors"
  }, "Reactors"))));
}

function NavigationItemComponent(props) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(function () {
    Mousetrap.bind(">", function () {
      setOpen(true);
    });
    Mousetrap.bind("<", function () {
      setOpen(false);
    });
    Mousetrap.bind("tab", toggle);
  }, []);

  function toggle() {
    setOpen(!open);
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: toggle
  }, props.icon), open ? props.children : "");
}

function NavigationComponent() {
  return /*#__PURE__*/React.createElement(NavigationItemComponent, {
    icon: /*#__PURE__*/React.createElement(NavigationIcon, {
      type: "bars"
    })
  }, /*#__PURE__*/React.createElement(NavigationDropdownComponent, null));
}