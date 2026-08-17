import type { Metadata } from "next"

import { ToastPlayground } from "@/features/toast/components/ToastPlayground"

export const metadata: Metadata = {
  title: "Toast Playground — Sprout",
  description:
    "Toast를 언제·어디에·얼마나 띄울지 직접 만져보며 판단 기준을 익히는 플레이그라운드.",
}

export default function ToastPlaygroundPage() {
  return <ToastPlayground />
}
