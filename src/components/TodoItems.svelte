<script>
    import TodoItem from "./TodoItem.svelte";

    function onDelete() {
        alert("Item was deleted");
    }
</script>

<div>
    <TodoItem data={{
        id: "1",
        title: "Buy some cookies",
        completed: false
    }} on:delete={onDelete}/>
</div>

<style>
    div{
        display: flex;
        gap: 15px;
        flex-direction: column;
    }
</style>