<script ts>
	import RoughCalendar from '../components/RoughCalendar.svelte';
	import HabitCalendar from '../components/HabitCalendar.svelte';
</script>

<HabitCalendar />

<RoughCalendar activeColor="gold" />

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
