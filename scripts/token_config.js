import { MODULENAME } from './config.js';
import { getTokenSpeeds } from "./util.js"

function createConfigOption(label, inputType, flag, value) {
	var defaultValue = ''
	switch (inputType) {
		case 'checkbox':
			defaultValue = `${value ? 'checked=""' : '""'}`;
			break;
		case 'number':
			defaultValue = value ? `value='${value}' placeholder='0'`: `value placeholder='0'`;
			break;
	}
	
	return `<div class='form-group'><label>${label}</label><input type='${inputType}' name='flags.${MODULENAME}.${flag}' ${defaultValue}></div>`
}

function addConfigResourceField(config, html) {
	const tokenDocument = config.token;
	const tokenSpeeds = getTokenSpeeds(tokenDocument);
	const selectedSpeed = tokenDocument.getFlag(MODULENAME, 'selectedSpeed');
	const hideSpeedButton = tokenDocument.getFlag(MODULENAME, 'hideSpeedButton');
	const resourceTab = html.find('div.tab[data-tab="resources"]');

	if (tokenSpeeds) {
		resourceTab.append(`<div class='form-group'><label>Selected Movement Speed</label><div class='form-fields'><select name='flags.${MODULENAME}.selectedSpeed'></select></div></div>`);
		const speedField = html.find(`select[name="flags.${MODULENAME}.selectedSpeed"]`);
		for (const tokenSpeed of tokenSpeeds) {
			speedField.append(`<option value=${tokenSpeed} ${tokenSpeed == selectedSpeed ? "selected" : ""}>${tokenSpeed.charAt(0).toUpperCase() + tokenSpeed.slice(1)}</option>`);
		};
	};

	resourceTab.append(createConfigOption('Hide Speed Button', 'checkbox', 'hideSpeedButton', hideSpeedButton));
}

export function addConfig(config, html) {
	addConfigResourceField(config, html);
}