const {
	ELECTRON_FLAGS,
	SPLASH_PHYSICAL_PARAMETERS,
	SPLASH_WEBPREFERENCES,
	MESSAGE_SPLASH_DONE
} = require('../constants.js');
const { setVibrancy } = require('electron-acrylic-window');
const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { info } = require('electron-log');

module.exports = class {

	/**
	 * @param  {Electron.App} app
	 * @returns {string[][]} Constants.ELECTRON_FLAGS The constants.js array of flags
	 * @description
	 * Get the Electron flags from the constants.js file and set them in the electron app.  
	 * Return the flags.
	 */
	static setFlags(app) {
		info('Setting Electron flags');

		for (const [ flag, value ] of ELECTRON_FLAGS) app.commandLine.appendSwitch(flag, value);
		return ELECTRON_FLAGS;
	}

	/**
	 * @returns {Electron.BrowserWindow} splash Return the new splash BrowserWindow instance
	 * @description
	 * Create a new BrowserWindow instance for the splash window.
	 */
	static createSplashWindow() {
		info('Creating new Splash window instance');

		return new BrowserWindow({
			...SPLASH_PHYSICAL_PARAMETERS,
			webPreferences: {
				...SPLASH_WEBPREFERENCES,
				preload: path.join(__dirname, '../preload/splash.js')
			}
		});
	}

	/**
	 * @param  {Electron.BrowserWindow} splash BrowserWindow instance for the splash window
	 * @returns {Electron.BrowserWindow} splash BrowserWindow instance for the splash window
	 * @description
	 * Load the splash window with the splash.html file.  
	 * Show it on dom-ready and callback when everything is done.
	 */
	static load(splash) {
		// Set the vibrancy of the splash window. Silly that you have to do it this way, but it works.
		setVibrancy(splash, 'dark');
		splash.removeMenu();
		splash.loadFile(path.join(__dirname, '../html/splash.html'));

		// Show the splash window when things have all loaded.
		return new Promise(resolve => {
			splash.webContents.once('dom-ready', () => {
				info('`dom-ready` reached on Splash window');

				splash.show();
				splash.webContents.openDevTools({ mode: 'detach' });

				// Resolve the promise when everything is done and dusted in the splash window.
				ipcMain.on(MESSAGE_SPLASH_DONE, () => {
					info(`${ MESSAGE_SPLASH_DONE } received`);

					resolve(splash);
				});
			});
		});
	}

	/**
	 * @returns {HTMLDivElement} versionElement The splash version element in DOM
	 * @description
	 * Get the client version and the version element.  
	 * Set the innerText of version element to the client version.
	 */
	static setVersionElementAsClientVersion() {
		const version = this.getClientVersion();
		const versionElement = document.getElementById('client-info');

		if (versionElement instanceof HTMLElement) versionElement.innerText = `v${ version }`;

		return versionElement;
	}

};
