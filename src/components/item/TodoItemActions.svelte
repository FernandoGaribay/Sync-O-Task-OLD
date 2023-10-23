<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Icon from "@iconify/svelte";

    const dispatch = createEventDispatcher();

    export let completed: boolean = false;

    function onEdit() {
        dispatch("edit");
    }

    function onDelete() {
        dispatch("delete");
    }

    function onCompletedChange(_) {
        dispatch("completedChange");
    }

    $: onCompletedChange(completed);
</script>

<div>
    <input type="checkbox" bind:checked={completed} />
    <button on:click={onEdit}>
        <Icon icon="material-symbols:edit" height={24} />
    </button>
    <button on:click={onDelete}>
        <Icon icon="material-symbols:delete-outline" height={24} />
    </button>
</div>

<style>
    input[type="checkbox"] {
        width: 1.1rem;
        height: 1.1rem;
    }

    div {
        display: flex;
        gap: 10px;
        align-items: center;
    }
</style>
