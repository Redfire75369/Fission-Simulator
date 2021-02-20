# Editor/IDE Configuration

## Contents

### Text Editors
1. [Sublime Text](#sublime-text)
2. [Atom](#atom)
3. [Visual Studio Code](#visual-studio-code)

### Integrated Development Environments
1. [WebStorm](#webstorm)

## Sublime Text
1. Navigate to `Tools > Command Palette`, search for `Install Package Control` and select `Install Package Control`
2. Navigate to `Tools > Command Palette`, search for `Install`, select `Package Control: Install Package` and install the following packages
    - `SublimeLinter`
    - `SublimeLinter-eslint`
    - `SublimeLinter-stylelint`
    - `Babel` (For React Contributions)

## Atom
1. Navigate to `File > Settings > Install` and install the following packages
    - `linter`
    - `linter-eslint`
    - `linter-stylelint`
    - `linter-ui-default`
    - `fast-eslint`
    - `react` (For React Contributions)

## Visual Studio Code
1. Navigate to `Extensions` and install the following extensions
    - `ESLint`
    - `stylelint`
    - `Babel JavaScript` (For React Contributions)

## WebStorm
1. Navigate to `File > Settings > Plugins` and install the `.ignore` plugin
2. Navigate to `File > Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint` and enable `Run eslint --fix on save`
