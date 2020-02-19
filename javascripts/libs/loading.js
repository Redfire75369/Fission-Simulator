// THE saving library, by Nyan Cat 2019
let importDangerAlertText = "Your imported save seems to be missing some values, which means importing this save might be destructive, if you have made a backup of your current save and are sure about importing this save please press OK, if not, press cancel and the save will not be imported.";
let versionTagName = "version";

function getArrayTypeList() {
  let ret = {};
  ["amount", "cost", "costMult", "mult"].forEach(function(itemProperty) {
    ret[`reactor.${itemProperty}`] = "Decimal"
  })
  return ret
}
let arrayTypes = getArrayTypeList();



function onImportError() {
  alert("Error: Imported save is in invalid format, please make sure you've copied the save correctly and isn't just typing gibberish.")
}

function onLoadError() {
  console.log("The save didn't load.");
}

function onImportSuccess() {
  alert("Save imported successfully.")
}

Array.prototype.diff = function (a) {
  return this.filter(function (i) {
    return a.indexOf(i) < 0;
  });
};

function getSaveString() {
	return btoa(JSON.stringify(player));
}

function saveGame() {
  localStorage.setItem("fissionSimSave1", getSaveString());
}

function loadSave(save, imported = false) {
  try {
    var save = JSON.parse(atob(save))
    let refLists = listItems(getDefaultData())
    let saveLists = listItems(save)
    let missingItem = refLists[0].diff(saveLists[0])
    if (missingItem.includes("save")) {
      console.log("Unrecoverable corrupted save detected, loading default save...")
      return
    }
    if (missingItem.length != 0 && imported) {
      if (!confirm(importDangerAlertText)) {
        return
      }
    }

    missingItem.forEach(function (value) {
      if (value != versionTagName) _.set(save, value, _.get(getDefaultData(), value))
    })

    let decimalList = saveLists[1].diff(refLists[1])
    decimalList.forEach(function (value) {
      _.set(save, value, new Decimal(_.get(save, value)))
    })

    saveLists[2].forEach(function (value) {
      let arrayType = findArrayType(value)
      if (arrayType != "String") _.set(save, value, _.get(save, value).map(getMapFunc(arrayType)))
    })

    player = save
    _.set(save, versionTagName, _.get(getDefaultData(), versionTagName))
    if (imported) onImportSuccess()
  } catch (err) {
    if (imported) {
      console.log(err)
      onImportError()
      return
    } else {
      console.log(err)
      onLoadError()
      return
    }
  }
}

function getMapFunc(type) {
  switch (type) {
  case "Decimal":
    return x => new Decimal(x)
  default:
    return x => x
  }
}

function findArrayType(index) {
  let definedType = arrayTypes[index]
  if (definedType === undefined) return "String"
  return definedType
}

function listItems(data, nestIndex = "") {
  let itemList = []
  let stringList = []
  let arrayList = []
  Object.keys(data).forEach(function (index) {
    let value = data[index]
    let thisIndex = nestIndex + (nestIndex === "" ? "" : ".") + index
    itemList.push(thisIndex)
    switch (typeof value) {
    case "object":
      if (value instanceof Array) {
        arrayList.push(thisIndex)
      } else if (!(value instanceof Decimal)) {
        let temp = listItems(value, thisIndex)
        itemList = itemList.concat(temp[0])
        stringList = stringList.concat(temp[1])
        arrayList = arrayList.concat(temp[2])
      }
      break;
    case "string":
      stringList.push(thisIndex)
      break;
    }
  });
  return [itemList, stringList, arrayList]
};