import { getMovementMode, getActorSpeeds } from './util.js';
import { MODULENAME, SPEED_TYPES } from "./config.js";

// Hooking into Drag Ruler.
Hooks.once('dragRuler.ready', (SpeedProvider) => {
	class PTR1eSpeedProvider extends SpeedProvider {
		// An array of colors to be used by the movement ranges.
		get colors() {
			return [
				...Object.entries(SPEED_TYPES).map(([k,v])=>({id: k, default: v.default, name: v.name})),
				{id: 'dash', default: 0xFFFF00, 'name': 'Dashing'},
				{id: 'bonusDash', default: 0xFF6600, 'name': 'Bonus Dashing'},
			];
		}

		// This is called by Drag Ruler once when a token starts being dragged. Does not get called again when setting a waypoint.
		getRanges(token) {
			const tokenDocument = token.document


			//Retrieves and compiles relevant movement data of the token.
			const movementSpeeds = getActorSpeeds(tokenDocument.actor);
			const movementMode = getMovementMode(token) || 'walk';
			tokenDocument.setFlag(MODULENAME, 'movementMode', movementMode);

			// Teleportation does not require speed modifiers or dash ranges.
			if (movementMode == 'teleport') {
				return [{range: movementSpeeds['teleport'], color: 'teleport'}]
			}

			const movementRange = movementSpeeds[movementMode];
			return [{range: movementRange, color: movementMode}, {range: movementRange * 2, color: 'dash'}];
		}
	}
	//Registers the speed provider to be used by Drag Ruler's API.
	dragRuler.registerModule(MODULENAME, PTR1eSpeedProvider)
});