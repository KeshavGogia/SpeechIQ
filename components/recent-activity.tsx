"use client"

import { useState } from "react"
import { Calendar, Clock, HelpCircle, MessageSquare, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityItem {
  id: string
  timestamp: string
  transcript: string
  intent: "question" | "statement" | "request"
  confidence: number
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    timestamp: "2023-05-07T14:30:00Z",
    transcript: "Can you schedule a meeting with the design team for tomorrow?",
    intent: "question",
    confidence: 0.92,
  },
  {
    id: "2",
    timestamp: "2023-05-07T13:15:00Z",
    transcript: "I need the quarterly report by Friday.",
    intent: "request",
    confidence: 0.88,
  },
  {
    id: "3",
    timestamp: "2023-05-07T11:45:00Z",
    transcript: "The new feature will be released next week.",
    intent: "statement",
    confidence: 0.95,
  },
]

export function RecentActivity() {
  const [activities] = useState<ActivityItem[]>(mockActivities)

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case "question":
        return <HelpCircle className="h-4 w-4 text-blue-500" />
      case "statement":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "request":
        return <ThumbsUp className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent audio analysis history</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="mt-0.5">{getIntentIcon(activity.intent)}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.transcript}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatDate(activity.timestamp)}
                  </span>
                  <span className="flex items-center text-xs text-muted-foreground">Intent: {activity.intent}</span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    Confidence: {Math.round(activity.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
