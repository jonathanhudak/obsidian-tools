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

import HabitCalendarView from "./HabitCalendarView.svelte";

// Remember to rename these classes and interfaces!

interface HabitCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: HabitCalendarSettings = {
	mySetting: "default",
};

declare global {
	interface Window {
		habitCalendar: (el: HTMLElement, habit: string) => void;
	}
}

window.habitCalendar = window.habitCalendar || {};

const dailyFolderName = "001 Daily";

function getDateFromFilePath(path: string): Date {
	// @TODO: use plugin setting for folder name

	const dateStr = path.replace(`${dailyFolderName}/`, "").replace(".md", "");
	const year = dateStr.slice(0, 4);
	const month = dateStr.slice(4, 6);
	const day = dateStr.slice(6);

	return new Date(`${year}-${month}-${day}`);
}

const testResult = getDateFromFilePath("001 Daily/20221201.md");
const expectedResult = new Date("2022-12-01").toString();
console.assert(testResult.toString(), expectedResult);

export default class HabitCalendar extends Plugin {
	settings: HabitCalendarSettings;

	async onload() {
		await this.loadSettings();

		window.habitCalendar = (el: HTMLElement, habitName: string) => {
			// @ts-ignore https://blacksmithgu.github.io/obsidian-dataview/api/intro/#plugin-access
			const dv = this.app.plugins.plugins.dataview.api;
			const habitTasks = dv
				.pages(`"${dailyFolderName}"`)
				// @ts-ignore
				.file.tasks.where((t) => t.text.includes(habitName));

			const allTasks = habitTasks.values
				// @ts-ignore
				.map((task) => ({
					link: task.link,
					date: getDateFromFilePath(task.path),
					completed: task.completed,
					p: task.path,
				}))

				.sort(
					(t1: { date: Date }, t2: { date: Date }) =>
						// @ts-ignore
						t1.date - t2.date
				);
			if (allTasks.length) {
				console.log("allTasks", allTasks);
			}

			new HabitCalendarView({
				target: createEl("div", { parent: el }),
				props: {},
			});
		};

		// // This creates an icon in the left ribbon.
		// const ribbonIconEl = this.addRibbonIcon(
		// 	"calendar-with-checkmark",
		// 	"Habit Calendar",
		// 	(evt: MouseEvent) => {
		// 		// Called when the user clicks the icon.
		// 		new Notice("This is a notice!");
		// 	}
		// );
		// // Perform additional things with the ribbon
		// ribbonIconEl.addClass("my-plugin-ribbon-class");

		// // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText("Status Bar Text");

		// // This adds a simple command that can be triggered anywhere
		// this.addCommand({
		// 	id: "open-sample-modal-simple",
		// 	name: "Open sample modal (simple)",
		// 	callback: () => {
		// 		new SampleModal(this.app).open();
		// 	},
		// });
		// // This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: "sample-editor-command",
		// 	name: "Sample editor command",
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		console.log(editor.getSelection());
		// 		editor.replaceSelection("Sample Editor Command");
		// 	},
		// });
		// // This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: "open-sample-modal-complex",
		// 	name: "Open sample modal (complex)",
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView =
		// 			this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	},
		// });

		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, "click", (evt: MouseEvent) => {
		// 	console.log("click", evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(
		// 	window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		// );
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
// 						console.log("Secret: " + value);
// 						this.plugin.settings.mySetting = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);
// 	}
// }
