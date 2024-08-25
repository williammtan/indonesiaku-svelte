<script lang="ts">
    import { shuffle } from "$lib/utils";
    import { createEventDispatcher } from 'svelte';
    import type { Language } from "$lib/utils";

	const dispatch = createEventDispatcher();

    let innerHeight = 0;
    let innerWidth = 0;
    
    $: isMobile = innerWidth <= 800;
    

    export const showChips = 3;
    const languages = [
        {
            name: "English",
            code: "en",
            nllb_code: "eng_Latn"
        },
        {
            name: "Indonesian",
            code: "id",
            nllb_code: "ind_Latn"
        },
        {
            name: "Balinese",
            code: "ban",
            nllb_code: "ban_Latn"
        },
        // {
        //     name: "Jawa",
        //     code: "jv"
        // },
        // {
        //     name: "Sunda",
        //     code: "su"
        // },
    ] // TODO: make to separate central file later
    
    function getRandomLanguages(exclude_language: Language | undefined): Language[] {
        let languages_copy = shuffle(languages.filter(({code}) => {
            if (exclude_language !== undefined) {
                return code != exclude_language.code;
            } else {
                return true;
            }
        }));
        return languages_copy.slice(0,showChips);

    }
    
    let sourceIdx = 0;
    let targetIdx = 2;
    
    // let sourceLanguages = getRandomLanguages(undefined);
    // let targetLanguages = getRandomLanguages(undefined);
    let sourceLanguages = languages;
    let targetLanguages = languages;

    export let sourceLanguage;
    export let targetLanguage;

    $: {
        sourceLanguage = sourceLanguages[sourceIdx];
        targetLanguage = targetLanguages[targetIdx];
        dispatch('translate', {});
    }
    
    let changed: String; // Useless rn

    function swapLanguages() {
        // find corresponding indices and swap, (TODO: else adds it)
        let targetIdx_temp = targetLanguages.findIndex(lang => lang.code == sourceLanguages[sourceIdx].code);
        sourceIdx = sourceLanguages.findIndex(lang => lang.code == targetLanguages[targetIdx].code);
        targetIdx = targetIdx_temp;

        // update translation
        sourceLanguage = sourceLanguages[sourceIdx];
        targetLanguage = targetLanguages[targetIdx];
        dispatch('swap', {})
        dispatch('translate', {});
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main>
    <div class="left">
        {#if !isMobile}
            {#each sourceLanguages as lang, idx}
                {#if idx == sourceIdx}
                    <button class="chip chip-selected">
                        {lang.name}
                    </button>
                {:else}
                    <button class="chip chip-unselected" on:click={() => {sourceIdx = idx; changed = "src"}}>
                        {lang.name}
                    </button>
                {/if}
            {/each}
        {:else}
            <select class="chip" bind:value={sourceIdx}>
                {#each sourceLanguages as lang, idx}
                    {#if idx == sourceIdx}
                        <option value={idx} selected>
                            {lang.name}
                        </option>
                    {:else}
                    <option value={idx}>
                        {lang.name}
                    </option>
                    {/if}
                {/each}
            </select>
        <!-- <button class="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </button> -->
        {/if}
    </div>
    <button on:click={swapLanguages}>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 15H1M1 15L5 11M1 15L5 19M1 5H17M17 5L13 1M17 5L13 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    <div class="right">
        {#if !isMobile}
            {#each targetLanguages as lang, idx}
                {#if idx == targetIdx}
                    <button class="chip chip-selected">
                        {lang.name}
                    </button>
                {:else}
                    <button class="chip chip-unselected" on:click={() => {targetIdx = idx; changed = "tgt"}}>
                        {lang.name}
                    </button>
                {/if}
            {/each}
        {:else}
            <select class="chip" bind:value={targetIdx}>
            {#each sourceLanguages as lang, idx}
                {#if idx == targetIdx}
                    <option value={idx} selected>
                        {lang.name}
                    </option>
                {:else}
                    <option value={idx}>
                        {lang.name}
                    </option>
                {/if}
            {/each}
            </select>
        <!-- <button class="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </button> -->
        {/if}
    </div>
</main>


<style>
    main {
        display: flex;
        height: 66px;
        padding: 0px 12px;
        align-items: center;
        gap: 24px;
        align-self: stretch;

        border-radius: 40px;
        background: rgba(255, 255, 255, 0.10);
        box-shadow: 0px 1px 1px -2px rgba(255, 255, 255, 0.30) inset, 0px 24px 30px 0px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(5px);
    }

    .chip {
        font-size: 14px;
        font-weight: 550;
        line-height: 16.94px;
        letter-spacing: -0.02em;
        text-align: left;
        color: #FFFFFF;
        
        display: flex;
        height: 40px;
        padding: 10px 20px;
        align-items: center;
        gap: 16px;
        border-radius: 20px;

        background: None;

    }

    .chip-unselected:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .chip-selected {
        background: rgba(255, 255, 255, 0.20);
    }


    .left, .right {
        display: flex;
        align-items: center;
        flex: 1 0 0;
    }

    /* .dropdown {
        width: 24px;
        height: 24px;
    } */
</style>