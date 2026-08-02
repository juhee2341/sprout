import type { Metadata } from "next"

import { ModalPlayground } from "@/features/modal/components/ModalPlayground"

export const metadata: Metadata = {
  title: "Modal Playground — Sprout",
  description: "Modal이 어떻게 동작하는지 직접 만져보며 이해하는 플레이그라운드.",
}

export default function ModalPlaygroundPage() {
  return <ModalPlayground />
}
