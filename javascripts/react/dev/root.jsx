/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function RootComponent() {
	let [navigation, setNavigation] = React.useState("reactors");

	React.useEffect(function() {
		let update_loop_id = setInterval(function () {
			setNavigation(player.navigation.primary);
		}, 50);

		return function () {
			clearInterval(update_loop_id);
		};
	});

	function current_tab() {
		let tab = <></>;

		switch(navigation) {
			case "reactors":
				tab = <ReactorsTabComponent/>;
				break;
			case "options":
				tab = <OptionsComponent/>;
				break;
			case "overspin":
				tab = <OverspinTabComponent/>;
				break;
		}

		return tab;
	}

	return (
		<>
			<ResourcesComponent/>

			<>
				{current_tab()}
			</>

			<NavigationComponent/>
			<PopupComponent/>
		</>
	);
}

ReactDOM.render(<RootComponent/>, $("root"));
