<script lang="ts">
    import TodoItemCreate from "./components//item/TodoItemCreate.svelte";
    import EditTaskModal from "./components/Modal/EditTaskModal.svelte";
    import TodoItems from "./components/item/TodoItems.svelte";
    import type { Task } from "./model";

    let items: Task[] = [];

    let editTaskModalVisible = false;
    let editTaskModalData: Task|null = null;

    function onTaskEdit(e){
        editTaskModalData = structuredClone(e.detail);
        editTaskModalVisible = true;
        console.log(e.detail);
    }

    function onTaskEditSave(e){
        items = items.map((v: Task) => v.id == e.detail.id ? e.detail : v);
        console.log(e.detail);
    }
</script>

<EditTaskModal visible={editTaskModalVisible} data={editTaskModalData} on:save={onTaskEditSave}/>
<TodoItems bind:items on:edit={onTaskEdit} />
<TodoItemCreate bind:items />
