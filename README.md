# Obsidian Habit Calendar Plugin

## References

* https://marcus.se.net/obsidian-plugin-docs/
* https://github.com/obsidianmd/obsidian-sample-plugin
* https://github.com/Richardsl/heatmap-calendar-obsidian
* https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/plugin-api.ts

### Svelte

* https://marcus.se.net/obsidian-plugin-docs/getting-started/svelte
* https://kit.svelte.dev/docs/adapter-static#github-pages

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

### Npm workspaces

* https://docs.npmjs.com/cli/v7/using-npm/workspaces#running-commands-in-the-context-of-workspaces
