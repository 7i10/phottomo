"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppHeader } from "./app-header"
import { ArrowLeft, Camera, Mountain, Users, Zap, Video, Sparkles, Aperture, Focus, Gauge, Film } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SurveyScreenProps {
  onComplete: (answers: any) => void
  onBack: () => void
  onOpenSettings: () => void
}

const experienceQuestion = {
  id: "experience",
  question: "写真撮影の経験は？",
  icon: Camera,
  options: [
    { value: "beginner", label: "初級者", description: "カメラを始めたばかり" },
    { value: "intermediate", label: "中級者", description: "基本操作は理解している" },
    { value: "advanced", label: "上級者", description: "マニュアル撮影も使いこなせる" },
  ],
}

const beginnerQuestions = [
  {
    id: "subject",
    question: "主に何を撮影したいですか？",
    icon: Camera,
    options: [
      { value: "landscape", label: "風景・自然", icon: Mountain },
      { value: "portrait", label: "人物・ポートレート", icon: Users },
      { value: "street", label: "スナップ・街撮り", icon: Sparkles },
      { value: "sports", label: "スポーツ・動物", icon: Zap },
      { value: "video", label: "動画撮影", icon: Video },
    ],
  },
  {
    id: "priority",
    question: "重視する機能は？",
    icon: Camera,
    options: [
      { value: "quality", label: "画質", description: "高解像度・高画質" },
      { value: "portability", label: "携帯性", description: "軽量・コンパクト" },
      { value: "ease", label: "使いやすさ", description: "オート機能充実" },
    ],
  },
  {
    id: "budget",
    question: "予算はどのくらいですか？",
    icon: Camera,
    options: [
      { value: "mid", label: "10〜20万円", description: "ミドルレンジ" },
      { value: "high", label: "20万円以上", description: "ハイエンドモデル" },
    ],
  },
]

const intermediateQuestions = [
  {
    id: "shooting_style",
    question: "撮影スタイルは？",
    icon: Camera,
    options: [
      { value: "planned", label: "計画的な撮影", description: "三脚使用、じっくり構図を決める" },
      { value: "spontaneous", label: "スナップ撮影", description: "機動性重視、瞬間を捉える" },
      { value: "studio", label: "スタジオ撮影", description: "ライティング、ポートレート中心" },
      { value: "outdoor", label: "アウトドア撮影", description: "風景、旅行、自然" },
    ],
  },
  {
    id: "lens_preference",
    question: "よく使うレンズは？",
    icon: Aperture,
    options: [
      { value: "wide", label: "広角レンズ", description: "風景、建築" },
      { value: "standard", label: "標準レンズ", description: "万能、日常" },
      { value: "telephoto", label: "望遠レンズ", description: "スポーツ、野生動物" },
      { value: "prime", label: "単焦点レンズ", description: "ボケ、ポートレート" },
    ],
  },
  {
    id: "balance",
    question: "画質と機動性のバランスは？",
    icon: Gauge,
    options: [
      { value: "quality_first", label: "画質優先", description: "重くても高画質" },
      { value: "balanced", label: "バランス重視", description: "両立したい" },
      { value: "mobility_first", label: "機動性優先", description: "軽量・コンパクト" },
    ],
  },
  {
    id: "budget",
    question: "予算はどのくらいですか？",
    icon: Camera,
    options: [
      { value: "mid", label: "10〜20万円", description: "ミドルレンジ" },
      { value: "high", label: "20〜30万円", description: "ハイエンド" },
      { value: "pro", label: "30万円以上", description: "プロ機材" },
    ],
  },
]

const advancedQuestions = [
  {
    id: "sensor_preference",
    question: "センサーサイズの優先度は？",
    icon: Aperture,
    options: [
      { value: "aps_c", label: "APS-C", description: "軽量性と画質のバランス" },
      { value: "full_frame", label: "フルサイズ", description: "最高画質、ボケ表現" },
      { value: "flexible", label: "こだわらない", description: "用途に応じて選択" },
    ],
  },
  {
    id: "af_performance",
    question: "AF性能の要求は？",
    icon: Focus,
    options: [
      { value: "basic", label: "基本性能", description: "静止物中心" },
      { value: "tracking", label: "追従性能", description: "動体撮影、顔・瞳AF" },
      { value: "pro", label: "プロ性能", description: "高速連写、被写体認識AI" },
    ],
  },
  {
    id: "video_spec",
    question: "動画仕様の要求は？",
    icon: Video,
    options: [
      { value: "basic", label: "基本的な動画", description: "4K/30p程度" },
      { value: "advanced", label: "高度な動画", description: "4K/60p、10bit" },
      { value: "cinema", label: "シネマ品質", description: "6K、RAW、Log撮影" },
      { value: "not_needed", label: "不要", description: "写真のみ" },
    ],
  },
  {
    id: "pro_features",
    question: "必要なプロ機能は？",
    icon: Film,
    options: [
      { value: "weather_sealing", label: "防塵防滴", description: "過酷な環境での撮影" },
      { value: "dual_card", label: "デュアルカードスロット", description: "データ保護" },
      { value: "high_fps", label: "高速連写", description: "20fps以上" },
      { value: "all", label: "すべて", description: "プロ仕様" },
    ],
  },
  {
    id: "budget",
    question: "予算はどのくらいですか？",
    icon: Camera,
    options: [
      { value: "high", label: "20〜30万円", description: "ハイエンド" },
      { value: "pro", label: "30〜50万円", description: "プロ機材" },
      { value: "unlimited", label: "50万円以上", description: "最高峰" },
    ],
  },
]

export function SurveyScreen({ onComplete, onBack, onOpenSettings }: SurveyScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null)

  const getQuestions = () => {
    if (!experienceLevel) return [experienceQuestion]

    switch (experienceLevel) {
      case "beginner":
        return [experienceQuestion, ...beginnerQuestions]
      case "intermediate":
        return [experienceQuestion, ...intermediateQuestions]
      case "advanced":
        return [experienceQuestion, ...advancedQuestions]
      default:
        return [experienceQuestion, ...beginnerQuestions]
    }
  }

  const questions = getQuestions()

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (questions[currentQuestion].id === "experience") {
      setExperienceLevel(value)
      setCurrentQuestion(1)
      return
    }

    const totalQuestions =
      experienceLevel === "beginner"
        ? beginnerQuestions.length + 1
        : experienceLevel === "intermediate"
          ? intermediateQuestions.length + 1
          : advancedQuestions.length + 1

    if (currentQuestion < totalQuestions - 1) {
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

  const question = questions[currentQuestion]
  const Icon = question.icon

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onOpenSettings={onOpenSettings} />

      {/* Added pt-24 and removed duplicate settings button */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex gap-1">
                {questions.map((_, index) => (
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
              質問 {currentQuestion + 1} / {questions.length}
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
