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
	type DayPos = [x: number, y: number];
	let days: DayPos[] = [];
	const daySquareSize = 14;
	const daySquareSpacer = 2;
	const daysInWeek = 7;
	const weeksInYear = 52;

	for (let x = 0; x < weeksInYear; x += 1) {
		const col = x * daySquareSize + daySquareSpacer;
		for (let y = 0; y < daysInWeek; y += 1) {
			const row = y * daySquareSize + daySquareSpacer;
			days.push([col, row]);
		}
	}
	// console.debug(days);
	function findDayByPos(x: number, y: number) {
		return days.findIndex(([dayX, dayY]) => {
			return (
				x > dayX &&
				x < dayX + daySquareSize + daySquareSpacer &&
				y > dayY &&
				y < dayY + daySquareSize + daySquareSpacer
			);
		});
	}
	onMount(async () => {
		let rc = rough.canvas(canvas);
		canvas.width = width;
		canvas.height = height;
		await tick();

		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
		}

		days.forEach(([col, row]) => {
			rc.rectangle(col, row, 10, 10, {
				stroke: activeColor,
				fill: activeColor,
				hachureAngle: 33,
				hachureGap: 3
			});
		});
	});

	function showTooltipForPosition(e: MouseEvent) {
		console.debug(e);

		// @ts-ignore
		const { layerY, layerX } = e;

		const index = findDayByPos(layerX, layerY);

		console.log('index', index);

		return {
			text: `Hello day ${index + 1}`
		};
	}
</script>

<div class="calendar">
	<div class="calendar-body">
		<canvas bind:this={canvas} use:tooltip={{ showTooltipForPosition }} />
		<Tooltip />
	</div>
</div>

<style>
	.calendar {
		white-space: nowrap;
		overflow-x: auto;
	}

	.calendar-body {
		display: flex;
	}

	canvas {
		max-width: 1200px;
		cursor: none;
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
