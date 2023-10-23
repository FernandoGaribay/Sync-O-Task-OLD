<script lang="ts">
    import type { TagData } from "../../../model";

    
    export let data: TagData;

    function getColor(color){
        //TODO parse or make sure that user cannot provide non-hex colors
        return color;
    }

</script>

<div class="rounded px-2 text-sm text-white inline-block" style="background-color: {getColor(data.color)}">
    {data.name}
</div>