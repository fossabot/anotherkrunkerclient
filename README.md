[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/gorhill/uBlock/blob/master/LICENSE.txt)
[![Latest version](https://img.shields.io/github/v/release/asger-finding/anotherkrunkerclient?label=Latest%20Release)](https://github.com/asger-finding/anotherkrunkerclient/releases/latest)
[![Discord server](https://img.shields.io/discord/971394904821485608.svg?label=discord)](https://discord.gg/etxNkUuTru)
![Lines of code](https://img.shields.io/tokei/lines/github/asger-finding/anotherkrunkerclient)

---

<!-- markdownlint-disable MD033 MD041 -->
<div align="center">
  <img width="50%" src="https://github.com/asger-finding/anotherkrunkerclient/raw/main/.github/banner-light.svg#gh-light-mode-only">
  <img width="50%" src="https://github.com/asger-finding/anotherkrunkerclient/raw/main/.github/banner-dark.svg#gh-dark-mode-only">
</div>

<h1 align="center">anotherkrunkerclient</h1>
<!-- markdownlint-enable MD033 MD041 -->
<!-- necessary evil to have a cool header -->

The be-all and end-all Krunker client.  
All good features from other clients crammed into one neat, fast package. Built with boilerplate in mind so you may fork this project to create your own client.

---

## Work-in-progress

A full release (v1.xx) will be considered when everything in this feature tracking [issue](https://github.com/asger-finding/anotherkrunkerclient/issues/1#issue-1167443624) has been addressed.

## Supported operating systems

- [x] Windows 10
- [x] Windows 11
- [x] Linux
- [] MacOS (untested)

## Contributing

### Getting started

- Install [yarn](https://yarnpkg.com/) package manager
- Run `yarn` or `yarn install` to install the dependencies
- To start the app, run `yarn start`

To lint, run `yarn lint`  
To compile the app, run `yarn bundle` (node_modules minification only happens for GitHub actions)

### Notes for development

Ensure that ESLint is enabled. Avoid all warnings and errors. kebab-case is used for file names. Make sure you respect the folder system of main, window, renderer and config.

## License

[GPLv3](https://github.com/asger-finding/anotherkrunkerclient/blob/main/LICENSE).
