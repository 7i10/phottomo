"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Mountain, Users, Heart, Camera, ArrowLeft } from "lucide-react"
import Image from "next/image"
import type { CoachingStyle } from "@/app/page"

interface AdviceScreenProps {
  photoData: any
  onBackToHome: () => void
  coachingStyle: CoachingStyle
  onOpenSettings: () => void
}

const getAdviceByStyle = (baseAdvice: string[], style: CoachingStyle): string[] => {
  if (style === "phottomo") {
    return [
      "うん、いい感じだニャ。でも、絞りをf/8くらいにすると、もっと全体がくっきり見えるニャン。",
      "地平線の位置、ちょっと真ん中すぎるかもニャ。上か下に少しずらすと、もっと素敵になる予感がするニャン。",
      "ISOは低めにしておくと、写真がきれいになるニャ。焦らなくていいから、ゆっくり試してみてニャン。",
      "朝や夕方の光は、本当に気持ちいいニャ。その時間に撮ると、写真も喜ぶニャン。",
    ]
  } else if (style === "logical") {
    return [
      "絞りをf/8-f/11に設定し、被写界深度を最大化します。これにより前景から背景まで全体にピントが合い、風景写真の基本原則に従った構図が実現できます。",
      "三分割法を適用し、地平線を画面の上部または下部1/3の位置に配置しましょう。視線誘導の効果が科学的に証明されています。",
      "ISO感度を100-200に設定することで、S/N比を最大化し、画質劣化を最小限に抑えます。",
      "ゴールデンアワー（日の出後・日没前の1時間）に撮影すると、色温度が2000-3000Kとなり、最も印象的な色彩が得られます。",
    ]
  } else if (style === "supportive") {
    return [
      "絞りをf/8くらいにしてみましょう。全体にピントが合って、素敵な風景写真になりますよ。",
      "地平線を少し上か下に配置すると、バランスが良くなります。焦らず、自分の感覚を信じて大丈夫です。",
      "ISOを低めにすると、よりクリアな写真になります。少しずつ試してみてくださいね。",
      "朝や夕方の光は本当に美しいです。その時間帯に撮影すると、きっと素敵な写真が撮れますよ。",
    ]
  } else {
    // spartan
    return [
      "絞りf/8-f/11。全体にピントを合わせろ。基本中の基本だ。",
      "三分割法を使え。地平線の位置を意識しろ。構図が甘い。",
      "ISO100-200に設定しろ。ノイズは許されない。",
      "ゴールデンアワーに撮影しろ。時間帯を選べないなら上達は無理だ。100枚撮って来い。",
    ]
  }
}

const adviceOptions = [
  {
    id: "landscape",
    icon: Mountain,
    title: "風景の美しさを優先",
    description: "自然の壮大さを強調したい場合",
    baseAdvice: [
      "絞りをf/8-f/11に設定して、全体にピントを合わせましょう",
      "三分割法を使って、地平線を画面の1/3の位置に配置すると良いでしょう",
      "ISO感度を下げて（ISO100-200）、ノイズを最小限に抑えましょう",
      "ゴールデンアワー（日の出・日没時）に撮影すると、より印象的な色彩が得られます",
    ],
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  {
    id: "people",
    icon: Users,
    title: "人物を優先",
    description: "被写体の表情や雰囲気を重視",
    baseAdvice: [
      "絞りをf/2.8-f/4に開けて、背景をぼかしましょう",
      "目にピントを合わせることで、より印象的なポートレートになります",
      "自然光を活用し、被写体の横や斜め前から光を当てると立体感が出ます",
      "焦点距離50-85mmが人物撮影に最適です",
    ],
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  },
  {
    id: "emotion",
    icon: Heart,
    title: "感情的な雰囲気",
    description: "ドラマチックで印象的な表現",
    baseAdvice: [
      "シャッタースピードを遅くして（1/30s以下）、動きのブレを表現しましょう",
      "ホワイトバランスを調整して、暖色系（夕焼け）や寒色系（青い時間）の雰囲気を作りましょう",
      "露出を-0.7〜-1.0段下げて、シルエットや影を強調すると効果的です",
      "前景に何かを配置して、奥行きと物語性を加えましょう",
    ],
    color: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  },
]

export function AdviceScreen({ photoData, onBackToHome, coachingStyle, onOpenSettings }: AdviceScreenProps) {
  const [selectedAdvice, setSelectedAdvice] = useState<string | null>(null)

  const selected = adviceOptions.find((opt) => opt.id === selectedAdvice)
  const styledAdvice = selected ? getAdviceByStyle(selected.baseAdvice, coachingStyle) : []

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBackToHome} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            ホームに戻る
          </Button>
          <Badge variant="secondary" className="gap-1">
            <Camera className="h-3 w-3" />
            {photoData?.camera}
          </Badge>
        </div>

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <Image src="/phottomo.jpeg" alt="ふぉっともくん" fill className="object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">AIアドバイス</h1>
          <p className="text-muted-foreground">撮影意図を選択</p>
        </div>

        {photoData && (
          <Card className="overflow-hidden">
            <div className="relative aspect-[3/2] bg-muted">
              <Image src={photoData.image || "/placeholder.svg"} alt="Your photo" fill className="object-cover" />
            </div>
          </Card>
        )}

        {!selectedAdvice ? (
          <div className="grid gap-4 md:grid-cols-3">
            {adviceOptions.map((option) => {
              const Icon = option.icon
              return (
                <Card
                  key={option.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  onClick={() => setSelectedAdvice(option.id)}
                >
                  <div className="p-6 space-y-4">
                    <div className={`inline-flex rounded-lg p-3 ${option.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-3 ${selected?.color}`}>
                    {selected && <selected.icon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selected?.title}</h2>
                    <p className="text-sm text-muted-foreground">{selected?.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAdvice(null)}>
                  変更
                </Button>
              </div>

              <div className="space-y-3">
                {styledAdvice.map((tip, index) => (
                  <div key={index} className="flex gap-3 rounded-lg border bg-card p-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-muted/50">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  現在の設定との比較
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">現在の絞り:</span>
                    <span className="font-medium">{photoData?.settings.aperture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">現在のISO:</span>
                    <span className="font-medium">{photoData?.settings.iso}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">現在のシャッター:</span>
                    <span className="font-medium">{photoData?.settings.shutter}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button onClick={onBackToHome} className="w-full" size="lg">
              新しい写真を撮影する
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
