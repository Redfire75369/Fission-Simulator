/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class ReactStateComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 50);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {}

}
