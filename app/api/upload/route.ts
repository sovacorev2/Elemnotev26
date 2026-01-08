import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    // Extract text from file
    const text = await file.text()

    // AI Processing: Extract concepts and analyze
    const analysis = await analyzeContent(text, subject)

    // Return document with analysis
    return NextResponse.json({
      success: true,
      document: {
        id: nanoid(),
        title: title || file.name,
        subject: subject || "General",
        file_url: blob.url,
        file_type: file.type,
        file_size: file.size,
        content: text,
        analysis,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 })
  }
}

async function analyzeContent(content: string, subject: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert exam preparation assistant. Analyze the provided study material and return a JSON object with:
1. keyTopics: array of main topics/concepts
2. keyConceptsExplained: object with concept as key and simplified explanation as value
3. examFocusAreas: array of topics likely to appear in exams (with confidence score)
4. summary: comprehensive but concise summary
5. quickSummary: ultra-short bullet point summary
6. potentialQuestions: array of 5 likely exam questions`,
          },
          {
            role: "user",
            content: `Subject: ${subject}\n\nContent:\n${content}`,
          },
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    try {
      return JSON.parse(data.choices[0].message.content)
    } catch {
      return null
    }
  } catch (error) {
    console.error("[v0] Analysis error:", error)
    return null
  }
}
