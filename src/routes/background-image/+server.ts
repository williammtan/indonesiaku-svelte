import { Buffer } from 'buffer';
import { UNSPLASH_CLIENT_ID } from '$env/static/private';

const UNSPLASH_QUERY = "indonesia landscape"
const UNSPLASH_COLLECTION = "k27nlZBhkLI"

export async function GET() {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_CLIENT_ID}&query=${UNSPLASH_QUERY}&orientation=landscape&collections=${UNSPLASH_COLLECTION}`);
    const data = await res.json();
    const image_url = data.urls.full;
    // const image_url = "https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // TODO make into list or something

    const image_res = await fetch(image_url);
    const arrayBuffer = await image_res.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    return new Response(imageBuffer, {
        headers: {
            'Content-Type': 'image/png', // Change this based on the actual image type
            'Content-Length': imageBuffer.length.toString()
        }
    });
}