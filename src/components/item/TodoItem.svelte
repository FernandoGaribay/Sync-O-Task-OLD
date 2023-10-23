<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Task } from "../../model";
    import TodoItemActions from "./TodoItemActions.svelte";
    import Tags from "./tag/Tags.svelte";

    const dispatch = createEventDispatcher();

    export let data: Task;

    function onTitleBlur() {
        dispatch("titleChange");
    }
</script>

<div class="rounded bg-white drop-shadow-md p-4 border-1 border-black">
    <div class="flex justify-between">
        <span
            class:line-through={data.completed}
            spellcheck="false"
            contenteditable="true"
            on:blur={onTitleBlur}
            bind:textContent={data.title}
        />
        <TodoItemActions
            on:delete
            on:completedChange
            on:edit
            bind:completed={data.completed}
        />
    </div>
    <Tags bind:tags={data.tags} />
</div>


