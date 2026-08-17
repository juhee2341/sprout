import type { SelectOption, ToggleControl } from "@/types/control"
import type { DecisionGuide } from "@/types/decision"

import type {
  ToastActionKind,
  ToastDuration,
  ToastMaxVisible,
  ToastPosition,
  ToastPriority,
  ToastToggleKey,
  ToastTone,
} from "./hooks/useToastPlayground"

export const closeButtonControl: ToggleControl<ToastToggleKey> = {
  key: "closeButton",
  label: "Close Button",
  description: "토스트마다 X 버튼을 둡니다.",
}

export const positionOptions: SelectOption<ToastPosition>[] = [
  { value: "top-right", label: "우측 상단" },
  { value: "top-center", label: "상단 중앙" },
  { value: "bottom-right", label: "우측 하단" },
  { value: "bottom-center", label: "하단 중앙" },
]

export const durationOptions: SelectOption<ToastDuration>[] = [
  { value: "3000", label: "3초" },
  { value: "5000", label: "5초" },
  { value: "10000", label: "10초" },
  { value: "manual", label: "직접 닫을 때까지" },
]

export const priorityOptions: SelectOption<ToastPriority>[] = [
  { value: "background", label: "polite (background)" },
  { value: "foreground", label: "assertive (foreground)" },
]

export const toneOptions: SelectOption<ToastTone>[] = [
  { value: "info", label: "정보" },
  { value: "success", label: "성공" },
  { value: "error", label: "오류" },
]

export const actionOptions: SelectOption<ToastActionKind>[] = [
  { value: "none", label: "없음" },
  { value: "undo", label: "되돌리기" },
  { value: "retry", label: "다시 시도" },
]

export const maxVisibleOptions: SelectOption<ToastMaxVisible>[] = [
  { value: "1", label: "1개" },
  { value: "3", label: "3개" },
  { value: "unlimited", label: "제한 없음" },
]

const APG_ALERT = "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
const APG_ALERTDIALOG =
  "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
const WCAG_TIMING =
  "https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html"
const WCAG_USE_OF_COLOR =
  "https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
const WCAG_TARGET_SIZE =
  "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"
const RADIX_TOAST = "https://www.radix-ui.com/primitives/docs/components/toast"

export type DecisionKey =
  | "position"
  | "duration"
  | "priority"
  | "tone"
  | "action"
  | "maxVisible"
  | "closeButton"
  | "content"

export const decisionGuides: Record<DecisionKey, DecisionGuide> = {
  position: {
    summary: "토스트가 화면 어디에 나타날지 정합니다.",
    fits: [
      "우측 하단 — 데스크톱 앱에서 가장 흔합니다. 본문을 거의 가리지 않습니다",
      "상단 중앙 — 놓치면 안 되는 알림. 시선이 가장 먼저 닿습니다",
      "하단 중앙 — 모바일. 엄지가 닿는 자리라 액션 버튼을 누르기 쉽습니다",
    ],
    careful: [
      "상단 — 헤더·배너와 겹치고, 브라우저·OS 알림과도 자리를 다툽니다",
      "하단 — 모바일 하단 탭바나 플로팅 버튼을 가립니다",
      "우측 — 방금 누른 버튼이 화면 왼쪽에 있었다면 시선이 멀리 이동합니다",
    ],
    tradeOffs: [
      {
        label: "시선 근처(상단·중앙)에 두면",
        points: [
          "알아챌 확률이 높아집니다",
          "읽던 내용을 가려 방해가 됩니다",
        ],
      },
      {
        label: "구석(우측 하단)에 두면",
        points: [
          "작업을 방해하지 않습니다",
          "집중하고 있으면 그냥 지나칩니다 — 중요한 알림에는 부적합합니다",
        ],
      },
    ],
    why: "위치는 “얼마나 방해할 것인가”를 정하는 손잡이입니다. 토스트를 놓쳐도 되는 정보라면 구석이 맞고, 놓치면 안 되는 정보라면 애초에 토스트가 아닌 다른 수단이 맞습니다. 그래서 “중요하니까 상단 중앙”이라는 결정은 대체로 “이건 토스트로 처리할 게 아니었다”의 다른 표현입니다. 방금 누른 버튼과 토스트가 멀수록 사용자는 둘을 연결짓지 못한다는 점도 함께 보세요.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Alert Pattern",
        detail:
          "알림은 “important and potentially time-sensitive information without interfering with the user's ability to continue working” 를 전달하는 수단으로 정의됩니다. 작업을 방해하지 않는 것이 전제 조건입니다.",
        url: APG_ALERT,
      },
    ],
  },

  duration: {
    summary: "토스트가 저절로 사라지기까지의 시간입니다.",
    fits: [
      "3초 — 한 단어짜리 확인(“저장했어요”)",
      "5초 — 라이브러리 기본값. 한 문장 정도를 읽을 시간",
      "10초 — 되돌리기처럼 사용자가 반응해야 하는 경우",
      "직접 닫을 때까지 — 오류, 또는 사용자가 조치를 취해야 하는 내용",
    ],
    careful: [
      "긴 문장을 3초에 태우는 것 — 읽는 속도는 사람마다 다르고, 화면 확대·스크린 리더 사용자는 더 오래 걸립니다",
      "액션 버튼을 짧은 시간과 함께 두는 것 — 마우스를 옮기는 동안 사라집니다",
      "오류를 자동으로 없애는 것 — 사용자가 무엇이 잘못됐는지 다시 확인할 방법이 사라집니다",
    ],
    tradeOffs: [
      {
        label: "짧게 두면",
        points: [
          "화면이 금방 깨끗해집니다",
          "놓친 사용자에게는 아무 일도 없었던 것과 같습니다",
        ],
      },
      {
        label: "길게 두거나 유지하면",
        points: [
          "읽을 시간과 되돌릴 기회를 줍니다",
          "쌓이면 화면을 잠식하므로 닫는 수단이 반드시 필요합니다",
        ],
      },
    ],
    why: "자동으로 사라지는 시간은 편의 설정처럼 보이지만 실제로는 **시간 제한**입니다. 사용자가 읽는 속도를 개발자가 대신 정하는 셈이라, 접근성 기준이 명시적으로 다루는 영역입니다. 실무에서는 “중요도에 따라 시간을 다르게”보다 “사라져도 되는 것만 토스트로, 나머지는 사라지지 않는 자리에”가 더 안전한 규칙입니다. 되돌리기 버튼을 붙였다면 그 순간부터 시간은 UI 장식이 아니라 사용자에게 주어진 제한 시간입니다.",
    evidence: [
      {
        source: "WCAG 2.1 — 2.2.1 Timing Adjustable, Level A",
        detail:
          "“For each time limit that is set by the content, at least one of the following is true: Turn off, Adjust, Extend...” — 콘텐츠가 시간 제한을 두면 끄거나 늘릴 수단이 있어야 합니다.",
        url: WCAG_TIMING,
      },
      {
        source: "W3C WAI-ARIA APG — Alert Pattern",
        detail:
          "“It is also important to avoid designing alerts that disappear automatically. An alert that disappears too quickly can lead to failure to meet WCAG 2.0 success criterion 2.2.3.” 자동 소멸 자체를 피하라고 권고합니다.",
        url: APG_ALERT,
      },
      {
        source: "Radix UI — Toast (설치된 @radix-ui/react-toast 타입 정의)",
        detail:
          "Provider 의 duration 은 “Time in milliseconds that each toast should remain visible for. @defaultValue 5000” 입니다. 5초는 관례일 뿐 근거 있는 상한이 아닙니다.",
        url: RADIX_TOAST,
      },
    ],
  },

  priority: {
    summary:
      "스크린 리더가 지금 읽던 것을 끊고 알릴지, 끝난 뒤에 알릴지 정합니다.",
    fits: [
      "polite — 저장 완료, 복사됨 같은 대부분의 알림",
      "assertive — 사용자가 즉시 알아야 하고, 늦으면 손해가 생기는 내용",
    ],
    careful: [
      "전부 assertive 로 두는 것 — 읽고 있던 문장이 매번 잘립니다",
      "polite 로 두고 3초 뒤 없애는 것 — 다 읽기 전에 요소가 사라져 아예 안 읽힐 수 있습니다",
    ],
    tradeOffs: [
      {
        label: "polite (background)",
        points: [
          "읽던 내용을 끊지 않고 순서대로 전달합니다",
          "다른 안내가 길면 한참 뒤에 들립니다",
        ],
      },
      {
        label: "assertive (foreground)",
        points: [
          "즉시 전달됩니다",
          "사용자의 흐름을 끊고, 잦으면 그 자체가 방해가 됩니다",
        ],
      },
    ],
    why: "이 설정은 화면에는 아무 차이도 만들지 않습니다 — 눈으로 보면 완전히 똑같은 토스트입니다. 그래서 개발 중에는 잘못 골라도 아무도 눈치채지 못하고, 스크린 리더 사용자에게만 결과가 나타납니다. 판단 기준은 중요도가 아니라 **끊을 가치가 있는가**입니다. 정말 즉시 대응해야 하는 내용이라면 토스트가 아니라 포커스를 가져가는 대화상자(alertdialog)가 맞는 경우가 많습니다.",
    evidence: [
      {
        source: "Radix UI — Toast (설치된 @radix-ui/react-toast 타입 정의)",
        detail:
          "Root 의 type 이 'foreground' | 'background' 로 나뉘고, Provider 의 label 은 “An author-localized label for each toast. Used to help screen reader users associate the interruption with a toast.” 로 설명됩니다. 토스트를 '방해(interruption)'로 다룹니다.",
        url: RADIX_TOAST,
      },
      {
        source: "W3C WAI-ARIA APG — Alert Pattern",
        detail:
          "알림은 “crucial they do not affect keyboard focus” — 포커스를 건드리지 않아야 합니다. 즉 토스트는 알릴 수는 있어도 사용자를 데려올 수는 없습니다.",
        url: APG_ALERT,
      },
      {
        source: "W3C WAI-ARIA APG — Alert Dialog Pattern",
        detail:
          "즉시 응답이 필요한 상황을 위해 포커스를 받는 alertdialog 패턴이 따로 존재합니다. “끊어야 한다”면 선택지는 assertive 토스트만이 아닙니다.",
        url: APG_ALERTDIALOG,
      },
    ],
  },

  tone: {
    summary: "정보·성공·오류 중 어떤 성격의 알림인지 표시합니다.",
    fits: [
      "정보 — 상태 변화 안내",
      "성공 — 방금 한 일이 끝났음을 확인",
      "오류 — 실패했고 사용자가 알아야 할 때",
    ],
    careful: [
      "색만 바꾸는 것 — 붉은 토스트와 초록 토스트를 구분하지 못하는 사용자가 있습니다",
      "오류를 토스트로만 알리는 것 — 사라지고 나면 무엇이 실패했는지 확인할 방법이 없습니다",
      "성공 토스트를 남발하는 것 — 결과가 화면에 이미 보인다면 토스트는 소음입니다",
    ],
    tradeOffs: [
      {
        label: "성공 알림",
        points: [
          "작업이 끝났다는 확신을 줍니다",
          "화면 변화로 이미 알 수 있다면 불필요합니다",
        ],
      },
      {
        label: "오류 알림",
        points: [
          "실패를 즉시 알립니다",
          "토스트는 사라지므로, 고칠 방법은 사라지지 않는 자리(폼 옆 인라인 에러)에 있어야 합니다",
        ],
      },
    ],
    why: "가장 흔한 실수는 폼 검증 오류를 토스트로 던지는 것입니다. 사용자는 “뭔가 틀렸다”는 사실만 얻고, 어디가 틀렸는지는 사라진 뒤에 찾아야 합니다. 오류의 원인이 화면 안 특정 위치에 있다면 그 위치에 붙여야 하고, 원인이 화면 밖(네트워크·서버)에 있을 때만 토스트가 제 역할을 합니다. 색은 그다음 문제인데, 아이콘이나 “오류” 같은 낱말 없이 색만으로 성격을 전달하면 그 순간 접근성 기준을 벗어납니다.",
    evidence: [
      {
        source: "WCAG 2.1 — 1.4.1 Use of Color, Level A",
        detail:
          "“Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.” 토스트 배경색만 다르게 하는 구현이 정확히 여기에 해당합니다.",
        url: WCAG_USE_OF_COLOR,
      },
    ],
  },

  action: {
    summary: "토스트 안에 되돌리기·다시 시도 같은 버튼을 둘지 정합니다.",
    fits: [
      "되돌리기 — 삭제를 확인 모달 없이 즉시 실행하고, 대신 물릴 기회를 주는 흐름",
      "다시 시도 — 네트워크 실패처럼 같은 동작을 반복하면 되는 경우",
    ],
    careful: [
      "짧은 자동 소멸 시간과 함께 두는 것 — 버튼이 손이 닿기 전에 사라집니다",
      "버튼을 누르면 화면이 전환되는 것 — 토스트는 포커스를 가져오지 않으므로 키보드 사용자는 전환된 곳을 모릅니다",
      "액션 버튼과 X 버튼을 붙여 두는 것 — 좁은 화면에서 오탭이 납니다",
    ],
    tradeOffs: [
      {
        label: "액션을 넣으면",
        points: [
          "확인 모달 없이 진행할 수 있어 흐름이 빨라집니다 — 되돌릴 수 있으니까요",
          "토스트가 시간 제한이 걸린 인터랙티브 UI가 됩니다",
        ],
      },
      {
        label: "넣지 않으면",
        points: [
          "토스트는 순수한 알림으로 남고 사라져도 잃을 것이 없습니다",
          "되돌릴 방법을 다른 곳(휴지통·기록)에 마련해야 합니다",
        ],
      },
    ],
    why: "되돌리기 버튼이 달린 토스트는 “확인 모달을 없앨 수 있는가”라는 더 큰 결정의 결과물입니다. 실행 전에 묻는 대신 실행 후에 물릴 기회를 주는 쪽이 대체로 빠르지만, 그 기회가 몇 초짜리라면 실질적으로는 없는 것과 같습니다. 키보드·스크린 리더 사용자는 토스트 안 버튼에 닿는 경로 자체가 다르다는 점도 함께 고려해야 합니다 — Radix 가 액션에 대체 설명을 **필수**로 요구하는 이유가 이것입니다.",
    evidence: [
      {
        source: "Radix UI — Toast (설치된 @radix-ui/react-toast 타입 정의)",
        detail:
          "Toast.Action 은 altText 를 필수 prop 으로 요구합니다: “A short description for an alternate way to carry out the action. For screen reader users who will not be able to navigate to the button easily/quickly.” 즉 버튼과 별개로 다른 경로가 존재해야 합니다.",
        url: RADIX_TOAST,
      },
      {
        source: "Radix UI — Toast Viewport (설치된 타입 정의)",
        detail:
          "Viewport 의 hotkey 기본값은 ['F8'] 로, “The keys to use as the keyboard shortcut that will move focus to the toast viewport.” 입니다. 키보드 사용자가 토스트에 닿으려면 이런 별도 장치가 필요합니다.",
        url: RADIX_TOAST,
      },
      {
        source: "WCAG 2.1 — 2.2.1 Timing Adjustable, Level A",
        detail:
          "시간 제한이 있으면 끄거나 늘릴 수 있어야 합니다. 사라지는 토스트 안의 버튼은 사실상 제한 시간이 걸린 조작 수단입니다.",
        url: WCAG_TIMING,
      },
    ],
  },

  maxVisible: {
    summary: "토스트를 동시에 몇 개까지 띄울지 정합니다.",
    fits: [
      "1개 — 알림이 드물고, 항상 마지막 상태만 의미 있는 경우",
      "3개 — 일반적인 상한. 연달아 일어난 일을 잠깐 함께 보여줍니다",
      "제한 없음 — 각각이 개별 기록으로 의미가 있는 경우(업로드 여러 건 등)",
    ],
    careful: [
      "제한 없음 + 긴 유지 시간 — 화면이 토스트로 덮이고 그 아래를 클릭할 수 없게 됩니다",
      "1개로 제한하면서 오래된 것을 즉시 지우는 것 — 방금 뜬 알림을 사용자가 읽기도 전에 다음 알림이 덮습니다",
      "반복되는 같은 알림 — 개수 제한보다 “3건 실패” 같은 묶음이 정답일 때가 많습니다",
    ],
    tradeOffs: [
      {
        label: "적게 유지하면",
        points: [
          "화면이 조용하고 지금 중요한 것만 남습니다",
          "빠르게 지나간 알림은 영영 못 봅니다",
        ],
      },
      {
        label: "많이 쌓으면",
        points: [
          "무슨 일이 있었는지 흐름이 보입니다",
          "쌓인 토스트가 화면과 클릭을 가로막습니다",
        ],
      },
    ],
    why: "개수 제한은 사실 “알림이 폭주할 때 무엇을 버릴 것인가”를 정하는 규칙입니다. 오래된 것을 버리면 최신 상태가 남고, 새 것을 대기시키면 순서가 지켜집니다 — 둘 다 맞지만 사용자에게 보이는 결과는 정반대입니다. 다만 토스트가 폭주한다는 것 자체가 대개 설계 신호입니다. 같은 알림이 반복된다면 개수를 조절할 게 아니라 하나로 합치거나, 알림 센터처럼 사라지지 않는 자리로 옮겨야 합니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Alert Pattern",
        detail:
          "잦은 알림 방해가 시각·인지 장애 사용자의 사용성을 해치고 WCAG 2.0 2.2.4(Interruptions) 준수를 어렵게 만든다고 명시합니다. 개수는 취향이 아니라 접근성 문제이기도 합니다.",
        url: APG_ALERT,
      },
    ],
  },

  closeButton: {
    summary: "토스트를 직접 닫는 X 버튼을 둘지 정합니다.",
    fits: [
      "자동으로 사라지지 않게 설정한 토스트 — 닫을 방법이 이것뿐입니다",
      "화면을 가릴 수 있는 위치·크기의 토스트",
      "여러 개가 쌓일 수 있는 구성",
    ],
    careful: [
      "액션 버튼 바로 옆에 붙이는 것 — 되돌리려다 닫습니다",
      "아이콘만 두고 이름을 주지 않는 것 — 스크린 리더에는 “버튼”으로만 읽힙니다",
      "작게 만드는 것 — 토스트는 대개 화면 가장자리라 터치 여유가 적습니다",
    ],
    tradeOffs: [
      {
        label: "두면",
        points: [
          "사용자가 언제든 화면을 정리할 수 있습니다 — 시간 제한을 스스로 끄는 셈입니다",
          "요소가 하나 늘어 좁은 폭에서 문구가 밀립니다",
        ],
      },
      {
        label: "빼면",
        points: [
          "토스트가 단순하고 문구에 집중됩니다",
          "자동 소멸에만 의존하게 되어, 유지 시간을 길게 둘 수 없습니다",
        ],
      },
    ],
    why: "닫기 버튼은 사용자가 시간 제한을 스스로 해제하는 수단입니다. 그래서 “유지 시간을 길게 둔다”와 “닫기 버튼을 둔다”는 사실상 한 쌍의 결정입니다 — 길게 두면서 닫을 수 없게 만들면 화면을 점거하고, 짧게 두면서 닫기만 제공하면 대부분의 사용자는 쓸 일이 없습니다. 최소 터치 크기를 지키는 것도 여기서 중요한데, 화면 가장자리에 놓인 작은 X 는 실제로 가장 누르기 어려운 버튼 중 하나입니다.",
    evidence: [
      {
        source: "WCAG 2.1 — 2.2.1 Timing Adjustable, Level A",
        detail:
          "시간 제한을 “turn off” 할 수 있는 수단이 예외 조건의 첫 항목입니다. 닫기 버튼은 사용자가 제한을 직접 끝내는 가장 단순한 방법입니다.",
        url: WCAG_TIMING,
      },
      {
        source: "WCAG 2.2 — 2.5.8 Target Size (Minimum), Level AA",
        detail:
          "“The size of the target for pointer inputs is at least 24 by 24 CSS pixels” — 토스트 모서리의 X 버튼이 이 기준을 가장 자주 어깁니다.",
        url: WCAG_TARGET_SIZE,
      },
    ],
  },

  content: {
    summary: "토스트의 제목과 설명 문구입니다.",
    fits: [
      "제목만으로 끝나는 짧은 결과 — “저장했어요”",
      "설명은 제목만으로 부족할 때만 — 실패 원인, 다음 할 일",
    ],
    careful: [
      "두세 문장을 넣는 것 — 사라지는 UI 에서는 아무도 끝까지 읽지 않습니다",
      "“오류가 발생했습니다” — 무엇이 실패했는지도, 무엇을 하면 되는지도 없습니다",
      "제목과 설명이 같은 말을 반복하는 것",
    ],
    tradeOffs: [
      {
        label: "제목만",
        points: [
          "한눈에 읽히고 짧은 유지 시간과 잘 맞습니다",
          "맥락이 없어 여러 화면에서 같은 문구가 쓰이면 무엇에 대한 알림인지 모호합니다",
        ],
      },
      {
        label: "제목 + 설명",
        points: [
          "실패 원인이나 다음 행동을 함께 전달합니다",
          "읽는 데 시간이 걸리므로 유지 시간을 늘려야 합니다",
        ],
      },
    ],
    why: "토스트 문구의 제약은 “짧게 써라”가 아니라 **읽는 시간이 곧 유지 시간과 묶여 있다**는 점입니다. 문구를 한 문장 늘렸으면 시간도 함께 늘어야 하고, 시간을 늘릴 수 없다면 문구를 줄이거나 토스트를 포기해야 합니다. 무엇을 했는지(대상)와 결과가 함께 들어 있으면 대개 충분합니다 — “삭제했어요”보다 “‘회의록.pdf’를 삭제했어요”가 되돌리기 버튼을 누를지 판단하게 해 줍니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Alert Pattern",
        detail:
          "“An alert that disappears too quickly can lead to failure to meet WCAG 2.0 success criterion 2.2.3.” 문구 길이와 유지 시간은 분리된 결정이 아닙니다.",
        url: APG_ALERT,
      },
    ],
  },
}
