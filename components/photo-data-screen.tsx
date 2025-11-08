"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppHeader } from "./app-header"
import { CheckCircle2, Camera } from "lucide-react"
import Image from "next/image"

interface PhotoDataScreenProps {
  onPhotoReceived: (data: any) => void
  onOpenSettings: () => void
}

// Mock EXIF data
const mockPhotoData = {
  image: "/beautiful-landscape-photography-with-mountains-and.jpg",
  camera: "FUJIFILM X-T5",
  lens: "XF16-55mmF2.8 R LM WR",
  settings: {
    iso: "400",
    aperture: "f/5.6",
    shutter: "1/250s",
    focal: "35mm",
    mode: "Aperture Priority",
    wb: "Auto",
  },
}

export function PhotoDataScreen({ onPhotoReceived, onOpenSettings }: PhotoDataScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleGetAdvice = () => {
    onPhotoReceived(mockPhotoData)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onOpenSettings={onOpenSettings} />

      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              {isComplete ? (
                <CheckCircle2 className="h-12 w-12 text-primary" />
              ) : (
                <Camera className="h-12 w-12 text-primary animate-pulse" />
              )}
            </div>
            <h2 className="text-3xl font-bold">{isComplete ? "撮影データを受信しました" : "撮影データを受信中..."}</h2>
            <p className="text-muted-foreground">{isComplete ? "AIがあなたの写真を分析します" : `${progress}% 完了`}</p>
          </div>

          {isComplete && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="overflow-hidden">
                <div className="relative aspect-[3/2] bg-muted">
                  <Image
                    src={mockPhotoData.image || "/placeholder.svg"}
                    alt="Captured photo"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">撮影情報</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">カメラ</p>
                    <p className="text-sm font-medium">{mockPhotoData.camera}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">レンズ</p>
                    <p className="text-sm font-medium">{mockPhotoData.lens}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-muted p-3 space-y-1">
                    <p className="text-xs text-muted-foreground">ISO</p>
                    <p className="text-lg font-bold">{mockPhotoData.settings.iso}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 space-y-1">
                    <p className="text-xs text-muted-foreground">絞り</p>
                    <p className="text-lg font-bold">{mockPhotoData.settings.aperture}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 space-y-1">
                    <p className="text-xs text-muted-foreground">SS</p>
                    <p className="text-lg font-bold">{mockPhotoData.settings.shutter}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">焦点距離</p>
                    <p className="text-sm font-medium">{mockPhotoData.settings.focal}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">撮影モード</p>
                    <p className="text-sm font-medium">{mockPhotoData.settings.mode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">WB</p>
                    <p className="text-sm font-medium">{mockPhotoData.settings.wb}</p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleGetAdvice} className="w-full" size="lg">
                AIアドバイスを見る
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
