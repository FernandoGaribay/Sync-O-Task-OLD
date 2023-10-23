<script lang="ts">
    import type { TagData } from "../../../model";
    import { v4 as uuidv4} from 'uuid'
    import Tag from "./Tag.svelte";

    export let editing: boolean = false;

    let adding: boolean = false;
    let addInput: HTMLInputElement;

    let tagName: string = "";

    export let tags: TagData[];

    function addTag() {
        adding = true;
        
        setTimeout(() => {
            addInput.focus();
        }, 5);
    }

    // https://stackoverflow.com/a/5092846  https://creativecommons.org/licences/by-sa/4.0/
    function generateRandomColor(){
        return Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    }

    function onInputKeydown(e: KeyboardEvent) {
        if(e.key != "Enter")
            return;

        tags = [...tags, {
            id: uuidv4(),
            name: tagName,
            color: `#${generateRandomColor()}`
        }];

        tagName = "";
    } 

    function onTagDelete(tag: TagData){
        tags = tags.filter(t => t.id != tag.id);
    }

    function onLostFocus(){
        adding = false;
    }
</script>

<div class="flex flex-wrap gap-1 mt-1 items-center">
    {#each tags as tag(tag.id)}
        <Tag data={tag} {editing} on:delete={() => onTagDelete(tag)}/>
    {/each}

    {#if editing}
        {#if adding}
            <input bind:value={tagName} type="text" on:keydown={onInputKeydown} on:blur={onLostFocus} bind:this={addInput} class="h-2 w-14"/>
        {/if}
        <span class="cursor-pointer" on:click={addTag}>+</span>
    {/if}
</div>
