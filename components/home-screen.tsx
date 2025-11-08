"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bluetooth, ShoppingBag, Aperture } from "lucide-react"
import Image from "next/image"
import { AppHeader } from "./app-header"

interface HomeScreenProps {
  onConnect: () => void
  onStartSurvey: () => void
  onStartLensSurvey: () => void
  onOpenSettings: () => void
}

export function HomeScreen({ onConnect, onStartSurvey, onStartLensSurvey, onOpenSettings }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onOpenSettings={onOpenSettings} />

      {/* Added pt-24 to account for fixed header */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <Image src="/phottomo.jpeg" alt="ふぉっともくん" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">ふぉっとも</h1>
            <p className="text-lg text-muted-foreground text-pretty">AIコーチングで写真が上達</p>
          </div>

          <Card className="p-6 space-y-4 border-primary/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">カメラを探す</h2>
              </div>
              <p className="text-sm text-muted-foreground">あなたに最適なFUJIFILMカメラを提案</p>
            </div>

            <Button onClick={onStartSurvey} className="w-full" size="lg" variant="default">
              カメラ診断を始める
            </Button>
          </Card>

          <Card className="p-6 space-y-4 border-primary/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Aperture className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">レンズを探す</h2>
              </div>
              <p className="text-sm text-muted-foreground">撮影スタイルに合ったレンズを提案</p>
            </div>

            <Button onClick={onStartLensSurvey} className="w-full" size="lg" variant="default">
              レンズ診断を始める
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="/phottomo.jpeg" alt="ふぉっともくん" fill className="object-contain" />
                </div>
                <h2 className="text-xl font-semibold">カメラを接続</h2>
              </div>
              <p className="text-sm text-muted-foreground">カメラと接続して撮影データとアドバイスを受信</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Bluetooth className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Bluetooth接続</p>
                  <p className="text-xs text-muted-foreground">カメラの電源を入れてください</p>
                </div>
              </div>

              <Button onClick={onConnect} className="w-full" size="lg">
                カメラを接続する
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">AI</p>
              <p className="text-xs text-muted-foreground">コーチング</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">EXIF</p>
              <p className="text-xs text-muted-foreground">データ分析</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">成長</p>
              <p className="text-xs text-muted-foreground">スキル向上</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
