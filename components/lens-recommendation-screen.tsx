"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "./app-header"
import { ArrowLeft, Check } from "lucide-react"
import Image from "next/image"

interface LensRecommendationScreenProps {
  surveyAnswers: any
  onBackToHome: () => void
  onOpenSettings: () => void
}

const lensDatabase = {
  "XF16-80mmF4": {
    name: "XF16-80mmF4 R OIS WR",
    price: "¥99,000",
    image: "/fujifilm-x-t5-camera.jpg",
    features: ["標準ズーム", "防塵防滴", "手ブレ補正", "万能"],
    description: "24-122mm相当の万能ズームレンズ",
  },
  "XF18-55mmF2.8-4": {
    name: "XF18-55mmF2.8-4 R LM OIS",
    price: "¥69,000",
    image: "/fujifilm-x-s20-camera.jpg",
    features: ["標準ズーム", "軽量", "手ブレ補正", "コスパ"],
    description: "27-84mm相当の軽量標準ズーム",
  },
  "XF56mmF1.2": {
    name: "XF56mmF1.2 R WR",
    price: "¥129,000",
    image: "/fujifilm-x-h2s-camera.jpg",
    features: ["単焦点", "F1.2", "ポートレート", "高画質"],
    description: "85mm相当の明るい中望遠単焦点",
  },
  "XF70-300mmF4-5.6": {
    name: "XF70-300mmF4-5.6 R LM OIS WR",
    price: "¥99,000",
    image: "/fujifilm-x-e4-camera.jpg",
    features: ["望遠ズーム", "防塵防滴", "手ブレ補正", "スポーツ"],
    description: "107-457mm相当の望遠ズーム",
  },
  "XF16mmF1.4": {
    name: "XF16mmF1.4 R WR",
    price: "¥119,000",
    image: "/fujifilm-x-t5-camera.jpg",
    features: ["広角単焦点", "F1.4", "風景", "星空"],
    description: "24mm相当の明るい広角単焦点",
  },
}

function getRecommendedLens(answers: any) {
  const { subject, focal_length, aperture, budget } = answers

  if (subject === "landscape" && focal_length === "wide") {
    return "XF16mmF1.4"
  }
  if (subject === "portrait" && aperture === "bright") {
    return "XF56mmF1.2"
  }
  if (subject === "sports" || focal_length === "telephoto") {
    return "XF70-300mmF4-5.6"
  }
  if (subject === "versatile" || focal_length === "zoom") {
    if (budget === "entry" || budget === "mid") {
      return "XF18-55mmF2.8-4"
    }
    return "XF16-80mmF4"
  }

  return "XF18-55mmF2.8-4"
}

function getAlternativeLenses(recommended: string, answers: any) {
  const alternatives = Object.keys(lensDatabase).filter((key) => key !== recommended)
  return alternatives.slice(0, 2)
}

export function LensRecommendationScreen({
  surveyAnswers,
  onBackToHome,
  onOpenSettings,
}: LensRecommendationScreenProps) {
  const recommendedLensKey = getRecommendedLens(surveyAnswers)
  const recommendedLens = lensDatabase[recommendedLensKey as keyof typeof lensDatabase]
  const alternativeLensKeys = getAlternativeLenses(recommendedLensKey, surveyAnswers)

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onOpenSettings={onOpenSettings} />

      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBackToHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">診断結果</h1>
          </div>

          <div className="text-center space-y-2">
            <Badge variant="secondary" className="mb-2">
              おすすめレンズ
            </Badge>
            <h2 className="text-3xl font-bold text-balance">あなたにぴったりのレンズ</h2>
          </div>

          <Card className="p-6 space-y-6 border-primary">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={recommendedLens.image || "/placeholder.svg"}
                alt={recommendedLens.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{recommendedLens.name}</h3>
                <p className="text-3xl font-bold text-primary mt-2">{recommendedLens.price}</p>
              </div>

              <p className="text-muted-foreground">{recommendedLens.description}</p>

              <div className="flex flex-wrap gap-2">
                {recommendedLens.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    <Check className="h-3 w-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">他の候補</h3>
            {alternativeLensKeys.map((lensKey) => {
              const lens = lensDatabase[lensKey as keyof typeof lensDatabase]
              return (
                <Card key={lensKey} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={lens.image || "/placeholder.svg"} alt={lens.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold">{lens.name}</h4>
                        <p className="text-lg font-bold text-primary">{lens.price}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{lens.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Button onClick={onBackToHome} className="w-full" size="lg">
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
