import { MODULENAME } from './config.js';
import { registerSettings } from './settings.js';
import { registerKeybindings } from './keybindings.js';
import { registerAPI } from './api.js';
import { addConfig } from './token_config.js';
import { addSpeedButton } from './token_hud.js';

//Register this module's settings to Foundry
Hooks.once('init', () => {
	registerSettings();
	registerKeybindings();
	registerAPI();
});

Hooks.on('renderTokenHUD', (app, html, data) => {
	const tokenDocument = app.object.document
	if (!game.settings.get(MODULENAME, 'hideSpeedButton') && !tokenDocument.getFlag(MODULENAME, 'hideSpeedButton') && game.user.role >= game.settings.get(MODULENAME, 'restrictSpeedButton'))
		addSpeedButton(tokenDocument, html);
});

Hooks.on('renderTokenConfig', (config, html) => {
	addConfig(config, html);
});