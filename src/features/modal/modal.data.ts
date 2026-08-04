import type {
  ModalFooter,
  ModalSize,
  ModalToggleKey,
} from "./hooks/useModalPlayground"

export interface ToggleControl {
  key: ModalToggleKey
  label: string
  description: string
}

export const toggleControls: ToggleControl[] = [
  {
    key: "overlayClose",
    label: "Overlay Click",
    description: "배경을 클릭하면 닫힙니다.",
  },
  {
    key: "escClose",
    label: "ESC Close",
    description: "ESC 키로 닫힙니다.",
  },
]

export const sizeOptions: { value: ModalSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
]

export const footerOptions: { value: ModalFooter; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "none", label: "None" },
  { value: "custom", label: "Custom" },
]

/**
 * 하나의 선택지를 "어느 쪽이 정답인가"가 아니라
 * "어떤 상황에서 어떤 대가를 치르는가"로 설명하는 단위.
 */
export interface DecisionGuide {
  /** 이 옵션이 무엇을 정하는지 한 줄로 */
  summary: string
  /** 이 선택이 자주 쓰이는 상황 */
  fits: string[]
  /** 신중하게 고려해야 하는 상황 */
  careful: string[]
  /** 양쪽 방향이 각각 무엇을 얻고 무엇을 내주는지 */
  tradeOffs: TradeOff[]
  /** 겉으로 드러나지 않는 판단 근거 — 이 Playground 의 핵심 */
  why: string
  /** 인용 가능한 1차 출처. 추측은 넣지 않는다. */
  evidence?: Evidence[]
}

export interface TradeOff {
  label: string
  points: string[]
}

export interface Evidence {
  source: string
  detail: string
  url: string
}

const APG_DIALOG = "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
const BOOTSTRAP_MODAL = "https://getbootstrap.com/docs/5.3/components/modal/#options"
const MUI_DIALOG = "https://mui.com/material-ui/api/dialog/"

/**
 * 선택지 하나당 판단 근거 하나.
 * size·footer 는 고른 값마다 대가가 달라서 값 단위로 키를 나눈다.
 */
export type DecisionKey =
  | ModalToggleKey
  | `size:${ModalSize}`
  | `footer:${ModalFooter}`
  | "content"
  | "buttons"

export const decisionGuides: Record<DecisionKey, DecisionGuide> = {
  overlayClose: {
    summary: "배경(overlay)을 클릭했을 때 모달을 닫을지 정합니다.",
    fits: [
      "간단한 확인 모달 — 실수로 닫혀도 잃을 것이 없습니다",
      "이미지·상세 정보 미리보기 — 빠져나오는 것이 주된 동작입니다",
      "읽기 전용 안내 — 사용자가 입력해 둔 상태가 없습니다",
    ],
    careful: [
      "긴 입력 폼 — 작성 중이던 내용이 그대로 사라집니다",
      "결제·본인 인증 — 중간에 끊기면 처음부터 다시 해야 합니다",
      "여러 단계 마법사 — 어디까지 진행했는지를 잃습니다",
    ],
    tradeOffs: [
      {
        label: "켜면",
        points: [
          "빠져나올 길이 하나 더 생겨 갇힌 느낌이 없습니다",
          "대부분의 모달이 이렇게 동작해 배우지 않아도 예측됩니다",
          "본문에서 텍스트를 드래그하다 배경에서 손을 떼면 닫힐 수 있습니다",
        ],
      },
      {
        label: "끄면",
        points: [
          "작성 중이던 내용이 클릭 한 번으로 날아가지 않습니다",
          "닫는 경로가 좁혀져 사용자의 의도가 분명해집니다",
          "닫는 방법이 눈에 보이지 않으면 갇혔다고 느낍니다 — 명시적 닫기 수단이 함께 필요합니다",
        ],
      },
    ],
    why: "이 선택의 기준은 모달의 종류가 아니라 “지금 닫히면 사용자가 무엇을 잃는가”입니다. 잃을 것이 없을 때 배경 클릭은 가장 빠른 탈출구지만, 사용자가 무언가를 입력한 순간부터 같은 동작은 데이터 손실 사고가 됩니다.",
    evidence: [
      {
        source: "Bootstrap 5.3 — Modal options",
        detail:
          "backdrop 옵션에 'static' 값이 따로 있습니다: “a backdrop which doesn't close the modal when clicked”. 배경 클릭 닫기를 끄는 전용 값이 존재한다는 것 자체가 이 선택이 흔하다는 뜻입니다.",
        url: BOOTSTRAP_MODAL,
      },
      {
        source: "MUI — Dialog",
        detail:
          "onClose(event, reason) 의 reason 이 'backdropClick' 과 'escapeKeyDown' 으로 구분돼 넘어옵니다. 앱이 닫기 경로마다 다르게 반응하라고 설계된 API 입니다.",
        url: MUI_DIALOG,
      },
      {
        source: "Radix UI — Dialog (이 Playground 가 쓰는 방식)",
        detail:
          "Content 의 onPointerDownOutside 에서 event.preventDefault() 를 호출하면 배경 클릭 닫기가 막힙니다. ModalPreview.tsx 가 바로 이 방식으로 동작합니다.",
        url: "https://www.radix-ui.com/primitives/docs/components/dialog",
      },
    ],
  },

  escClose: {
    summary: "ESC 키로 모달을 닫을지 정합니다.",
    fits: [
      "일반적인 Dialog·설정 화면 — 키보드 사용자가 가장 먼저 누르는 키입니다",
      "드롭다운이나 팝오버가 겹친 화면 — 한 겹씩 벗어나는 표준 경로입니다",
    ],
    careful: [
      "결제·본인 인증처럼 중단 비용이 큰 흐름",
      "작성량이 많은 폼 — 다만 아예 막기보다 “정말 닫을까요?”를 한 번 묻는 쪽이 접근성을 지킵니다",
    ],
    tradeOffs: [
      {
        label: "켜면",
        points: [
          "W3C 대화상자 패턴이 규정한 동작이라 보조기술 사용자의 기대와 맞습니다",
          "마우스에 손을 옮기지 않고 빠져나올 수 있습니다",
        ],
      },
      {
        label: "끄면",
        points: [
          "의도치 않은 키 입력으로 작업이 취소되지 않습니다",
          "키보드만 쓰는 사용자의 탈출 경로가 줄어듭니다",
          "Overlay Click 을 끄는 것과 달리 접근성 손실을 동반합니다",
        ],
      },
    ],
    why: "ESC 와 Overlay Click 은 둘 다 “쉬운 닫기”처럼 보이지만 무게가 다릅니다. Overlay Click 을 끄는 건 UX 선택이지만, ESC 를 끄는 건 명시된 접근성 패턴을 벗어나는 선택입니다. 껐다면 그만큼 확실한 대체 경로 — 항상 보이는 닫기 버튼, 포커스 순서 안의 취소 버튼 — 를 반드시 함께 줘야 합니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Dialog (Modal) Pattern",
        detail:
          "키보드 인터랙션에 “Escape: Closes the dialog.” 가 그대로 규정돼 있습니다. ESC 닫기는 편의 기능이 아니라 대화상자의 기본 계약입니다.",
        url: APG_DIALOG,
      },
      {
        source: "Bootstrap 5.3 — Modal options",
        detail:
          "keyboard 옵션의 기본값은 true 이고 설명은 “Closes the modal when escape key is pressed” 입니다. false 로 끄는 건 기본값을 벗어나는 결정입니다.",
        url: BOOTSTRAP_MODAL,
      },
    ],
  },

  "size:sm": {
    summary: "한 문장으로 끝나는 확인·알림을 담는 폭입니다.",
    fits: [
      "삭제·저장 여부 같은 예/아니오 확인",
      "짧은 알림 한 줄",
      "선택지가 버튼 두 개로 끝나는 흐름",
    ],
    careful: [
      "입력 필드가 세 개 이상 — 세로로 길어져 결국 스크롤이 생깁니다",
      "표나 목록처럼 가로 폭이 필요한 내용",
    ],
    tradeOffs: [
      {
        label: "얻는 것",
        points: [
          "시선이 좁은 영역에 모여 결정이 빨라집니다",
          "모바일에서도 레이아웃이 거의 그대로입니다",
        ],
      },
      {
        label: "내주는 것",
        points: ["내용이 조금만 늘어도 세로 스크롤로 밀려납니다"],
      },
    ],
    why: "작은 모달은 “내용이 적어서”가 아니라 “결정이 하나여서” 고릅니다. 폭이 좁으면 사용자가 훑을 것이 적고, 그만큼 빨리 답합니다.",
  },

  "size:md": {
    summary: "짧은 폼이나 두세 문단 설명을 담는 기본 폭입니다.",
    fits: [
      "입력 필드 2~4개짜리 폼",
      "설명 + 확인 버튼 조합",
      "어느 크기가 맞을지 아직 모를 때의 출발점",
    ],
    careful: ["표·미리보기처럼 가로 공간을 요구하는 내용"],
    tradeOffs: [
      {
        label: "얻는 것",
        points: [
          "대부분의 내용이 스크롤 없이 들어갑니다",
          "데스크톱·태블릿 어디서나 무난합니다",
        ],
      },
      {
        label: "내주는 것",
        points: [
          "특별히 잘하는 게 없는 폭이라, 내용이 확실하다면 Small·Large 가 더 맞습니다",
        ],
      },
    ],
    why: "많은 라이브러리가 이 폭을 기본값으로 두는 이유는 이게 최선이어서가 아니라, 틀렸을 때 손해가 가장 적어서입니다. 기본값은 “가장 좋은 선택”이 아니라 “가장 덜 위험한 선택”인 경우가 많습니다.",
  },

  "size:lg": {
    summary: "여러 입력이나 목록을 한 화면에 놓는 폭입니다.",
    fits: [
      "설정 화면처럼 항목이 여러 그룹으로 나뉠 때",
      "표·목록을 함께 보여줘야 할 때",
      "좌우 2단으로 나눌 만한 내용",
    ],
    careful: [
      "단순 확인창 — 여백만 커지고 버튼이 멀어집니다",
      "모바일 — 어차피 화면 폭에 맞춰져 Medium 과 차이가 사라집니다",
    ],
    tradeOffs: [
      {
        label: "얻는 것",
        points: [
          "스크롤 없이 전체 맥락을 볼 수 있습니다",
          "관련된 항목을 가로로 묶어 배치할 수 있습니다",
        ],
      },
      {
        label: "내주는 것",
        points: [
          "뒤 화면이 거의 가려져 “맥락을 유지한 채 잠깐 처리한다”는 모달의 장점이 옅어집니다",
        ],
      },
    ],
    why: "모달은 커질수록 페이지에 가까워집니다. 화면 대부분을 덮을 정도라면 모달 대신 별도 라우트가 맞다는 신호일 수 있습니다 — 뒤로 가기, 새로고침, 링크 공유가 전부 공짜로 따라오기 때문입니다.",
  },

  "size:full": {
    summary: "화면을 거의 채우는 폭입니다.",
    fits: [
      "모바일에서 전체 화면으로 뜨는 흐름",
      "이미지·문서 뷰어",
      "여러 단계를 거치는 마법사",
    ],
    careful: [
      "데스크톱의 단순 작업 — 페이지 전환처럼 느껴져 “잠깐 들렀다 간다”는 감각이 사라집니다",
    ],
    tradeOffs: [
      {
        label: "얻는 것",
        points: [
          "작은 화면에서 공간을 낭비하지 않습니다",
          "복잡한 내용을 자유롭게 배치할 수 있습니다",
        ],
      },
      {
        label: "내주는 것",
        points: [
          "뒤 화면이 보이지 않아 사용자가 어디에 있었는지 잊습니다",
          "브라우저 뒤로 가기가 모달을 닫지 않아 기대와 어긋납니다",
        ],
      },
    ],
    why: "Full 을 골랐다면 이건 라우트여야 하지 않을까를 한 번 따져볼 지점입니다. 화면 전체를 쓰면서 URL 이 없으면, 사용자는 뒤로 가기로 모달을 닫으려다 페이지 자체를 떠나게 됩니다.",
  },

  "footer:default": {
    summary: "취소와 확인, 두 버튼을 두는 구성입니다.",
    fits: [
      "되돌릴 수 없는 작업 — 한 번 더 확인받아야 합니다",
      "폼 제출",
      "사용자가 “아니오”를 고를 수 있어야 하는 상황",
    ],
    careful: [
      "단순 안내 — 취소와 확인이 같은 결과라 사용자가 잠시 멈칫합니다",
    ],
    tradeOffs: [
      {
        label: "두 버튼",
        points: [
          "선택지가 눈에 보여 결정이 명시적입니다",
          "확인 버튼에 포커스를 두면 키보드만으로 끝낼 수 있습니다",
        ],
      },
      {
        label: "대신",
        points: ["“취소”와 “X”가 같은 일을 해 중복으로 보일 수 있습니다"],
      },
    ],
    why: "두 버튼의 문구가 서로 반대말인지 확인해 보세요. “취소 / 확인”보다 “유지 / 삭제”처럼 각 버튼이 제 할 일을 스스로 말하면, 사용자가 본문을 읽지 않아도 안전합니다.",
  },

  "footer:none": {
    summary: "푸터 버튼 없이 본문만 두는 구성입니다.",
    fits: [
      "이미지·상세 정보 미리보기",
      "읽고 닫으면 끝나는 내용",
    ],
    careful: [
      "사용자의 확인이 필요한 작업",
      "닫기 수단이 전부 꺼져 있을 때 — 나갈 방법이 사라집니다",
    ],
    tradeOffs: [
      {
        label: "얻는 것",
        points: ["내용에 집중되고 시각적으로 가볍습니다"],
      },
      {
        label: "내주는 것",
        points: ["닫기 경로가 다른 수단에 통째로 의존하게 됩니다"],
      },
    ],
    why: "푸터가 없는 모달은 닫기 수단이 최소 하나는 항상 보여야 합니다. 이 Playground 에서 Footer 를 None 으로 두고 Overlay Click 과 ESC 를 모두 끄면 정말로 갇히는 모달이 만들어집니다 — 직접 해 보세요.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Dialog (Modal) Pattern",
        detail:
          "대화상자 밖의 콘텐츠는 비활성(inert) 처리됩니다. 즉 닫기 수단이 없으면 사용자는 페이지 전체에서 아무것도 할 수 없는 상태가 됩니다.",
        url: APG_DIALOG,
      },
    ],
  },

  "footer:custom": {
    summary: "버튼 배치를 직접 구성하는 방식입니다.",
    fits: [
      "“다시 보지 않기”를 왼쪽에 두는 것 같은 비대칭 배치",
      "버튼이 세 개 이상일 때",
      "파괴적 액션을 시각적으로 떼어놔야 할 때",
    ],
    careful: ["배치가 화면마다 달라지면 사용자가 매번 버튼을 다시 찾습니다"],
    tradeOffs: [
      {
        label: "얻는 것",
        points: ["화면의 요구에 정확히 맞출 수 있습니다"],
      },
      {
        label: "내주는 것",
        points: [
          "일관성을 팀 규칙으로 따로 지켜야 합니다 — 컴포넌트가 대신 지켜주지 않습니다",
        ],
      },
    ],
    why: "Custom 은 자유를 주는 대신 결정을 매번 하게 만듭니다. 같은 배치가 세 번 넘게 반복된다면, 그건 Custom 이 아니라 새 프리셋이 되어야 한다는 신호입니다.",
  },

  content: {
    summary: "모달의 제목과 설명 문구입니다.",
    fits: [
      "제목은 사용자가 지금 무엇을 하는 중인지 한 줄로 말해줍니다",
      "설명은 결과나 되돌릴 수 없는 부분을 알립니다",
    ],
    careful: [
      "제목을 비우는 것 — 보조기술이 이 모달의 정체를 읽어줄 수단이 사라집니다",
      "설명에서 제목을 되풀이하는 것",
    ],
    tradeOffs: [
      {
        label: "짧게 쓰면",
        points: ["훑어보는 사용자가 곧바로 판단합니다"],
      },
      {
        label: "자세히 쓰면",
        points: [
          "결과를 오해할 여지가 줄어듭니다",
          "길어질수록 아무도 읽지 않습니다",
        ],
      },
    ],
    why: "Radix 를 비롯한 대부분의 Dialog 는 Title 을 aria-labelledby 로 연결합니다. 제목을 비우면 화면에서만 사라지는 게 아니라, 스크린 리더 사용자에게는 “이름 없는 대화상자”가 열립니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Dialog (Modal) Pattern",
        detail:
          "대화상자는 “A value set for the aria-labelledby property that refers to a visible dialog title” 또는 aria-label 중 하나를 반드시 가져야 합니다. 제목은 장식이 아니라 필수 요소입니다.",
        url: APG_DIALOG,
      },
    ],
  },

  buttons: {
    summary: "버튼에 들어갈 문구입니다.",
    fits: [
      "동사로 쓰기 — “삭제”, “저장”, “보내기”",
      "정말 아무 일도 일어나지 않을 때만 “취소”",
    ],
    careful: [
      "“확인 / 취소” — 무엇이 확인되는지는 본문을 읽어야 알 수 있습니다",
      "“예 / 아니오” — 질문이 부정문이면 뜻이 뒤집힙니다",
    ],
    tradeOffs: [
      {
        label: "구체적인 동사",
        points: [
          "버튼만 보고도 결과를 예측할 수 있습니다",
          "화면마다 문구를 따로 정해야 합니다",
        ],
      },
      {
        label: "범용 문구",
        points: [
          "어디에나 재사용됩니다",
          "판단을 본문 쪽으로 떠넘깁니다",
        ],
      },
    ],
    why: "사용자는 본문을 읽기 전에 버튼부터 봅니다 — 같은 모달을 두 번째 볼 때는 확실히 그렇습니다. 버튼 문구만 보고 결과를 예측할 수 있으면 그 모달은 잘 만든 겁니다.",
  },
}
