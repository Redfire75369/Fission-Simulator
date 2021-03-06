/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function PopupComponent() {
	let [popupText, setPopupText] = React.useState(cache.popups[0] ?? "");

	React.useEffect(function() {
		let update_loop = setInterval(function() {
			setPopupText(cache.popups[0] ?? "");
		}, 50);

		return function() {
			clearInterval(update_loop);
		};
	}, []);

	function close_popup() {
		setPopupText("");
		cache.popups.shift();
	}

	return (
		popupText !== "" ? <div className="vh-50 vw-50 fixed viewport-center z-5 bg-moon-gray b--dark-gray b--solid br2 bw1">
			<div className="flex flex-column items-center justify-center">
				<div className="flex flex-row ma3 pa1 tc">
					{popupText}
				</div>
				<div className="flex flex-row items-center justify-center fixed bottom-0 ma3">
					<button className="bg-light-gray b--dark-gray b--solid br1 bw1" onClick={close_popup}>
						Close
					</button>
				</div>
			</div>
		</div> : <></>
	);
}
