<script lang="ts">
	import RoughCalendar from '../components/RoughCalendar.svelte';
	import rawHabitsData from '../fixtures/a.json';
	import type { Habit } from '../types';

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

	function sortDateAsc(a: Habit, b: Habit) {
		return a.date.getTime() - b.date.getTime();
	}

	const sortedHabits = habits.sort(sortDateAsc);

	const oldestHabit = sortedHabits[0];
	let totalDays = getDaysSinceDate(oldestHabit);

	// Create the calendar of days counting up from the oldest recorded ahbit
	let calendarData: Habit[] = new Array(totalDays)
		.fill({})
		.map((d, i) => {
			const date = new Date(oldestHabit.date);
			date.setDate(oldestHabit.date.getDate() + i);

			// Find any matching record for the date
			const matchingHabit = sortedHabits.find((h) => h.date.getTime() - date.getTime() === 0);
			if (matchingHabit) {
				return matchingHabit;
			}
			// If there is no matching date assume it was not completed
			return {
				date,
				completed: false
			};
		})
		.reverse();
</script>

<RoughCalendar {calendarData} />

<style>
</style>
