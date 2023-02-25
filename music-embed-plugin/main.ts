import { Plugin } from "obsidian";

interface MusicEmbedPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MusicEmbedPluginSettings = {
	mySetting: "default",
};

// Source: Yanked from here: https://github.com/TamasBarta/obsidian-spotify-embed/blob/master/main.ts
const embedTemplates = new Map([
	[
		/spotify:track:(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/track/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/spotify:artist:(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/artist/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/spotify:album:(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/album/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/spotify:playlist:(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/playlist/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/spotify:show:(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed-podcast/show/${id}" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/spotify:episode:(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed-podcast/episode/${id}" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/https:\/\/open.spotify.com\/track\/(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/track/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/https:\/\/open.spotify.com\/artist\/(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/artist/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/https:\/\/open.spotify.com\/album\/(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/album/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/https:\/\/open.spotify.com\/playlist\/(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed/playlist/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/https:\/\/open.spotify.com\/show\/(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed-podcast/show/${id}" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
	[
		/https:\/\/open.spotify.com\/episode\/(?<id>\w+)/,
		(id: string) =>
			`<iframe src="https://open.spotify.com/embed-podcast/episode/${id}" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
	],
]);

export default class MusicEmbedPlugin extends Plugin {
	settings: MusicEmbedPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownPostProcessor((el, ctx) => {
			const link = el.querySelectorAll("a");
			link.forEach((link) => {
				embedTemplates.forEach((embed, regex) => {
					const match = link.innerText.match(regex);
					if (match && match.groups?.id) {
						console.log("match found", link);
						link.outerHTML = embed(match.groups.id);
					}
				});
			});
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const { contentEl } = this;
// 		contentEl.setText("Woah!");
// 	}

// 	onClose() {
// 		const { contentEl } = this;
// 		contentEl.empty();
// 	}
// }

// class SampleSettingTab extends PluginSettingTab {
// 	plugin: MusicEmbedPlugin;

// 	constructor(app: App, plugin: MusicEmbedPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const { containerEl } = this;

// 		containerEl.empty();

// 		containerEl.createEl("h2", { text: "Habit Calendar Settings." });

// 		new Setting(containerEl)
// 			.setName("Setting #1")
// 			.setDesc("It's a secret")
// 			.addText((text) =>
// 				text
// 					.setPlaceholder("Enter your secret")
// 					.setValue(this.plugin.settings.mySetting)
// 					.onChange(async (value) => {
// console.log("Secret: " + value);
// 						this.plugin.settings.mySetting = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);
// 	}
// }
