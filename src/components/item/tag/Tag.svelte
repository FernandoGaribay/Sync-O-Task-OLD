<script lang="ts">
    import type { TagData } from "../../../model";
    import Icon from "@iconify/svelte";
    
    export let data: TagData;

    function getColor(color){
        //TODO parse or make sure that user cannot provide non-hex colors
        return color;
    }

</script>

<div class="rounded px-2 text-sm text-white inline-block flex gap-1 items-center" style="background-color: {getColor(data.color)}">
    {data.name}
    <span class="cursor-pointer">
        <Icon icon="uis:times-circle" />
    </span>
    
</div>