<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onEdit() {
        dispatch("edit");
    }

    function onDelete() {
        dispatch("delete");
    }
</script>

<div>
    <button on:click={onEdit}>Edit</button>
    <button on:click={onDelete}>Delete</button>
</div>

<style>
    div {
        display: flex;
        gap: 10px;
    }
</style>
