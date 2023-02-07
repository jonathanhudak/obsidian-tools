## Obsidian Habit Calendar Plugin

A plugin to view a github-style calendar for individual daily habits.

> [Don't break the chain.](https://jamesclear.com/stop-procrastinating-seinfeld-strategy) - Jerry Seinfeld

### Plugin Development

See plugin template README:
https://github.com/obsidianmd/obsidian-sample-plugin

### UI Development

This plugin is setup with a sveltekit server for component development.

For general development:

```
npm run ui
```

To deploy as a static website to gh-pages branch

```
npm run ui:deploy
```

Add a dependency to ui

```
npm i svelte-canvas -w ui
```

---

## References

* https://marcus.se.net/obsidian-plugin-docs/
* https://github.com/obsidianmd/obsidian-sample-plugin
* https://github.com/Richardsl/heatmap-calendar-obsidian
* https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/plugin-api.ts

### Npm workspaces

* https://docs.npmjs.com/cli/v7/using-npm/workspaces#running-commands-in-the-context-of-workspaces


### Svelte

* https://marcus.se.net/obsidian-plugin-docs/getting-started/svelte
* https://kit.svelte.dev/docs/adapter-static#github-pages
* https://github.com/dnass/svelte-canvas
* https://svelte.dev/repl/8265c051bf754f8aba6f5d6ed9d0d74f?version=3.55.1 

### RoughjS
* https://roughjs.com/
* https://github.com/rough-stuff/rough/wiki
* https://roughnotation.com/

### Tooltip

* https://svelte.dev/repl/318f2c2ca4174a97befe0840936b9eec?version=3.23.0
* https://floating-ui.com/docs/computePosition
