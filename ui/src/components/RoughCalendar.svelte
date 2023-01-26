<script lang="ts">
    import { onMount, tick } from "svelte";
	import rough from 'roughjs';
	import { annotate } from 'rough-notation';
	export let activeColor: string = 'limegreen';
    let canvas: HTMLCanvasElement
	let height: number = 100, width: number = 1100;
    onMount(async () => {
        let rc = rough.canvas(canvas);
		canvas.width = width;
		canvas.height = height;
		await tick();


		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
		}
				
		for (let x = 0; x < 73; x += 1) {
			const col = x * 14 + 2;
			for (let y = 0; y < 7; y += 1) {
				const row = y * 14 + 2;
				rc.rectangle(col, row, 10, 10, {
					stroke: activeColor,
					fill: activeColor,
					hachureAngle: 33,
					hachureGap: 3,
				});
			}
		}
    });
</script>
<style>
	.calendar {
		margin: 1rem;
	}
</style>

<div class="calendar">
<canvas bind:this={canvas} />
</div>
