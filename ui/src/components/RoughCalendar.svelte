<script lang="ts">
	import type { Habit } from '../types';
	export let calendarData: Habit[] = [];
	let totalDays = calendarData.length;
	import { onMount, tick } from 'svelte';
	import { RoughCanvas } from 'roughjs/bin/canvas';
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

	let i = 0;
	for (let x = 0; x < weeksInYear; x += 1) {
		const col = x * daySquareSize + daySquareSpacer;
		if (i > totalDays) {
			break;
		}
		for (let y = 0; y < daysInWeek; y += 1) {
			const row = y * daySquareSize + daySquareSpacer;
			days.push([col, row]);
			i += 1;
			if (i > totalDays) {
				break;
			}
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
		let rc = new RoughCanvas(canvas);
		canvas.width = width;
		canvas.height = height;
		await tick();

		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
		}

		days.forEach(([col, row], index) => {
			const isCompleted = calendarData[index]?.completed;
			rc.rectangle(col, row, 10, 10, {
				stroke: isCompleted ? activeColor : 'gainsboro',
				fill: isCompleted ? activeColor : undefined,
				hachureAngle: 33,
				hachureGap: 3
			});
		});
	});

	function showTooltipForPosition(e: MouseEvent) {
		// @ts-ignore
		const { layerY, layerX } = e;

		const index = findDayByPos(layerX, layerY);
		const dayData = calendarData[index];

		if (index === -1 || !dayData || index > totalDays) {
			return {};
		}

		return {
			text: `${dayData.date.toLocaleDateString()}`
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
	}
</style>
