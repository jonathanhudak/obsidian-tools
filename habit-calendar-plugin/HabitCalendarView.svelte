<script lang="ts">
	import HabitCalendar from "ui/src/components/HabitCalendar.svelte";
	import type { DataViewHabit } from "ui/src/types";
	export let habitsData: DataViewHabit[] = [];
	export let habitName: string = "";
</script>

<div>
	{habitName}
	<HabitCalendar {habitsData} />
</div>

<style>
	div {
		position: relative;
	}
</style>
