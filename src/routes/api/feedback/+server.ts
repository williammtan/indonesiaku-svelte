import { json } from '@sveltejs/kit'
import { db } from '$lib/firebase.js';
import { collection, addDoc } from "firebase/firestore"; 

export async function POST({ request }) {
    const { sourceLanguage, targetLanguage, inputText, outputText, quality } = await request.json()

	if (!sourceLanguage || !targetLanguage || !inputText || !outputText || quality == undefined) {
        return json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    try {
        await db.collection("feedbacks").add({
            "inputLanguage": sourceLanguage.code,
            "outputLanguage": targetLanguage.code,
            "inputText": inputText,
            "outputText": outputText,
            "quality": quality,
            "timestamp": new Date()
        })
    } catch (e) {
        return json({error: 'Server error'}, {status: 500});
    }

    return json({success: true}, {status: 201})



}

/* 
userId: userId,
translationId: translationId,
feedbackType: feedbackType,
comments: comments,
timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
*/