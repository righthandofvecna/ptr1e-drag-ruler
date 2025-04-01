import { SPEED_TYPES, DEFAULT_SPEED_TYPE, MODULENAME } from "./config.js";

//Returns the highest movement mode of a given object of movement modes.
export function getHighestMovementMode(movementModes) {
	var highestSpeed = 0;
	var highestMovement = DEFAULT_SPEED_TYPE;
	for (const [key, value] of Object.entries(movementModes)) {
		if (value > highestSpeed && key != 'teleport') {
			highestSpeed = value;
			highestMovement = key;
		}
	}
	return highestMovement;
};

// Returns all the movement speeds of an actor
export function getActorSpeeds(actor) {
	const speeds = Object.keys(SPEED_TYPES).reduce((acc,key) =>({...acc, [key]: actor.system.capabilities?.[key] ?? 0}), {});
	return speeds;
}

//Returns the non-zero movement speeds of a token, including the module's automatic mode and an optional teleportation mode.
export function getTokenSpeeds(tokenDocument) {
	const actor = tokenDocument.actor || tokenDocument.parent;
	if (!actor) return false;
	const speeds = Object.entries(getActorSpeeds(actor)).filter(([key, value]) => value > 0).map(([key, value]) => key);
	speeds.unshift('auto');
	return speeds;
};

//Returns the movement a token should used based on settings, terrain, and/or elevation.
export function getMovementMode(token) {
	const tokenDocument = token.document;
	const movementModes = getActorSpeeds(tokenDocument.actor);
	const selectedSpeed = tokenDocument.getFlag(MODULENAME, 'selectedSpeed');
	
	// If a token has a speed selected use that.
	if (selectedSpeed && selectedSpeed != 'auto')
		return selectedSpeed;

	const forceMovement = Object.keys(SPEED_TYPES).filter(([key, value]) => movementModes[key] && SPEED_TYPES[key].auto && SPEED_TYPES[key].auto(tokenDocument));
	if (forceMovement.length > 0) {
		return forceMovement.map((key) => movementModes[key]).toSorted((a,b)=>movementModes[b.key]-movementModes[a.key])[0];
	}
	return getHighestMovementMode(movementModes) || DEFAULT_SPEED_TYPE;
};