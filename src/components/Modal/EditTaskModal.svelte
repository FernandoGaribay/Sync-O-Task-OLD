<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Task } from "../../model";
    import Modal from "../util/modal/Modal.svelte";
    import Button from "../util/button/Button.svelte";
    import Tags from "../item/tag/Tags.svelte";

    const dispatch = createEventDispatcher();

    export let visible = false;
    export let data: Task | null;

    function close() {
        visible = false;
    }

    function save() {
        dispatch("save", data);
        close();
    }
</script>

<Modal customClass="w-3/4" bind:visible>
    <h2 class="text-3xl font-bold">Edit Task</h2>
    <input class="w-full mt-4"
        type="text"
        bind:value={data.title}
    />

    <Tags bind:tags={data.tags} editing={true} />

    <textarea class="mt-4 w-full" placeholder="Escribe una descripcion aqui"></textarea>

    <div class="flex justify-end gap-2 mt-4">
        <Button color="blue" on:click={save}>Guardar</Button>
        <Button color="red" on:click={close}>Descartar</Button>
    </div>
</Modal>


<style>
    textarea {
        min-height: 8rem;
    }
</style>