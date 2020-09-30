function NotationOptionsButton() {
  const [notation, setNotation] = React.useState("Scientific");

  function notationChange() {
    player.options.notation = (player.options.notation + 1) % notations.length;
    setNotation(notations[player.options.notation]);
  }

  return /*#__PURE__*/React.createElement("button", {
    onClick: notationChange
  }, "Theme: ", notation);
}