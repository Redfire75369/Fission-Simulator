# Changelog

This changelog format is based on the spec described on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
This project adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

**Note:** The presence of a **PR** tag after the release date means that this release was not made public.
**Note:** The presence of a **TR** tag after the release date means that this release was not made available to testers.

<!-- This is an example of a update block
## [v0.0.0] - 30/2/20 **PR**
### Added
### Modified
### Removed
-->
## [v0.5.3] - 22/7/20 **PR**

### Added
- Tooltips for Rotors and Dynamo Coils
- Extreme Rotor
- Buy 4 Rotors

### Modified
- Refactored Achievement Tooltips
- Refactored Dynamo Coil Activation

### Removed
- Dynamo Coil Descriptions

## [v0.5.3] - 18/7/20 **PR**

### Added
- Indicator of Total Coil Efficiency
- Rotor Cost Indicator

### Modified
- Fixed bug where bearings would appear deactivated
- Fixed bug where aluminium dynamo coils did not work
- Fixed bug where empty offline progress popup shows up
- Fixed bug where navigation rendered below achievements
- Changed Nanite Formula to start at 3 Cf-251 Reactors

### Removed

## [v0.5.2] - 18/7/20 **PR**

### Added

### Modified
- Fixed bug when you are at >= 4 Nucleosynthesis
- Fixed bug with balancing tab
- Fixed bug with dynamo coil activation

### Removed

## [v0.5.0] - 17/7/20 **PR**

### Added
- Added Turbines
- Framework for Decay Hastening

### Modified
- Changed Costs and Cost Multipliers for all Mines and Reactors

### Removed

## [v0.4.14] - 28/6/20 **PR**

### Added
- Balancing Tab

### Modified

### Removed

## [v0.4.13] - ??/??/?? **PR**
- Changes were not tracked for this version

## [v0.4.12] - ??/??/?? **PR**
- Changes were not tracked for this version

## [v0.4.11] - ??/??/?? **PR**
- Changes were not tracked for this version

## [v0.4.10] - ??/??/?? **PR**
- Changes were not tracked for this version

## [v0.4.9] - 14/5/20 **PR**

### Added

### Modified
- Fixed another issue with buying Efficiency

### Code Optimisations

## [v0.4.8] - 14/5/20 **PR**

### Added

### Modified
- Fixed issue with efficiency hotkey
- Made reactors directly affect reactor production
- Fixed a few minor bugs

### Code Optimisations

## [v0.4.7] - 14/5/20 **PR**

### Added

### Modified
- Fixed issues with buying Efficiency

### Code Optimisations


## [v0.4.6] - 14/5/20 **PR**

### Added

### Modified
- Fixed issues with Efficiency

### Code Optimisations

## [v0.4.5] - 10/5/20 **PR**

### Added
- Added hotkeys and max all back in

### Modified
- Fixed bug with updateGame loop not working
- Fixed bug with old saves

### Code Optimisations

## [v0.4.4] - 7/5/20 **PR**

### Added

### Modified

### Code Optimisations
- Improved onvisibilitychange code
- Changed CSS to use more subclasses
- Changed Mines, Reactors and Efficiency to use classes

## [v0.4.3] - 18/4/20 **PR**

### Added
- Mines and Reactors cannot be bought after Infinity
- More news relays

### Modified
- Changed fuel requirement for max production of energy
- Removed fuel generation by reactors
- Max All can only be used after first Nanite Research
- Fixed News Relay Speed
- Rebalanced costs and cost scalings

### Code Optimisations
- Standardised HTML Elements (Removed some unnecessary consts)
- Added CSS subclasses and hover styles

## [v0.4.2] - 12/4/20 **PR**

### Added
- KaTeX-based Formulas
- Working Meltdown Upgrade Multipliers (Upgrades 11 to 24)

### Modified
- Removed Mathjax
- Fixed bugs with getLimit() and meltdown upgrade 22

### Code Optimisations
- Changed to more efficient KaTeX over Mathjax

## [v0.4.1] - 11/4/20 **PR**

### Added
- Mathjax-based Formulas
- Moderators and Limits

### Modified
- Costs and cost scaling of Cf-251

### Code Optimisations

## [v0.4.0] - 10/4/20 **PR**

### Added
- More news relays
- News Relay and Achievements for all styles
- Meltdown Upgrades

### Modified

### Code Optimisations
- Reduced code repetitions in News Relay code
- Added save compression using LZString


## [v0.3.20] - 5/4/20 **PR**

### Added
- Achievements

### Modified

### Code Optimisations


## [v0.3.19] - 5/4/20 **PR**

### Added
- Nuclear Experimental News Relay

### Modified
- Fix bug with Nanite Upgrade 11
- Change keybinds

### Code Optimisations


## [v0.3.18] - 4/4/20 **PR**

### Added
- More themes (By Dystopia)

### Modified
- Many bugfixes
- Infinite offline progress loop stopped.

### Code Optimisations
- Moved offline progress to main.js

## [v0.3.17] - 4/4/20 **PR**

### Added
- Achievements framework

### Modified
- More user-friendly

### Code Optimisations
- Loading Optimisations
- Improved simulations
- Unified energy and fuel code
- Unified mines and reactors code

## [v0.3.16] - 22/3/20 **PR**

### Added
- Themes (By Dystopia)
- Theme changing

### Modified
- Passive meltdown stat fix

### Code Optimisations

## [v0.3.15] - 21/3/20 **PR**
### Added

### Modified
- Fuel density of all fuels increased
- Max energy gain depends on fuel type as well
- Nanite research and meltdown reset Nucleosynthesis

### Code Optimisations

## [v0.3.14] - 21/3/20 **PR**

### Added
- Changelog
- simulateTime() cheat button
- New CSS stylesheets for other themes

### Modified
- Nanite upgrades say Nucleosyntheses instead of Tectonic Initiation
- Save version changed on loading of save
- Exact number is shown till 1e6 instead of 1e5
- Fixed efficiency upgrade
- Fixed nanite research cost above 19 Cf-252 reactors

### Code Optimisations
- setInterval loops are not assigned to variables
- Switched from minified to non-minified version of break_infinity.js

## [v0.3.13] - 21/3/20 **PR**

### Added
- Cheats Tab
	- Energy
	- Nucleosynthesis
	- Lever Max All
	- Hard Reset 2.0
- Framework for passive corium, meltdown stat and passive meltdown stat

### Modified
- Made import save code more elegant

### Code Optimisations
- HTML Optimisations
- Switched some CSS to Elements instead of Classes
- Improved missing variable in save checking code

## [v0.3.12] - 21/3/20 **PR**

### Added

### Modified
- Most things use Nucleosynthesis or Nucleo instead of Meteor Shower or Tectonic Initiation
- Made efficiency change when bought

### Code Optimisations
- Add check for empty input into import save
- Implement checking for whether save has the same keys as getDefaultData()

## [v0.3.11] - 20/3/20 **PR**

### Added
- Meltdown upgrade framework
- Easter egg involving Hitchhiker's Guide to the Galaxy
- Confirmation with typed message for hard reset

### Modified
- Internal Code uses Nucleosynthesis instead of Meteor

### Code Optimisations
- Remove redundant code in init_game()
- Refactored multiplier calculation

## [v0.3.10] - 20/3/20 **PR**

### Added
- Skeleton for meltdown upgrades
- Messages about invalid saves

### Modified
- Fixed instances of nanite upgrades not being shifted
- Made statistics table columns equal width

### Code Optimisations
- Made saving work
- Refactored reactor and mine cost calculation

## [v0.3.9] - 18/3/20 **PR** **TR**

### Added
- Hiding of tabs that have not been unlocked
- Fastest Meltdown stat

### Modified
- Shifted nanite upgrades down
- Made resources table columns equal width

### Code Optimisations
- Switched from Nyan Cat's saving library to own (BROKEN)
- Moved efficiency nanite upgrade out of primary nanite upgrade code
- Refactored efficiency cost calculation
- Refactored efficiency calculation
- Moved Notation Array out of function

## [v0.3.8] - 15/3/20 **PR**

### Added
- Navigation saving

### Modified

### Code Optimisations

## [v0.3.7] - 14/3/20 **PR**

### Added

### Modified
- Removed storage of Nuclear Fuel
- Changed formula of nanite upgrade 22
- Prevented nanite upgrade 42 from being 0×

### Code Optimisations

## [v0.3.6] - 14/3/20 **PR**

### Added
- Statistics Tab

### Modified
- Fixed alignment issues for Firefox Browser

### Code Optimisations

## [v0.3.5] - 14/3/20 **PR**

### Added

### Modified
- Fixed alignment of Options tab
- Nanites formula improved and has different scalings
- Removed nanite upgrade 11

### Code Optimisations

## [v0.3.4] - 14/3/20 **PR**

### Added
- Bugs and glitches markdown
- Ability to keep meteor shower multiplier over nanite researches and meltdowns
- Testing parameter in simulateTime()

### Modified
- Ability to specify decimal places and decimal places under 1e5 with notation()

### Code Optimisations
- Added zero and infinity variable
- Removed excess intermediate variables
- Changed many things to use ternary operators instead of "if, else statements"

## [v0.3.3] - 11/3/20 **PR**

### Added
- LEU to LECf fuel information
- CSS for production tab buttons

### Modified
- Moved max all button to outside of mines and reactors subtabs
- Removed energy usage

### Code Optimisations

## [v0.3.2] - 9/3/20 **PR**

## Added
- Resources Subtab

## Modified
- Buy max all buys mines, reactors and efficiency

## Code Optimisations
- Improved spacing inside tables with styles

## [v0.3.1] - 8/3/20 **PR**

### Added
- Nuclear fuel
- Mines
- Mines subtab
- Production subtab buttons

### Modified
- Method of reactor production
- Method of fuel generation
- Weakened formula of nanite upgrade 42
- Offline progress only shows up if away for 1000 seconds or longer
- Fixed nanite research cost not increasing

### Code Optimisations
- Improved loop over nanite upgrades for total multiplier


## [v0.3.0] - 7/3/20 **PR**

### Added
- Corium
- Meltdown prestige

### Modified
- Exact number is shown till 1e5 instead of 1e3
- Nanite gain is floored (always integers)
- simulateTime() checks if tab is focused

### Code Optimisations
