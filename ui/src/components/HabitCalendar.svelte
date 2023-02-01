<script lang="ts">
	import RoughCalendar from '../components/RoughCalendar.svelte';
	import rawHabitsData from '../fixtures/a.json';
	interface Habit {
		date: Date;
		completed: boolean;
	}

	function getDaysSinceDate(habit: Habit) {
		// https://stackabuse.com/javascript-get-number-of-days-between-dates/
		const start = new Date(habit.date);
		const now = new Date();

		// One day in milliseconds
		const oneDay = 1000 * 60 * 60 * 24;

		// Calculating the time difference between two dates
		const diffInTime = now.getTime() - start.getTime();

		// Calculating the no. of days between two dates
		const diffInDays = Math.round(diffInTime / oneDay);

		return diffInDays;
	}

	const habits: Habit[] = rawHabitsData.map((t) => ({
		...t,
		date: new Date(t.date)
	}));

	function sortDateDesc(a: Habit, b: Habit) {
		return b.date.getTime() - a.date.getTime();
	}
	const sortedHabits = habits.sort(sortDateDesc);
	console.log('sortedHabits', sortedHabits);
	let totalDays = getDaysSinceDate(sortedHabits.slice(-1)[0]);
</script>

<RoughCalendar {totalDays} />

<style>
</style>
