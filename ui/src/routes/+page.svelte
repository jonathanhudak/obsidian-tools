<script ts>
	import habitsData from '../fixtures/a.json';
	import HabitCalendar from '../components/HabitCalendar.svelte';
</script>

<HabitCalendar {habitsData} />

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
