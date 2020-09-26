function NavigationDropdownComponent() {
	const [activeMenu, setActiveMenu] = React.useState("main");
	const [menuHeight, setMenuHeight] = React.useState(null);
	const dropdownRef = React.useRef(null);

	const [unlockedMines, setUnlockedMines] = React.useState(false);
	const [unlockedAutomation, setUnlockedAutomation] = React.useState(false);
	const [unlockedPrestige, setUnlockedPrestige] = React.useState(false);
	const [unlockedCheats, setUnlockedCheats] = React.useState(false);

	React.useEffect(function() {
		setMenuHeight(dropdownRef.current?.firstChild?.offsetHeight);

		const timerID = setInterval(function() {
			setUnlockedMines(unlockedMines || player.energy.gte(250) || player.unlocked.mines);
			setUnlockedAutomation(unlockedAutomation || player.reactors.pebblebeds[2].bought > 0);
			setUnlockedPrestige(unlockedPrestige || player.unlocked.prestige);
			setUnlockedCheats(cheatsEnabled);
		}, 50);

		return function() {
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

		return (
			<a href="#" onClick={onClick} style={props.style}>
				<span className="icon-button">{props.leftIcon}</span>
				{props.children}
				<span className="icon-right">{props.rightIcon}</span>
			</a>
		);
	}

	return (
		<div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>
			<ReactTransitionGroup.CSSTransition in={activeMenu === "main"} timeout={500} classNames="menu-primary" onEnter={calculateHeight} unmountOnExit>
				<div>
					<DropdownItem rightIcon={<NavigationIcon type="chevron"/>} type="main" tab="production" goToMenu="production">Production</DropdownItem>
					<DropdownItem type="main" tab="statistics">Statistics</DropdownItem>
					<DropdownItem type="main" tab="achievements">Achievements</DropdownItem>
					<DropdownItem leftIcon={<NavigationIcon type="gear"/>} type="main" tab="options">Options</DropdownItem>
					<DropdownItem type="main" tab="automation" style={{display: unlockedAutomation ? "" : "none"}}>Automation</DropdownItem>
					<DropdownItem type="main" tab="prestige" style={{display: unlockedPrestige ? "" : "none"}}>Prestige</DropdownItem>
					<DropdownItem type="main" tab="cheats" style={{display: unlockedCheats ? "" : "none"}}>Cheats</DropdownItem>
				</div>
			</ReactTransitionGroup.CSSTransition>

			<ReactTransitionGroup.CSSTransition in={activeMenu === "production"} timeout={500} classNames="menu-secondary" onEnter={calculateHeight} unmountOnExit>
				<div>
					<DropdownItem goToMenu="main" leftIcon={<NavigationIcon type="caret"/>}>Production</DropdownItem>
					<DropdownItem type="production" tab="mines" style={{display: unlockedMines ? "" : "none"}}>Mines</DropdownItem>
					<DropdownItem type="production" tab="reactors">Reactors</DropdownItem>
				</div>
			</ReactTransitionGroup.CSSTransition>
		</div>
	);
}

function NavigationItemComponent(props) {
	const [open, setOpen] = React.useState(false);

	React.useEffect(function() {
		Mousetrap.bind(">", function() {
			setOpen(true);
		});
		Mousetrap.bind("<", function() {
			setOpen(false);
		});
		Mousetrap.bind("tab", toggle);
	}, []);
	
	function toggle() {
		setOpen(!open);
	}

	return (
		<div>
			<a href="#" onClick={toggle}>
				{props.icon}
			</a>

			{open ? props.children : ""}
		</div>
	);
}

function NavigationComponent() {
	return (
		<NavigationItemComponent icon={<NavigationIcon type="plus"/>}>
			<NavigationDropdownComponent/>
		</NavigationItemComponent>
	);
}
