<script lang="ts">
    import App from "../../../App.svelte";
    import type { TagData } from "../../../model";
    import { v4 as uuidv4 } from 'uuid';
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

    function generateRandomColor(){
        return (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    function onInputKeyDown(e: KeyboardEvent) {
        if (e.key != "Enter")
            return;
        tags = [...tags, {
            id: uuidv4(),
            name: tagName,
            color: `#${generateRandomColor()}`
        }];

        tagName = "";

    }

    function onLostFocus() {
        adding = false;
    }
</script>

<div class="flex flex-wrap gap-1 mt-1 items-center">
    {#each tags as tag (tag.id)}
        <Tag data={tag} />
    {/each}
    {#if editing}
        {#if adding}
            <input
                bind:value={tagName}
                type="text"
                on:keydown={onInputKeyDown}
                on:blur={onLostFocus}
                bind:this={addInput}
                class="h-2 w-14"
            />
        {/if}
        <span class="cursor-pointer" on:click={addTag}>+</span>
    {/if}
</div>
