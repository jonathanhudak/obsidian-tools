<script lang="ts">
	import { onMount, tick } from 'svelte';
	import rough from 'roughjs';
	import { tooltip } from './_tooltip.js';
	import Tooltip from './DailyNoteTooltip.svelte';
	// import { annotate } from 'rough-notation';
	export let activeColor: string = 'limegreen';
	let canvas: HTMLCanvasElement;
	let height: number = 100,
		width: number = 1100;
	onMount(async () => {
		let rc = rough.canvas(canvas);
		let ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		await tick();

		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
		}

		for (let x = 0; x < 52; x += 1) {
			const col = x * 14 + 2;
			for (let y = 0; y < 7; y += 1) {
				const row = y * 14 + 2;
				rc.rectangle(col, row, 10, 10, {
					stroke: activeColor,
					fill: activeColor,
					hachureAngle: 33,
					hachureGap: 3
				});
			}
		}
	});
</script>

<div class="calendar">
	<div class="calendar-body">
		<canvas bind:this={canvas} use:tooltip />
		<Tooltip />
	</div>
</div>

<style>
	.calendar {
		padding: 1rem;
		white-space: nowrap;
		overflow-x: auto;
	}

	.calendar-body {
		display: flex;
	}

	canvas {
		max-width: 1200px;
	}

	ol {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 10px;
	}

	li {
		text-transform: lowercase;
		text-align: right;
		width: calc(14px * 4.33);
		text-align: left;
	}
</style>
