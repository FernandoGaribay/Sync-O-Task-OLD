<script lang="ts">
    export let visible: boolean = false;
    export let customClass: string = "";

    function close() {
        visible = false;
    }
</script>

{#if visible}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-bg" on:click={close}>
        <div class="modal {customClass}" on:click|stopPropagation>
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-bg {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    .modal {
        @apply rounded-xl;
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
    }
</style>
