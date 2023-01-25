<script lang="ts">
    import { onMount } from "svelte";
	import rough from 'roughjs';
	import { annotate } from 'rough-notation';
	let height = 300;
    let canvasElement: HTMLCanvasElement
    onMount(() => {
        let rc = rough.canvas(canvasElement);

		
		

		rc.rectangle(10, 10, 200, 200, {
			fill: 'limegreen',
			hachureAngle: 45,
			hachureGap: 5,
		});

		rc.path('M230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z', { fill: 'purple', hachureAngle: 60, hachureGap: 5 });
		annotate(canvasElement, {
			type: 'circle'
		}).show();
    });
</script>


<canvas {height} bind:this={canvasElement}/>

