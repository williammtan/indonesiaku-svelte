<script lang="ts">
    import { debounce } from "$lib/utils";
    import { createEventDispatcher } from 'svelte';
    import { copyText } from 'svelte-copy';
    import { toast, SvelteToast } from '@zerodevx/svelte-toast'

    const dispatch = createEventDispatcher();

    export let inputText = "";
    export let outputText = "";
    let translating = false;

    $: numLetters = inputText.length; // Add maxing out

    let vote: boolean | undefined;

    // $: if (outputText != "" && inputText != "") {vote = undefined} // update whenever input and output text is updated

    function sendVote(voteValue: boolean) {
        if ((inputText != "") && (outputText != "")) {
            vote = voteValue;
            dispatch("vote", {quality: vote})
        }
    }

    async function remove() {
        inputText = "";
        outputText = "";
    }

    function init(el) {
        el.focus()
    }

    async function translate() {
        dispatch("translate", {
            done: () => {translating = false}
        });
        vote = undefined
    }
</script>

<!-- <SvelteToast/> -->
 <!-- TODO: toast for copy -->

<main>
    <div class="input-box textbox">
        <textarea on:keydown={() => translating = true} on:keyup={debounce(translate)} bind:value={inputText} class="text-area" use:init maxlength=500></textarea>
        <button class="close" on:click={remove}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="bottom">
            <div class="icon blank"></div>
            <div class="letter-count">
                <p>{numLetters}/500</p>
            </div>
        </div>
    </div>
    <div class="output-box textbox">
        <div class="text-area">
            {#if translating}
                <p class="placeholder">Translating</p>
            {:else if (outputText === "" || outputText == undefined)}
                <p class="placeholder">Translation</p>
            {:else}
                <p class="text-output">{outputText}</p>
            {/if}
        </div>
        <div class="bottom">
            {#if vote == undefined}
                <button class="icon" on:click={() => {sendVote(true)}}>
                    <img class="svg-icon" src="thumbs_up.svg" alt="thumbs up">
                </button>
                <button class="icon" on:click={() => {sendVote(false)}}>
                    <img class="svg-icon" src="thumbs_down.svg" alt="thumbs down">
                </button>
            {:else}
                {#if vote}
                    <button class="icon" disabled>
                        <img class="svg-icon" src="thumbs_up_clicked.svg" alt="thumbs up">
                    </button>
                    <button class="icon" disabled>
                        <img class="svg-icon" src="thumbs_down.svg" alt="thumbs down">
                    </button>
                {:else}
                <button class="icon" disabled>
                    <img class="svg-icon" src="thumbs_up.svg" alt="thumbs up">
                </button>
                <button class="icon" disabled>
                    <img class="svg-icon" src="thumbs_down_clicked.svg" alt="thumbs down">
                </button>
                {/if}
            {/if}
            <button class="copy icon" on:click={() => {copyText(outputText); toast.push("Copied Text!")}}>
                <img class="svg-icon" src="copy.svg" alt="copy">
            </button>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        gap: 16px;
        align-self: stretch;
    }

    .textbox {
        width: 100%;

        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        flex: 1 0 0;

        border-radius: 20px;
        background: rgba(255, 255, 255, 0.10);
        box-shadow: 0px 1px 1px -2px rgba(255, 255, 255, 0.30) inset, 0px 24px 30px 0px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(98px);
    }


    /* .output-box {
        align-self: strech;
    } */

    .text-area {
        display: flex;
        height: 120px;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;

        font-size: 24px;
        font-weight: 350;
        letter-spacing: -0.48px;
        color: #FFFFFF;

        background: transparent;
        -webkit-appearance: none;
        -moz-apperarance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
        outline: none;
        padding: 0px;
        resize: none;
        width: 100%;
        overflow: hidden;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        -ms-box-shadow: none;
        -o-box-shadow: none;
        box-shadow: none;

    }

    .close {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 16px;
        top: 16px;
    }

    .placeholder {
        color: rgb(215, 215, 215);
    }

    .icon {
        display: flex;
        height: 36px;
        width: 36px;
        justify-content: center;
        align-items: center;

        border-radius: 20px;
        background: rgba(0, 0, 0, 0.20);
    }

    .copy {
        padding: 0px 10px;
        gap: 4px;
        margin-left: auto;

    }

    .svg-icon {
        width: 17px;
        height: 17px;
    }

    .bottom {
        display: flex;
        align-items: flex-end;
        gap: 16px;
        align-self: stretch;
    }

    .letter-count {
        flex: 1 0 0;
        margin-left: auto;
    }

    .letter-count p {
        color: rgba(255, 255, 255, 0.70);
        text-align: right;
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
    }

    .blank {
        opacity: 0;
    }



    @media (max-width: 800px) {
        main {
            flex-direction: column;
        }

        .textbox {
            flex-direction: row;
        }

        .text-area {
            height: 180px;
        }
    }
</style>
