<script lang="ts">
    import type { Task } from "../../model";
    import { v4 as uuidv4 } from 'uuid';
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    export let items: Task[];

    let title: string = "";

    function onKeyDown(e: KeyboardEvent){
        if(e.key != "Enter")
            return;
        if(title == "")
        return;
        

        items = [...items, {
            id: uuidv4(),
            title,
            completed: false,
            description: "",
            tags: [
                {
                    id: uuidv4(),
                    name: "Healt",
                    color: "#FF0000"
                }
            ]
        }];

        dispatch("create")
        title = "";
    }
</script>

<input type="text" bind:value={title} on:keydown={onKeyDown} 
placeholder="Create a new task..."/>


<style>
    input {
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
    }
</style>