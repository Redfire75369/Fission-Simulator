/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function RootComponent() {
	let [navigation, setNavigation] = React.useState(player.navigation);
	let [unlocked, setUnlocked] = React.useState(player.unlocked);

	function CurrentTab(props) {
		switch(props.navigation.primary) {
			case "reactors":
				return <ReactorsTabComponent unlocked={unlocked}/>;
			case "options":
				return <OptionsComponent/>;
			case "overspin":
				return <OverspinTabComponent/>;
			default:
				return <></>;
		}
	}

	return (
		<>
			<ResourcesComponent unlocked={unlocked}/>

			<CurrentTab navigation={navigation}/>

			<NavigationComponent unlocked={unlocked} setNavigation={setNavigation}/>
			<PopupComponent/>
		</>
	);
}

ReactDOM.render(<RootComponent/>, $("root"));
