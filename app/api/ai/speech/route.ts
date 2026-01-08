import * as googleTTS from "google-tts-api";

export async function POST(req: Request) {
  const { text } = await req.json();
  
  // Get audio as Base64 string (Max 200 chars for free Google TTS)
  const base64Audio = await googleTTS.getAudioBase64(text.substring(0, 200), {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  return Response.json({ audio: `data:audio/mp3;base64,${base64Audio}` });
}
