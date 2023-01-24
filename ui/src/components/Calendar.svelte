<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas,  Layer  } from 'svelte-canvas';
	import Day from './Day.svelte';
  
	interface Day {
		x: number;
		y: number;
		r: number;
		id: string;
	}

	const margin = { top: 10, right: 10, bottom: 25, left: 25 };
	let size = 5;
	function makeX(i: number) {
		return 10 + (i * size) * 10;
	}
	let days: Day[] = Array(7).fill(null).map((n, i) => ({
		x: makeX(i),
		y: 10,
		r: size,
		id: `day${i}`,
	}));
	let width, height;
	let picked: string | null = null;
	let click = false;

	console.log(days)

  </script>
  
  <div bind:clientWidth={width} bind:clientHeight={height}>
	<Canvas
		{width}
		{height}
		style="cursor: pointer"
		on:mousemove={({ clientX: x, clientY: y }) => {
			if (y < 10 || y > 20) {
				picked = null;
				return;
			}
			const day = days.find(day => {
				return x > day.x && x < day.x + 50
			});
			if (day) {
				picked = day.id;
			}
		}}
		on:mousedown={() => (click = true)}
		on:mouseup={() => (click = false)}
		on:mouseout={() => (picked = null)}
	>
	  {#each days as {x, y, r, id }}
		<Day {x} {y} r={picked === id ? 5 : 3} stroke={picked === id ? 'gold' : null} />
	  {/each}
	</Canvas>
  </div>
  
  <style>
	div {
	  width: 100%;
	  height: 100%;
	}
  </style>
  