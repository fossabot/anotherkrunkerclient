import '../aliases';
import '@game-settings';
import '@game-api';

import FunctionHook from '@function-hooker';
import { MESSAGE_EXIT_CLIENT } from '@constants';
import { MapExport } from '../krunker';
import { promises as fs } from 'fs';
import { ipcRenderer } from 'electron';
import { resolve } from 'path';
import { toGrayscale } from '@color-utils';

(async function() {
	const css = await fs.readFile(resolve(__dirname, '../renderer/styles/main.css'), 'utf8');

	function inject() {
		const injectElement = document.createElement('style');
		injectElement.innerHTML = css;
		document.head.appendChild(injectElement);
	}

	if (document.readyState === 'interactive' || document.readyState === 'complete') inject();
	else document.addEventListener('DOMContentLoaded', inject);
}());

// When closeClient is called from the onclick, close the client. The game will attempt to override this.
Object.defineProperty(window, 'closeClient', {
	enumerable: false,
	value(): void { return ipcRenderer.send(MESSAGE_EXIT_CLIENT); }
});

const mapSettings: Partial<MapExport> = {
	skyDome: false,
	toneMapping: 4,
	sky: 0x040a14,
	fog: 0x080c12,
	lightI: 1.6,
	light: 0xffffff,
	ambient: 0x2d4c80
};

const functionHook = new FunctionHook();
functionHook.hook('JSON.parse', (object: MapExport) => {
	// Check if the parsed object is a map export.
	if (object.name && object.spawns) {
		/**
		 * Merge the parsed map with the client map settings.
		 * Proxy the map settings so whenever they're accessed,
		 * we can pass values and reference mapSettings.
		 */
		for (const index in object.colors) object.colors[index] = toGrayscale(object.colors[index]);
		return new Proxy({ ...object, ...mapSettings }, {
			get(target: MapExport, key: keyof MapExport) {
				return mapSettings[key] ?? target[key];
			}
		});
	}
	return object;
});
