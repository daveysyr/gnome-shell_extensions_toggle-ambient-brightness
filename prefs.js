import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class DisableAmbientBrightnessPrefs extends ExtensionPreferences {

    fillPreferencesWindow(window) {
        const settings = new Gio.Settings({
            schema: 'org.gnome.settings-daemon.plugins.power',
        });

        const page = new Adw.PreferencesPage({
            title: 'Display',
        });

        const group = new Adw.PreferencesGroup({
            title: 'Brightness',
        });

        const row = new Adw.ActionRow({
            title: 'Disable ambient brightness',
            subtitle: 'Switch the toggle ON, to stop GNOME automatically changing the screen brightness when the ambient light level changes',
        });

        const toggle = new Gtk.Switch({
            active: !settings.get_boolean('ambient-enabled'),
            valign: Gtk.Align.CENTER,
        });

        toggle.connect('notify::active', () => {
        	row.subtitle = toggle.active
			? 'Ambient brightness is DISABLED'
			: 'Ambient brightness is ENABLED (GNOME default)';
		settings.set_boolean('ambient-enabled', !toggle.active);
        });

        row.add_suffix(toggle);
        row.activatable_widget = toggle;

        group.add(row);
        page.add(group);
        window.add(page);
    }
}

