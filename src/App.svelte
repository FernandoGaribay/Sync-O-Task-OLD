<script lang="ts">
    import { onMount } from "svelte";
    import TodoItemCreate from "./components//item/TodoItemCreate.svelte";
    import EditTaskModal from "./components/Modal/EditTaskModal.svelte";
    import TodoItems from "./components/item/TodoItems.svelte";
    import type { Task } from "./model";
    import TaskFilaIo from "./components/file/TaskFileIo.svelte";

    let items: Task[] = [];

    let editTaskModalVisible = false;
    let editTaskModalData: Task|null = null;

    function onTaskEdit(e: { detail: Task }){
        editTaskModalData = structuredClone(e.detail);
        editTaskModalVisible = true;
    }

    function onTaskEditSave(e: { detail: Task }){
        items = items.map((v: Task) => 
            v.id == e.detail.id ? e.detail : v);

        saveToLocalStorage();
    }

    function saveToLocalStorage(){
        window.localStorage.setItem("todoItems", JSON.stringify(items))
    }

    onMount(() => {
        const todoItems = window.localStorage.getItem("todoItems");
        if(todoItems == null)
            return;

        try {
            const data: Task[] = JSON.parse(todoItems);
            items = data;
        } catch (e) {
            console.log(e);
        }
    })
</script>

<EditTaskModal bind:visible={editTaskModalVisible} bind:data={editTaskModalData} on:save={onTaskEditSave}/>
<TodoItems bind:items={items} on:edit={onTaskEdit} on:delete={saveToLocalStorage} on:titleChange={saveToLocalStorage}/>
<TodoItemCreate bind:items={items} on:create={saveToLocalStorage} />
<TaskFilaIo bind:items={items}/>
