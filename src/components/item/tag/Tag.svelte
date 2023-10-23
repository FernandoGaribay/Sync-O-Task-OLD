<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { TagData } from "../../../model";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let data: TagData;
    export let editing: boolean;

    function getColor(color){
        //TODO parse or make sure that user cannot provide non-hex colors
        return color;
    }

    function onDelete(){
        dispatch("delete");
    }

</script>

<div class="rounded px-2 text-sm text-white inline-block flex gap-1 items-center" style="background-color: {getColor(data.color)}">
    {#if editing}
        <span spellcheck="false" bind:textContent={data.name} contenteditable>{data.name}</span>
    {:else}
        <span>{data.name}</span>
    {/if}

    {#if editing}
        <span class="cursor-pointer" on:click={onDelete}>
            <Icon icon="uis:times-circle"/>
        </span>
    {/if}
</div>