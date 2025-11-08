"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, GraduationCap, Heart, Zap } from "lucide-react"
import Image from "next/image"
import type { CoachingStyle } from "@/app/page"

interface SettingsScreenProps {
  coachingStyle: CoachingStyle
  onCoachingStyleChange: (style: CoachingStyle) => void
  onClose: () => void
}

const coachingStyles = [
  {
    id: "phottomo" as CoachingStyle,
    icon: null,
    name: "ふぉっとも君",
    description: "のんびりマイペース、優しい口調",
    example: "うん、これも素敵だニャ。でも、もうちょっとだけ右側から撮ったら、もっと素敵になる予感がするニャン。",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    hasImage: true,
  },
  {
    id: "logical" as CoachingStyle,
    icon: GraduationCap,
    name: "ロジカル博士",
    description: "科学的・論理的に解説",
    example:
      "F値を2.8に設定し、被写界深度を浅くしましょう。それにより、背景から被写体を光学的に分離させ、主題を明確化できます。",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    hasImage: false,
  },
  {
    id: "supportive" as CoachingStyle,
    icon: Heart,
    name: "寄り添いカウンセラー",
    description: "優しく、褒めて伸ばす",
    example: "焦らなくて大丈夫ですよ。まずはシャッターを切ることから楽しみましょう。",
    color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    hasImage: false,
  },
  {
    id: "spartan" as CoachingStyle,
    icon: Zap,
    name: "スパルタ鬼軍曹",
    description: "厳しく、最短で上達",
    example: "言い訳は不要。課題を100枚撮れ。量が質を生む。",
    color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    hasImage: false,
  },
]

export function SettingsScreen({ coachingStyle, onCoachingStyleChange, onClose }: SettingsScreenProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">設定</h1>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">コーチングスタイル</h2>
            <p className="text-sm text-muted-foreground">AIアドバイスの話し方を選択</p>
          </div>

          <div className="space-y-3">
            {coachingStyles.map((style) => {
              const Icon = style.icon
              const isSelected = coachingStyle === style.id

              return (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? `${style.color} border-2` : ""
                  }`}
                  onClick={() => onCoachingStyleChange(style.id)}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-3 ${style.color}`}>
                        {style.hasImage ? (
                          <div className="relative w-12 h-12">
                            <Image src="/phottomo.jpeg" alt="ふぉっともくん" fill className="object-contain" />
                          </div>
                        ) : (
                          Icon && <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{style.name}</h3>
                          {isSelected && (
                            <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                              選択中
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4 border-l-4 border-primary/50">
                      <p className="text-sm italic leading-relaxed">{style.example}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <Button onClick={onClose} className="w-full" size="lg">
          完了
        </Button>
      </div>
    </div>
  )
}
