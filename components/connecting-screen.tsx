import { Card } from "@/components/ui/card"
import { Loader2, Bluetooth } from "lucide-react"

export function ConnectingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <Card className="p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="rounded-full bg-primary/10 p-6">
                <Bluetooth className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">接続中...</h2>
              <p className="text-sm text-muted-foreground">カメラとの接続を確立しています</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm text-muted-foreground">Bluetoothデバイスを検索中</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted" />
              <p className="text-sm text-muted-foreground">カメラとペアリング中</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted" />
              <p className="text-sm text-muted-foreground">データ受信準備中</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
