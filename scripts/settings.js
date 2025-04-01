import { MODULENAME } from './config.js';

export function registerSettings() {
	game.settings.register(MODULENAME, 'tokenTerrain', {
		name: game.i18n.localize('Dnd5eDragRulerIntegration.settings.tokenTerrain.name'),
		hint: game.i18n.localize('Dnd5eDragRulerIntegration.settings.tokenTerrain.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register(MODULENAME, 'elevationSwitching', {
		name: game.i18n.localize('Dnd5eDragRulerIntegration.settings.elevationSwitching.name'),
		hint: game.i18n.localize('Dnd5eDragRulerIntegration.settings.elevationSwitching.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register(MODULENAME, 'hideSpeedButton', {
		name: game.i18n.localize('Dnd5eDragRulerIntegration.settings.hideSpeedButton.name'),
		hint: game.i18n.localize('Dnd5eDragRulerIntegration.settings.hideSpeedButton.hint'),
		scope: 'client',
		config: true,
		type: Boolean,
		default: false
	});
	
	game.settings.register(MODULENAME, 'restrictSpeedButton', {
		name: game.i18n.localize('Dnd5eDragRulerIntegration.settings.restrictSpeedButton.name'),
		hint: game.i18n.localize('Dnd5eDragRulerIntegration.settings.restrictSpeedButton.hint'),
		scope: "world",
		config: true,
		type: String,
		default: "1",
		choices: {1: "Player", 2: "Trusted", 3: "Assistant", 4: "Game Master"}
	});
}