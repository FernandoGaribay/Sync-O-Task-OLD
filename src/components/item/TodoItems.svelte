<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Task } from "../../model"
    import TodoItem from "../item/TodoItem.svelte";

    const dispatch = createEventDispatcher();

    export let items: Task[];

    function onDelete(task: Task) {
        items = items.filter((t: Task) => t.id != task.id)
    }
</script>

<div>
    {#each items as item}
        <TodoItem bind:data={item}
        on:edit={() => dispatch("edit", item)}
        on:delete={() => onDelete(item)}/>
    {/each}
</div>

<button on:click={() => console.log(items)}>Log</button>

<style>
    div{
        display: flex;
        gap: 15px;
        flex-direction: column;
    }
</style>