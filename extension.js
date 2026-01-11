import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class DisableAmbientBrightnessExtension extends Extension {
    enable() {
        // Nothing needed here – prefs controls behaviour
    }

    disable() {
        // Nothing to clean up
    }
}

