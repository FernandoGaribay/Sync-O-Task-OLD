<script lang="ts">
    import type { Task } from "../model"
    import TodoItem from "./TodoItem.svelte";

    function onDelete(task: Task) {
        items = items.filter((t: Task) => t.id != task.id)
    }

    let items: Task[] = [
        {
            id: "1",
            title: "Buy some milk",
            completed: false
        },
        {
            id: "2",
            title: "Buy some cookies",
            completed: false
        },
        {
            id: "3",
            title: "Do my homework",
            completed: false
        }
    ];
</script>

<div>
    {#each items as item}
        <TodoItem bind:data={item} on:delete={() => onDelete(item)}/>
    {/each}
</div>

<style>
    div{
        display: flex;
        gap: 15px;
        flex-direction: column;
    }
</style>