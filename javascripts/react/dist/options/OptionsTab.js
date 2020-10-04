function OptionsTabComponent() {
  const [active, setActive] = React.useState(false);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setActive(player.navigation.naviTab === "options_tab");
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);

  function save() {
    saveGame();
  }

  function load() {
    preLoad();
    loadSave(getSave());
    postLoad();
  }

  function importSave() {
    const save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
    player.import42 |= save === "42";

    if (save === null || save === "42") {
      return;
    }

    preLoad();
    loadSave(save, true);
    postLoad();
    save();
  }

  function exportSave() {
    save();
    copyStringToClipboard(getSaveString());
    alert("Save copied to clipboard");
  }

  function hardReset() {
    const confirmation = prompt("This will completely reset your game. If you are sure, type in “Hitchhiker's Guide to the Fusion-Driven Galaxy”");

    if (confirmation === "Hitchhiker's Guide to the Fusion-Driven Galaxy") {
      preLoad();
      player = getDefaultData();
      postLoad();
      save();
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex-col options"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement(NotationOptionsButton, null), /*#__PURE__*/React.createElement(ThemeOptionsButton, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: save
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: load
  }, "Load")), /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: importSave
  }, "Import Save"), /*#__PURE__*/React.createElement("button", {
    onClick: exportSave
  }, "Export Save")), /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: hardReset
  }, "Hard Reset"), /*#__PURE__*/React.createElement("button", {
    onClick: enableCheatsTab
  }, "Stuff")));
}