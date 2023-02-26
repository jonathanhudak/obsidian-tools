# Using Dataview in [Obsidian](https://obsidian.md/)

[Dataview](https://blacksmithgu.github.io/obsidian-dataview/) is a plugin I used heavily in my day-to-day note-making.

## Useful snippets
These are queries I find usefulf for my personal workflow

### List notes with a given tag
````
```dataview
LIST FROM #daily/reminder 

```
````

### List incomplete tasks with a given tag

````
```dataview
TASK
FROM ""
WHERE contains(text, "#p0")
WHERE !completed

```
````
