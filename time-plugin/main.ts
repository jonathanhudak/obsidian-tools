import {
	// App,
	// Editor,
	// MarkdownView,
	// Modal,
	// Notice,
	Plugin,
	// PluginSettingTab,
	// Setting,
} from "obsidian";

const rtf1 = new Intl.RelativeTimeFormat("en", { style: "narrow" });

// Remember to rename these classes and interfaces!

interface HabitCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: HabitCalendarSettings = {
	mySetting: "default",
};

function relativeTimeToPresent(date: Date) {
	const now = new Date();
	const diff = date.getTime() - now.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	return rtf1.format(days, "day");
}

export default class HabitCalendar extends Plugin {
	settings: HabitCalendarSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"time-marker",
			(source, el, ctx) => {
				console.log("source", source);
				const [dateStr] = source
					.split("\n")
					.filter((row) => row.length > 0);

				const date = new Date(dateStr);

				console.log("time-marker", dateStr);

				const container = el.createEl("div");
				container
					.createEl("strong")
					.createEl("span", { text: date.toLocaleDateString() });
				container.createEl("p", {
					text: relativeTimeToPresent(date),
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
