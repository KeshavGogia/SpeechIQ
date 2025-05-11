"use client"

import { useEffect, useState } from "react"
import { AlertCircle, Check, HelpCircle, MessageSquare, ThumbsUp, AlertTriangle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Intent = "question" | "statement" | "request" | "command" | "error" | null
type Entity = { type: string; value: string }

interface IntentData {
  intent: Intent
  confidence: number
  entities: Entity[]
  transcript: string
}

export function IntentDisplay() {
  const [intentData, setIntentData] = useState<IntentData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const handleIntentRecognized = (event: CustomEvent<IntentData>) => {
      setIsAnalyzing(true)

      // Simulate processing time
      setTimeout(() => {
        setIntentData(event.detail)
        setIsAnalyzing(false)
      }, 1000)
    }

    window.addEventListener("intentRecognized", handleIntentRecognized as EventListener)

    return () => {
      window.removeEventListener("intentRecognized", handleIntentRecognized as EventListener)
    }
  }, [])

  const getIntentIcon = (intent: Intent) => {
    switch (intent) {
      case "question":
        return <HelpCircle className="h-6 w-6 text-blue-500" />
      case "statement":
        return <MessageSquare className="h-6 w-6 text-green-500" />
      case "request":
        return <ThumbsUp className="h-6 w-6 text-purple-500" />
      case "command":
        return <AlertCircle className="h-6 w-6 text-orange-500" />
      case "error":
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  const getIntentColor = (intent: Intent) => {
    switch (intent) {
      case "question":
        return "text-blue-500"
      case "statement":
        return "text-green-500"
      case "request":
        return "text-purple-500"
      case "command":
        return "text-orange-500"
      case "error":
        return "text-red-500"
      default:
        return ""
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Intent Analysis</CardTitle>
        <CardDescription>Recognized speaker intent from 3-second audio</CardDescription>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="space-y-4 py-8">
            <div className="flex justify-center">
              <div className="animate-pulse h-12 w-12 rounded-full bg-muted"></div>
            </div>
            <Progress value={45} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">Analyzing audio...</p>
          </div>
        ) : intentData ? (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-muted p-2">{getIntentIcon(intentData.intent)}</div>
              <div className="space-y-1">
                <h3 className={`font-medium ${getIntentColor(intentData.intent)}`}>
                  {intentData.intent === "error"
                    ? "Error"
                    : intentData.intent?.charAt(0).toUpperCase() + intentData.intent?.slice(1)}
                </h3>
                {intentData.intent !== "error" && (
                  <p className="text-sm text-muted-foreground">
                    Confidence: {Math.round(intentData.confidence * 100)}%
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Transcript</h4>
              <div className="rounded-md bg-muted p-3 text-sm">{intentData.transcript}</div>
            </div>

            {intentData.entities.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recognized Entities</h4>
                <div className="space-y-2">
                  {intentData.entities.map((entity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{entity.type}:</span>
                      <span>{entity.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No Analysis Yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Record for 3 seconds or upload audio and click &quot;Analyze Audio&quot; to see the speaker&apos;s intent
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
