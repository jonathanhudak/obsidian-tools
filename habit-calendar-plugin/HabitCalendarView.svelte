<script lang="ts">
	import HabitCalendar from "ui/src/components/HabitCalendar.svelte";
	import type { DataViewHabit } from "ui/src/types";
	export let habitsData: DataViewHabit[] = [];
</script>

<HabitCalendar {habitsData} />
