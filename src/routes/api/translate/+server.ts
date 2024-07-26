import { json } from '@sveltejs/kit'
import { VLLM_ENDPOINT, VLLM_MODEL_NAME, VLLM_API_KEY } from '$env/static/private';

export async function POST({ request }) {
    const { sourceLanguage, targetLanguage, text } = await request.json()

	if (!sourceLanguage || !targetLanguage || !text) {
        return json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    const prompt = `Translate this from ${sourceLanguage.name} to ${targetLanguage.name}:\n${sourceLanguage.name}: ${text}\n${targetLanguage.name}:`
    let res = await fetch(VLLM_ENDPOINT + "/v1/completions",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${VLLM_API_KEY}`,
                'bypass-tunnel-reminder': "xxx",
                'ngrok-skip-browser-warning': "xxx"
            },
            body: JSON.stringify({
                model: VLLM_MODEL_NAME,
                prompt,
                max_tokens: 256,
                temperature: 0,
                // top_k: 2
            })
        }
    )
    let body = await res.json();
    let translatedText = body.choices[0].text;
    

	return json({
        sourceLanguage,
        targetLanguage,
        text,
        translatedText
    })
}