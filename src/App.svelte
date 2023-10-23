<script lang="ts">
    import { onMount } from "svelte";
    import TodoItemCreate from "./components//item/TodoItemCreate.svelte";
    import EditTaskModal from "./components/Modal/EditTaskModal.svelte";
    import TodoItems from "./components/item/TodoItems.svelte";
    import TaskFilaIo from "./components/file/TaskFileIo.svelte";
    import { modals } from "./modals";
    import type { Task } from "./model";
    import DeleteTaskModal from "./components/Modal/DeleteTaskModal.svelte";

    let items: Task[] = [];
    const ITEMS_STORAGE_KEY = "todoItems";

    function onTaskEdit(e: { detail: Task }) {
        modals.editTask.data = structuredClone(e.detail);
        modals.editTask.visible = true;
    }

    function onTaskEditSave(e: { detail: Task }) {
        items = items.map((v: Task) => (v.id == e.detail.id ? e.detail : v));

        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    }

    function startTaskDeletion(e: {detail:Task}){
        modals.deleteTask.data = e.detail;
        modals.deleteTask.visible = true;
    }

    function onTaskDelete(){
        items = items.filter(i => i.id != modals.deleteTask.data.id);
        saveToLocalStorage();
    }

    onMount(() => {
        const todoItems = window.localStorage.getItem(ITEMS_STORAGE_KEY);
        if (todoItems == null) return;

        try {
            const data: Task[] = JSON.parse(todoItems);
            items = data;
        } catch (e) {
            console.error(e);
        }
    });
</script>

<body class="bg-gray-50 p-4">
    <EditTaskModal
        bind:visible={modals.editTask.visible}
        bind:data={modals.editTask.data}
        on:save={onTaskEditSave}
    />

    <DeleteTaskModal 
        bind:visible={modals.deleteTask.visible}
        bind:data={modals.deleteTask.data}
        on:delete={onTaskDelete}
    />

    <TodoItems
        bind:items
        on:completedChange={saveToLocalStorage}
        on:edit={onTaskEdit}
        on:delete={startTaskDeletion}
        on:delete={saveToLocalStorage}
        on:titleChange={saveToLocalStorage}
    />
    <div class="mt-4">
        <TodoItemCreate bind:items on:create={saveToLocalStorage} />
    </div>

    <div class="mt-4">
        <TaskFilaIo bind:items />
    </div>
</body>
