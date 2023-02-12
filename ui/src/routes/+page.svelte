<script ts>
	import habitsData from '../fixtures/a.json';
	import HabitCalendar from '../components/HabitCalendar.svelte';
</script>

<div>
	<HabitCalendar {habitsData} />
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
	div {
		position: absolute;
		margin-left: 500px;
		margin-top: 100px;
	}
</style>
