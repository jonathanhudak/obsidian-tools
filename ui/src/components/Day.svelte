<script lang="ts">
  import { Layer } from 'svelte-canvas';
  import { spring } from 'svelte/motion';

  export let x = 0,
    y = 0,
    r = 1,
    stroke: string | null = null,
    strokeWidth = 3;

  const radius = spring(r, { stiffness: 0.15, damping: 0.3 });
  $: radius.set(r);

  $: render = ({ context }: { context: CanvasRenderingContext2D }) => {
    context.fillStyle = stroke || 'gray';
    context.beginPath();
    context.arc(x, y, $radius, 0, 2 * Math.PI);
    context.fill();

    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = strokeWidth;
      context.beginPath();
      context.arc(x, y, $radius + strokeWidth / 2, 0, 2 * Math.PI);
      context.stroke();
    }
  };
</script>

<Layer {render} />
