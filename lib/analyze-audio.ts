// This is a client-side simulation of model inference
// In a real application, you would send the audio to a server API endpoint

export interface IntentAnalysisResult {
  intent: string
  confidence: number
  transcript?: string
  entities?: Array<{ type: string; value: string }>
}

// Simulates sending audio to a server and getting a response
export async function analyzeAudioIntent(audioBlob: Blob): Promise<IntentAnalysisResult> {
  // In a real application, you would:
  // 1. Send the audioBlob to your server API
  // 2. Process it with your PyTorch model (best_cnn_gru_model_2.pt)
  // 3. Return the results

  // For demo purposes, we'll simulate a processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate different intents based on audio duration or size
  const intents = ["question", "statement", "request", "command"]
  const randomIndex = Math.floor(Math.random() * intents.length)

  // Mock response that would come from your model
  return {
    intent: intents[randomIndex],
    confidence: 0.75 + Math.random() * 0.2, // Random confidence between 0.75 and 0.95
    transcript: getRandomTranscript(intents[randomIndex]),
    entities: getRandomEntities(intents[randomIndex]),
  }
}

// Helper functions to generate realistic mock data
function getRandomTranscript(intent: string): string {
  const transcripts: Record<string, string[]> = {
    question: [
      "When is our next team meeting scheduled?",
      "Can you tell me where the conference room is?",
      "What time does the presentation start tomorrow?",
    ],
    statement: [
      "The project will be completed by Friday.",
      "I've finished the report you requested.",
      "The new feature is working as expected.",
    ],
    request: [
      "Please send me the latest version of the document.",
      "I need the quarterly report by tomorrow.",
      "Could you help me with this task?",
    ],
    command: [
      "Schedule a meeting for tomorrow at 2 PM.",
      "Call John from marketing immediately.",
      "Send this email to the entire team.",
    ],
  }

  const options = transcripts[intent] || transcripts.statement
  return options[Math.floor(Math.random() * options.length)]
}

function getRandomEntities(intent: string): Array<{ type: string; value: string }> {
  if (intent === "question") {
    return [{ type: "topic", value: "meeting schedule" }]
  } else if (intent === "request") {
    return [{ type: "document", value: "quarterly report" }]
  } else if (intent === "command") {
    return [
      { type: "action", value: "schedule" },
      { type: "time", value: "2 PM" },
    ]
  }
  return []
}
