"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppHeader } from "./app-header"
import { ArrowLeft, Camera, Mountain, Users, Zap, Flower2, Aperture, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LensSurveyScreenProps {
  onComplete: (answers: any) => void
  onBack: () => void
  onOpenSettings: () => void
}

const lensQuestions = [
  {
    id: "subject",
    question: "主に何を撮影しますか？",
    icon: Camera,
    options: [
      { value: "landscape", label: "風景・建築", icon: Mountain, description: "広い範囲を撮影" },
      { value: "portrait", label: "人物", icon: Users, description: "ポートレート、スナップ" },
      { value: "sports", label: "スポーツ・動物", icon: Zap, description: "遠くの被写体" },
      { value: "macro", label: "マクロ・接写", icon: Flower2, description: "花、小物" },
      { value: "versatile", label: "万能", icon: Camera, description: "いろいろ撮りたい" },
    ],
  },
  {
    id: "focal_length",
    question: "焦点距離の好みは？",
    icon: Aperture,
    options: [
      { value: "wide", label: "広角（16-35mm）", description: "広い範囲、ダイナミック" },
      { value: "standard", label: "標準（35-70mm）", description: "自然な画角" },
      { value: "telephoto", label: "望遠（70mm以上）", description: "遠くを大きく" },
      { value: "zoom", label: "ズームレンズ", description: "幅広い焦点距離" },
      { value: "prime", label: "単焦点", description: "明るく高画質" },
    ],
  },
  {
    id: "aperture",
    question: "明るさ（F値）の重要度は？",
    icon: Aperture,
    options: [
      { value: "bright", label: "明るいレンズ必須", description: "F1.4-F2.8、ボケ重視" },
      { value: "moderate", label: "ある程度明るい", description: "F2.8-F4" },
      { value: "not_priority", label: "こだわらない", description: "F4以上でもOK" },
    ],
  },
  {
    id: "budget",
    question: "予算はどのくらいですか？",
    icon: DollarSign,
    options: [
      { value: "entry", label: "5万円以下", description: "エントリーレンズ" },
      { value: "mid", label: "5〜10万円", description: "ミドルレンジ" },
      { value: "high", label: "10〜20万円", description: "ハイエンド" },
      { value: "pro", label: "20万円以上", description: "プロレンズ" },
    ],
  },
]

export function LensSurveyScreen({ onComplete, onBack, onOpenSettings }: LensSurveyScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [lensQuestions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < lensQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      onBack()
    }
  }

  const question = lensQuestions[currentQuestion]
  const Icon = question.icon

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onOpenSettings={onOpenSettings} />

      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex gap-1">
                {lensQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      index <= currentQuestion ? "bg-primary" : "bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative w-24 h-24">
                <Image src="/phottomo.jpeg" alt="ふぉっともくん" fill className="object-contain" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-balance">{question.question}</h2>
            <p className="text-sm text-muted-foreground">
              質問 {currentQuestion + 1} / {lensQuestions.length}
            </p>
          </div>

          <div className="grid gap-3">
            {question.options.map((option) => {
              const OptionIcon = "icon" in option ? option.icon : null
              return (
                <Card
                  key={option.value}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:border-primary hover:shadow-md",
                    answers[question.id] === option.value && "border-primary bg-primary/5",
                  )}
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="flex items-center gap-4">
                    {OptionIcon && (
                      <div className="rounded-lg bg-primary/10 p-3">
                        <OptionIcon className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{option.label}</p>
                      {"description" in option && <p className="text-sm text-muted-foreground">{option.description}</p>}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
