<script lang="ts">
    import LangSelect from "./LangSelect.svelte";
    import TextInput from "./TextInput.svelte";
    import type { Language } from "$lib/utils";

    let sourceLanguage: Language;
    let targetLanguage: Language;
    let inputText = "";
    let outputText = "";

    async function translate(event: CustomEvent<{done: Function}>) {
        let res = await fetch('/api/translate',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    sourceLanguage: sourceLanguage,
                    targetLanguage: targetLanguage,
                    text: inputText
                })
            }
        )
        let body = await res.json();
        if (event.detail.done != undefined) {event.detail.done()};
        outputText = body.translatedText;
    }

    async function vote(event: CustomEvent<{quality: boolean}>) {
        let res = await fetch('/api/feedback',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    sourceLanguage: sourceLanguage,
                    targetLanguage: targetLanguage,
                    inputText: inputText,
                    outputText: outputText,
                    quality: event.detail.quality
                })
            })
    }

    function swap() {
        inputText = outputText;
        outputText = "";
    }
</script>
    
<section>
    <div class="container">
        <LangSelect on:swap={swap} on:translate={translate} bind:sourceLanguage={sourceLanguage} bind:targetLanguage={targetLanguage} />
    </div>
    <div class="container">
        <TextInput on:vote={vote} on:translate={translate} bind:inputText={inputText} bind:outputText={outputText}/>
    </div>
</section>

<footer>
    <div class="footer-content">
        Preserving Indonesian Culture © 2024 indonesiaku.com
    </div>
</footer>

<style>
    .container {
        display: flex;
        max-width: 1280px;
        padding: 0px 20px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        flex: 1 0 0;
        align-self: stretch;
        height: 75vh;
    }

    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        align-self: stretch;
    }

    .footer-content {
        display: flex;
        height: 80px;
        max-width: 1280px;
        padding: 0px 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: stretch;

        font-size: 12px;
        font-weight: 400;
        line-height: normal;
        color: white;
    }
</style>