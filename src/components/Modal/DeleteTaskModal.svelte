<script lang="ts">
    import type { Task } from "../../model";
    import Modal from "../util/modal/Modal.svelte";
    import Button from "../util/button/Button.svelte";
    import { createEventDispatcher } from "svelte";
    export let visible = false;
    export let data: Task | null = null;

    const dispatch = createEventDispatcher();

    function close(){
        visible =false;
    }

    function onDelete(){
        dispatch("delete");
        close();
    }
</script>

<Modal customClass="w-1/2" bind:visible>
    <p class="text-center text-xl">De verdad quieres eliminar la tarea <b>{data.title}</b>?</p>
    <div class="flex justify-end gap-2">
        <Button color="gray" on:click={close}>Cancelar</Button>
        <Button color="red" on:click={onDelete}>Borrar</Button>
    </div>
</Modal>
