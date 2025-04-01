import { MODULENAME } from './config.js';
import { getTokenSpeeds, getMovementMode } from './util.js';

export function registerAPI() {
	game.modules.get(MODULENAME).api = {
		getTokenSpeeds,
		getMovementMode
	};
}