<script lang="ts">
	import RoughCalendar from './RoughCalendar.svelte';
	import type { Habit, DataViewHabit } from '../types';
	export let habitsData: DataViewHabit[] = [];

	function getDaysSinceDate(habit: Habit) {
		if (!habit) return 0;

		// https://stackabuse.com/javascript-get-number-of-days-between-dates/
		const start = typeof habit.date === 'string' ? new Date(habit.date) : habit.date;
		const now = new Date();

		// One day in milliseconds
		const oneDay = 1000 * 60 * 60 * 24;

		// Calculating the time difference between two dates
		const diffInTime = now.getTime() - start.getTime();

		// Calculating the no. of days between two dates
		const diffInDays = Math.round(diffInTime / oneDay);

		return diffInDays;
	}

	const habits: Habit[] = habitsData.map((t) => ({
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

{#if calendarData.length > 0}
	<RoughCalendar {calendarData} />
{/if}

<style>
</style>
