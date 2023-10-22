<script lang="ts">
    import type { Task } from "../../model";

    export let items: Task[] = [];

    let fileName: string = "";
    let importFiles: FileList;

    function save() {
        const string = JSON.stringify(items);
        const a = document.createElement("a");
        a.href = `data:application/json;chatset=utf-8,${string}`;
        a.download = fileName;
        a.click();
    }

    function onFilesChanged(files:FileList){
        if(files == null)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target.result;
                if(typeof result != "string")
                    return;

                const data: Task[] = JSON.parse(result);
                items = data;
            } catch (e) {
                console.log(e);
            }
        }

        reader.readAsText(files[0]);
    }

    $: onFilesChanged(importFiles);
</script>

<div>
    <input type="text" placeholder="File name" bind:value={fileName}/>
    <button on:click={save}>Save file</button>
    <input type="file" bind:files={importFiles}>
</div>

<style>
    input[type="file"] {
        display: block;
    }

    div {
        margin-top: 20px;
    }
</style>

