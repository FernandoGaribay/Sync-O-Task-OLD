<script lang="ts">
    import type { Task } from "../../model";
    import Button from "../util/button/Button.svelte";

    export let items: Task[] = [];

    let fileName: string = "";
    let importFiles: FileList;

    let visible = false;

    function save() {
        const string = JSON.stringify(items);
        const a = document.createElement("a");
        a.href = `data:application/json;chatset=utf-8,${string}`;
        a.download = fileName;
        a.click();
    }

    function onFilesChanged(files: FileList) {
        if (files == null) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target.result;
                if (typeof result != "string") return;

                const data: Task[] = JSON.parse(result);
                items = data;
            } catch (e) {
                console.log(e);
            }
        };

        reader.readAsText(files[0]);
    }

    function toggleVisibility() {
        visible = !visible;
    }

    $: onFilesChanged(importFiles);
</script>

<Button on:click={toggleVisibility}>Importar y exportar</Button>

{#if visible}
    <div>
        <input type="text" placeholder="File name" bind:value={fileName} />
        <Button on:click={save}>Save file</Button>
        <div class="bg-white p-4    ">
            <label class="file-input">
                <input type="file" bind:files={importFiles} />
                Subir un archivo
            </label>
        </div>
    </div>
{/if}

<style>
    div {
        margin-top: 20px;
    }
</style>
