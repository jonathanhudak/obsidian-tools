import { Plugin } from "obsidian";
import { DateTime } from "luxon";

interface HabitCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: HabitCalendarSettings = {
	mySetting: "default",
};

export default class HabitCalendar extends Plugin {
	settings: HabitCalendarSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"time-marker",
			(source, el, ctx) => {
				const [dateStr] = source
					.split("\n")
					.filter((row) => row.length > 0);

				const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

				const date = DateTime.fromISO(dateStr, {
					zone,
				});

				const container = el.createEl("p");
				container.createEl("strong").createEl("span", {
					text: date.toLocaleString(DateTime.DATE_HUGE),
				});
				container.createEl("span", {
					text: " — ",
				});
				container.createEl("span", {
					text: date.toRelative()?.toString(),
				});
			}
		);
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
// 	plugin: HabitCalendar;

// 	constructor(app: App, plugin: HabitCalendar) {
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
