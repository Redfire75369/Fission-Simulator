class NotationOptionsButton extends ReactStateComponent {
  tick() {
    this.setState({
      notation: player.options.notation
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      onClick: notationChange
    }, "Notation: ", this.state.notation);
  }

}