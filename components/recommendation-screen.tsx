"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "./app-header"
import { Camera, Check, ArrowRight, Star } from "lucide-react"

interface RecommendationScreenProps {
  surveyAnswers: any
  onBackToHome: () => void
  onOpenSettings: () => void
}

const cameras = {
  "X-T5": {
    name: "FUJIFILM X-T5",
    price: "¥269,500",
    image: "/fujifilm-x-t5-camera.jpg",
    description: "40.2MPの高解像度センサーを搭載したフラッグシップモデル",
    features: ["40.2MP X-Trans CMOS 5 HR", "5軸手ぶれ補正", "クラシックなダイヤル操作"],
    bestFor: ["landscape", "portrait"],
    level: ["intermediate", "advanced"],
    budget: ["high"],
  },
  "X-S20": {
    name: "FUJIFILM X-S20",
    price: "¥189,200",
    image: "/fujifilm-x-s20-camera.jpg",
    description: "動画撮影に最適な軽量コンパクトモデル",
    features: ["6.2K/30p動画", "Vlog Mode", "軽量465g"],
    bestFor: ["video", "street"],
    level: ["beginner", "intermediate"],
    budget: ["mid"],
  },
  "X-H2S": {
    name: "FUJIFILM X-H2S",
    price: "¥329,780",
    image: "/fujifilm-x-h2s-camera.jpg",
    description: "高速連写とAF性能を誇るスポーツ撮影向けモデル",
    features: ["40fps連写", "AI被写体検出AF", "6.2K/30p動画"],
    bestFor: ["sports", "video"],
    level: ["advanced"],
    budget: ["high"],
  },
  "X-E4": {
    name: "FUJIFILM X-E4",
    price: "¥119,900",
    image: "/fujifilm-x-e4-camera.jpg",
    description: "スナップ撮影に最適な軽量コンパクトモデル",
    features: ["26.1MP X-Trans CMOS 4", "軽量364g", "クラシックデザイン"],
    bestFor: ["street", "portrait"],
    level: ["beginner", "intermediate"],
    budget: ["entry", "mid"],
  },
}

function getRecommendedCamera(answers: any): string {
  const { subject, experience, priority, budget } = answers

  // Simple recommendation logic
  if (subject === "sports" || priority === "speed") return "X-H2S"
  if (subject === "video" || priority === "video") return "X-S20"
  if (subject === "landscape" && budget === "high") return "X-T5"
  if (budget === "entry" || priority === "portability") return "X-E4"
  if (experience === "advanced") return "X-T5"

  return "X-S20" // Default recommendation
}

function getAlternatives(recommended: string): string[] {
  const all = Object.keys(cameras)
  return all.filter((key) => key !== recommended).slice(0, 2)
}

export function RecommendationScreen({ surveyAnswers, onBackToHome, onOpenSettings }: RecommendationScreenProps) {
  const recommendedKey = getRecommendedCamera(surveyAnswers)
  const recommended = cameras[recommendedKey as keyof typeof cameras]
  const alternativeKeys = getAlternatives(recommendedKey)

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onOpenSettings={onOpenSettings} />

      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Star className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-balance">おすすめのカメラ</h1>
            <p className="text-lg text-muted-foreground text-pretty">診断結果から最適なモデルを提案</p>
          </div>

          <Card className="p-8 border-primary/50 shadow-lg">
            <div className="flex items-start gap-2 mb-4">
              <Badge className="bg-primary">おすすめ</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src={recommended.image || "/placeholder.svg"}
                  alt={recommended.name}
                  className="w-full rounded-lg object-cover aspect-[4/3]"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{recommended.name}</h2>
                  <p className="text-2xl font-semibold text-primary mb-4">{recommended.price}</p>
                  <p className="text-muted-foreground">{recommended.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-sm">主な特徴</p>
                  <div className="space-y-2">
                    {recommended.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">他のおすすめモデル</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {alternativeKeys.map((key) => {
                const camera = cameras[key as keyof typeof cameras]
                return (
                  <Card key={key} className="p-6 hover:border-primary transition-colors cursor-pointer">
                    <div className="space-y-4">
                      <img
                        src={camera.image || "/placeholder.svg"}
                        alt={camera.name}
                        className="w-full rounded-lg object-cover aspect-[4/3]"
                      />
                      <div>
                        <h4 className="font-bold text-lg mb-1">{camera.name}</h4>
                        <p className="text-lg font-semibold text-primary mb-2">{camera.price}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{camera.description}</p>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        詳細を見る
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={onBackToHome} size="lg">
              <Camera className="mr-2 h-4 w-4" />
              ホームに戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
