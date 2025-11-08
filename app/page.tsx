"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/home-screen"
import { ConnectingScreen } from "@/components/connecting-screen"
import { PhotoDataScreen } from "@/components/photo-data-screen"
import { AdviceScreen } from "@/components/advice-screen"
import { SurveyScreen } from "@/components/survey-screen"
import { RecommendationScreen } from "@/components/recommendation-screen"
import { LensSurveyScreen } from "@/components/lens-survey-screen"
import { LensRecommendationScreen } from "@/components/lens-recommendation-screen"
import { SettingsScreen } from "@/components/settings-screen"

export type Screen =
  | "home"
  | "survey"
  | "recommendation"
  | "lens-survey"
  | "lens-recommendation"
  | "connecting"
  | "photo-data"
  | "advice"
  | "settings"
export type CoachingStyle = "logical" | "supportive" | "spartan" | "phottomo"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [photoData, setPhotoData] = useState<any>(null)
  const [surveyAnswers, setSurveyAnswers] = useState<any>(null)
  const [lensSurveyAnswers, setLensSurveyAnswers] = useState<any>(null)
  const [coachingStyle, setCoachingStyle] = useState<CoachingStyle>("logical")

  const handleConnect = () => {
    setCurrentScreen("connecting")
    // Simulate Bluetooth connection
    setTimeout(() => {
      setCurrentScreen("photo-data")
    }, 2500)
  }

  const handleStartSurvey = () => {
    setCurrentScreen("survey")
  }

  const handleStartLensSurvey = () => {
    setCurrentScreen("lens-survey")
  }

  const handleSurveyComplete = (answers: any) => {
    setSurveyAnswers(answers)
    setCurrentScreen("recommendation")
  }

  const handleLensSurveyComplete = (answers: any) => {
    setLensSurveyAnswers(answers)
    setCurrentScreen("lens-recommendation")
  }

  const handlePhotoReceived = (data: any) => {
    setPhotoData(data)
    setCurrentScreen("advice")
  }

  const handleBackToHome = () => {
    setCurrentScreen("home")
    setPhotoData(null)
    setSurveyAnswers(null)
    setLensSurveyAnswers(null)
  }

  const handleOpenSettings = () => {
    setCurrentScreen("settings")
  }

  const handleCloseSettings = () => {
    setCurrentScreen("home")
  }

  const handleCoachingStyleChange = (style: CoachingStyle) => {
    setCoachingStyle(style)
  }

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "home" && (
        <HomeScreen
          onConnect={handleConnect}
          onStartSurvey={handleStartSurvey}
          onStartLensSurvey={handleStartLensSurvey}
          onOpenSettings={handleOpenSettings}
        />
      )}
      {currentScreen === "survey" && (
        <SurveyScreen onComplete={handleSurveyComplete} onBack={handleBackToHome} onOpenSettings={handleOpenSettings} />
      )}
      {currentScreen === "recommendation" && (
        <RecommendationScreen
          surveyAnswers={surveyAnswers}
          onBackToHome={handleBackToHome}
          onOpenSettings={handleOpenSettings}
        />
      )}
      {currentScreen === "lens-survey" && (
        <LensSurveyScreen
          onComplete={handleLensSurveyComplete}
          onBack={handleBackToHome}
          onOpenSettings={handleOpenSettings}
        />
      )}
      {currentScreen === "lens-recommendation" && (
        <LensRecommendationScreen
          surveyAnswers={lensSurveyAnswers}
          onBackToHome={handleBackToHome}
          onOpenSettings={handleOpenSettings}
        />
      )}
      {currentScreen === "connecting" && <ConnectingScreen />}
      {currentScreen === "photo-data" && (
        <PhotoDataScreen onPhotoReceived={handlePhotoReceived} onOpenSettings={handleOpenSettings} />
      )}
      {currentScreen === "advice" && (
        <AdviceScreen
          photoData={photoData}
          onBackToHome={handleBackToHome}
          coachingStyle={coachingStyle}
          onOpenSettings={handleOpenSettings}
        />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen
          coachingStyle={coachingStyle}
          onCoachingStyleChange={handleCoachingStyleChange}
          onClose={handleCloseSettings}
        />
      )}
    </main>
  )
}
