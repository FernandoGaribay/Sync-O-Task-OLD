<script lang="ts">
    import { onMount } from "svelte";
    import TodoItemCreate from "./components//item/TodoItemCreate.svelte";
    import EditTaskModal from "./components/Modal/EditTaskModal.svelte";
    import TodoItems from "./components/item/TodoItems.svelte";
    import TaskFilaIo from "./components/file/TaskFileIo.svelte";
    import { modals } from "./modals";
    import type { Task } from "./model"

    let items: Task[] = [];
    const ITEMS_STORAGE_KEY = "todoItems";

    function onTaskEdit(e: { detail: Task }){
        modals.editTask.data = structuredClone(e.detail);
        modals.editTask.visible = true;
    }

    function onTaskEditSave(e: { detail: Task }){
        items = items.map((v: Task) => 
            v.id == e.detail.id ? e.detail : v);

        saveToLocalStorage();
    }

    function saveToLocalStorage(){
        window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    }

    onMount(() => {
        const todoItems = window.localStorage.getItem(ITEMS_STORAGE_KEY);
        if(todoItems == null)
            return;

        try {
            const data: Task[] = JSON.parse(todoItems);
            items = data;
        } catch (e) {
            console.error(e);
        }
    })
</script>

<EditTaskModal bind:visible={modals.editTask.visible} bind:data={modals.editTask.data} on:save={onTaskEditSave}/>
<TodoItems bind:items={items} on:completedChange={saveToLocalStorage} on:edit={onTaskEdit} on:delete={saveToLocalStorage} on:titleChange={saveToLocalStorage}/>
<TodoItemCreate bind:items={items} on:create={saveToLocalStorage} />
<TaskFilaIo bind:items={items}/>
