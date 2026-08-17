import type { SelectOption, ToggleControl } from "@/types/control"
import type { DecisionGuide } from "@/types/decision"

import type {
  ButtonOrder,
  ConfirmTone,
  FooterLayout,
  InitialFocus,
  ModalFooter,
  ModalSize,
  ModalToggleKey,
} from "./hooks/useModalPlayground"

/** 모달을 "어떻게 닫을 수 있는가"를 정하는 토글 묶음 */
export const closeControls: ToggleControl<ModalToggleKey>[] = [
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
  {
    key: "closeButton",
    label: "Close Button",
    description: "우측 상단에 X 버튼을 둡니다.",
  },
]

export const longContentControl: ToggleControl<ModalToggleKey> = {
  key: "longContent",
  label: "Long Content",
  description: "본문을 스크롤이 생길 만큼 길게 채웁니다.",
}

export const loadingControl: ToggleControl<ModalToggleKey> = {
  key: "loading",
  label: "Loading",
  description: "확인 버튼을 처리 중 상태로 둡니다.",
}

export const sizeOptions: SelectOption<ModalSize>[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
]

export const footerOptions: SelectOption<ModalFooter>[] = [
  { value: "default", label: "Default" },
  { value: "single", label: "Single" },
  { value: "none", label: "None" },
  { value: "custom", label: "Custom" },
]

export const footerLayoutOptions: SelectOption<FooterLayout>[] = [
  { value: "end", label: "오른쪽 정렬" },
  { value: "between", label: "양끝 배치" },
  { value: "stacked", label: "세로 스택" },
]

export const buttonOrderOptions: SelectOption<ButtonOrder>[] = [
  { value: "cancelFirst", label: "취소 먼저" },
  { value: "confirmFirst", label: "확인 먼저" },
]

export const confirmToneOptions: SelectOption<ConfirmTone>[] = [
  { value: "default", label: "Default" },
  { value: "destructive", label: "Destructive" },
]

export const initialFocusOptions: SelectOption<InitialFocus>[] = [
  { value: "auto", label: "자동" },
  { value: "confirm", label: "확인 버튼" },
  { value: "cancel", label: "취소 버튼" },
]

const APG_DIALOG = "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
const BOOTSTRAP_MODAL = "https://getbootstrap.com/docs/5.3/components/modal/#options"
const BOOTSTRAP_MODAL_SCROLL =
  "https://getbootstrap.com/docs/5.3/components/modal/#scrolling-long-content"
const MUI_DIALOG = "https://mui.com/material-ui/api/dialog/"
const RADIX_DIALOG = "https://www.radix-ui.com/primitives/docs/components/dialog"
const GNOME_HIG = "https://developer.gnome.org/hig/patterns/feedback/dialogs.html"
const WINDOWS_UX_DIALOG =
  "https://learn.microsoft.com/en-us/windows/win32/uxguide/win-dialog-box"
const WCAG_USE_OF_COLOR =
  "https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
const WCAG_TARGET_SIZE =
  "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"

/**
 * 선택지 하나당 판단 근거 하나.
 * size·footer 는 고른 값마다 대가가 달라서 값 단위로 키를 나눈다.
 * 나머지는 선택지끼리 맞바꾸는 관계라 컨트롤 단위로 하나만 둔다.
 */
export type DecisionKey =
  | ModalToggleKey
  | `size:${ModalSize}`
  | `footer:${ModalFooter}`
  | "content"
  | "buttons"
  | "layout"
  | "order"
  | "tone"
  | "focus"

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
        url: RADIX_DIALOG,
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

  closeButton: {
    summary: "우측 상단에 X 닫기 버튼을 둘지 정합니다.",
    fits: [
      "닫기 말고는 할 일이 없는 모달 — 미리보기·안내",
      "푸터를 없앤 모달 — 눈에 보이는 탈출구가 여기밖에 없습니다",
      "터치 화면 — ESC 키가 없고 배경도 좁습니다",
    ],
    careful: [
      "저장하지 않으면 사라지는 폼 — X 는 취소보다 가볍게 눌리는데 결과는 같습니다",
      "취소 버튼과 나란히 둘 때 — 같은 일을 하는 수단이 둘이라 “X 는 저장인가?”를 잠시 생각하게 만듭니다",
    ],
    tradeOffs: [
      {
        label: "두면",
        points: [
          "닫는 방법이 눈에 보여, Overlay·ESC 를 꺼도 갇히지 않습니다",
          "아이콘만 있는 버튼이라 aria-label 이 없으면 스크린 리더가 읽을 이름이 없습니다",
          "본문 오른쪽 위 공간을 차지해 제목이 길면 줄바꿈을 유발합니다",
        ],
      },
      {
        label: "빼면",
        points: [
          "모서리가 깔끔하고 시선이 본문·버튼에 모입니다",
          "탈출 경로가 푸터 버튼과 Overlay·ESC 에만 의존하게 됩니다",
        ],
      },
    ],
    why: "X 버튼은 “있으면 친절한 장식”이 아니라 탈출 경로의 마지막 보험입니다. Overlay Click·ESC 는 화면에 보이지 않는 경로라, 그 둘을 껐다면 눈에 보이는 닫기 수단이 최소 하나는 남아 있어야 합니다. 반대로 셋 다 켜 두면 닫는 방법이 넷(X·취소·배경·ESC)이 되는데, 그중 어느 것도 “저장하고 닫기”가 아니라는 점은 사용자에게 전혀 설명되지 않습니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Dialog (Modal) Pattern",
        detail:
          "“It is strongly recommended that the tab sequence of all dialogs include a visible element with role button that closes the dialog, such as a close icon or cancel button.” — 눈에 보이고 탭으로 닿는 닫기 요소를 권장합니다. X 버튼이든 취소 버튼이든 둘 중 하나는 있어야 한다는 뜻입니다.",
        url: APG_DIALOG,
      },
      {
        source: "Radix UI — Dialog",
        detail:
          "Dialog.Close 는 “The button that closes the dialog” 로, asChild 로 아이콘 버튼을 감싸는 용법이 문서 예제에 그대로 나옵니다.",
        url: RADIX_DIALOG,
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

  "footer:single": {
    summary: "확인 버튼 하나만 두는 구성입니다.",
    fits: [
      "이미 일어난 일을 알리는 결과·완료 안내 — 사용자가 고를 것이 없습니다",
      "약관·공지처럼 읽고 넘어가는 화면",
      "취소해도 아무 일이 일어나지 않아 취소 버튼이 의미 없는 경우",
    ],
    careful: [
      "무언가를 실행하는 모달 — 되돌릴 기회를 버튼에서 없애는 셈입니다",
      "닫기 수단이 이 버튼 하나뿐일 때 — 이 버튼이 곧 유일한 출구입니다",
    ],
    tradeOffs: [
      {
        label: "버튼 하나",
        points: [
          "고민할 것이 없어 시선이 그대로 다음 동작으로 이어집니다",
          "버튼 문구가 곧 모달의 결론이 됩니다 — “확인”보다 “닫기”·“완료”가 정확할 때가 많습니다",
        ],
      },
      {
        label: "대신",
        points: [
          "빠져나갈 선택지가 화면에 하나뿐이라, 사용자가 “안 할래요”를 표현할 자리가 없습니다",
          "실행형 모달에서 쓰면 확인이 사실상 강제됩니다",
        ],
      },
    ],
    why: "버튼이 하나라는 건 “선택지가 없다”는 뜻입니다. 그래서 이 구성이 맞는지는 버튼 개수가 아니라 질문의 성격으로 판단합니다 — 모달이 사용자에게 무언가를 묻고 있다면 답이 하나일 수 없고, 이미 끝난 일을 알리고 있다면 두 번째 버튼은 아무 일도 하지 않는 버튼입니다. 취소와 확인이 똑같이 “닫기”로 끝난다면, 그건 버튼 하나로 줄여도 되는 신호입니다.",
    evidence: [
      {
        source: "Windows Desktop UX Guide — Dialog boxes",
        detail:
          "“Right-align commit buttons in a single row across the bottom of the dialog box... Do this even if there is a single commit button (such as OK).” 버튼이 하나여도 가운데가 아니라 오른쪽 정렬을 유지하라고 못박습니다.",
        url: WINDOWS_UX_DIALOG,
      },
    ],
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

  longContent: {
    summary: "본문이 길어졌을 때 어디가 스크롤될지 정합니다.",
    fits: [
      "약관·변경 이력처럼 분량을 줄일 수 없는 내용",
      "항목 수가 데이터에 따라 달라지는 목록",
      "입력 필드가 많은 폼",
    ],
    careful: [
      "제목·버튼까지 함께 스크롤되는 구조 — 긴 본문을 내리는 동안 확인 버튼이 화면 밖으로 사라집니다",
      "모바일 — 주소창이 접히고 펴지며 화면 높이가 바뀝니다. 고정 px 높이는 이때 어긋납니다",
    ],
    tradeOffs: [
      {
        label: "본문만 스크롤",
        points: [
          "제목과 버튼이 항상 보여 지금 무엇을 결정하는지 놓치지 않습니다",
          "스크롤 영역의 경계가 흐리면 사용자가 더 읽을 내용이 있다는 걸 모르고 지나칩니다",
        ],
      },
      {
        label: "모달 전체가 스크롤",
        points: [
          "구현이 단순하고 짧은 내용에서는 차이가 없습니다",
          "버튼이 스크롤 끝에 있어, 끝까지 읽어야 결정할 수 있게 만들 수도 있습니다 — 약관 동의에서는 오히려 의도된 설계입니다",
        ],
      },
    ],
    why: "긴 본문의 문제는 “스크롤이 생긴다”가 아니라 “결정 수단이 시야에서 사라진다”입니다. 그래서 이 선택은 취향이 아니라 모달의 목적에 달려 있습니다 — 빨리 결정하게 하려면 버튼을 고정하고, 끝까지 읽게 하려면 버튼을 본문 뒤로 흘려보냅니다. 실수하기 쉬운 지점은 max-height 를 화면 높이(vh)가 아니라 고정 px 로 잡는 것으로, 작은 노트북에서는 모달이 화면 밖으로 넘칩니다.",
    evidence: [
      {
        source: "Bootstrap 5.3 — Scrolling long content",
        detail:
          "기본 동작은 “When modals become too long for the user's viewport or device, they scroll independent of the page itself.” 이고, 본문만 스크롤하려면 “.modal-dialog-scrollable” 을 따로 붙이라고 안내합니다. 두 방식이 별개 선택지로 존재합니다.",
        url: BOOTSTRAP_MODAL_SCROLL,
      },
      {
        source: "MUI — Dialog",
        detail:
          "scroll 프로퍼티가 'paper'(모달 안쪽)와 'body'(문서) 중 하나를 고르게 하고 기본값은 'paper' 입니다. “Determine the container for scrolling the dialog” 라는 설명 그대로, 스크롤 주체를 정하는 것이 API 수준의 결정입니다.",
        url: MUI_DIALOG,
      },
    ],
  },

  loading: {
    summary: "확인을 누른 뒤 응답을 기다리는 동안의 상태입니다.",
    fits: [
      "네트워크 요청이 뒤따르는 확인 — 결제·저장·삭제",
      "중복 실행되면 곤란한 작업",
    ],
    careful: [
      "확인 버튼을 disabled 로 막는 것 — disabled 버튼은 탭 순서에서 빠져, 방금 그 버튼에 있던 키보드 포커스가 갈 곳을 잃습니다",
      "스피너만 돌리고 아무것도 알리지 않는 것 — 화면을 보지 않는 사용자에게는 정지된 화면과 같습니다",
      "취소 버튼까지 함께 막는 것 — 응답이 늦어질수록 사용자는 갇힙니다",
    ],
    tradeOffs: [
      {
        label: "버튼에서 처리",
        points: [
          "누른 자리에서 바로 반응이 보여 시선을 옮길 필요가 없습니다",
          "모달은 열린 채라 실패했을 때 그 자리에서 오류를 보여줄 수 있습니다",
        ],
      },
      {
        label: "즉시 닫고 토스트로",
        points: [
          "사용자가 기다리지 않고 다음 일을 합니다",
          "실패하면 이미 사라진 모달의 입력값을 되살려야 합니다",
        ],
      },
    ],
    why: "처리 중 상태의 핵심은 스피너가 아니라 “두 번 눌리지 않게 하는 것”과 “끝났음을 알리는 것”입니다. 시각적으로는 스피너로 충분하지만, 보조기술에는 aria-busy 나 role=\"status\" 로 따로 말해줘야 합니다. 그리고 버튼을 막았다면 언제 풀리는지가 반드시 정의돼야 합니다 — 요청이 실패했을 때 상태를 되돌리지 않는 코드가 이 화면에서 가장 흔한 버그입니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Dialog (Modal) Pattern",
        detail:
          "대화상자 밖 콘텐츠는 비활성(inert) 상태가 됩니다. 처리 중이라며 대화상자 안의 버튼까지 전부 막으면, 사용자가 조작할 수 있는 요소가 화면에서 완전히 사라집니다.",
        url: APG_DIALOG,
      },
    ],
  },

  layout: {
    summary: "푸터 버튼을 가로로 늘어놓을지, 양끝으로 벌릴지, 세로로 쌓을지 정합니다.",
    fits: [
      "오른쪽 정렬 — 데스크톱 대화상자의 기본값",
      "양끝 배치 — 파괴적 액션을 안전한 액션에서 물리적으로 떼어놓을 때",
      "세로 스택 — 좁은 화면, 또는 버튼 문구가 길어 한 줄에 안 들어갈 때",
    ],
    careful: [
      "양끝 배치 — 버튼이 멀어져 시선이 두 번 움직이고, 넓은 화면에서는 둘이 한 쌍으로 안 보입니다",
      "세로 스택 — 위아래 순서가 곧 중요도로 읽히므로 좌우 순서와 규칙이 달라집니다",
    ],
    tradeOffs: [
      {
        label: "한쪽에 모으면",
        points: [
          "손이 움직이는 거리가 짧고 버튼 두 개가 한 쌍으로 보입니다",
          "가까운 만큼 오클릭도 가깝습니다",
        ],
      },
      {
        label: "떼어놓으면",
        points: [
          "위험한 버튼을 실수로 누를 확률이 줄어듭니다",
          "화면이 넓을수록 두 버튼의 관계가 흐려집니다",
        ],
      },
      {
        label: "세로로 쌓으면",
        points: [
          "버튼 폭이 넓어져 터치 정확도가 올라갑니다",
          "세로 공간을 먹어 작은 화면에서 본문이 밀립니다",
        ],
      },
    ],
    why: "정렬은 미감의 문제로 보이지만 실제로는 오조작 확률을 조정하는 손잡이입니다. 버튼을 붙여 두면 빨라지고, 떼어 두면 안전해집니다 — 그래서 같은 화면 안에서도 “삭제”가 있는 모달만 배치를 달리하는 선택이 성립합니다. 다만 배치가 화면마다 달라지면 사용자는 매번 버튼을 다시 찾아야 하므로, 예외는 규칙으로 정해 두고 쓰는 편이 낫습니다.",
    evidence: [
      {
        source: "Windows Desktop UX Guide — Dialog boxes",
        detail:
          "“Right-align commit buttons in a single row across the bottom of the dialog box” 를 기본 규칙으로 두고, 가운데 정렬을 잘못된 예로 제시합니다.",
        url: WINDOWS_UX_DIALOG,
      },
      {
        source: "WCAG 2.2 — 2.5.8 Target Size (Minimum), Level AA",
        detail:
          "“The size of the target for pointer inputs is at least 24 by 24 CSS pixels” — 좁은 화면에서 버튼을 나란히 욱여넣으면 이 최소 크기가 먼저 무너집니다. 세로 스택은 폭 대신 높이를 쓰는 대응입니다.",
        url: WCAG_TARGET_SIZE,
      },
    ],
  },

  order: {
    summary: "취소와 확인 중 어느 쪽을 앞(왼쪽·위)에 둘지 정합니다.",
    fits: [
      "취소 먼저 — 웹·GNOME·모바일에서 흔한 배치이고, 되돌릴 수 없는 작업에서 확인이 마지막에 옵니다",
      "확인 먼저 — Windows 데스크톱 관례를 따르는 앱, 또는 확인이 압도적으로 자주 선택되는 흐름",
    ],
    careful: [
      "같은 제품 안에서 화면마다 순서가 다른 것 — 사용자는 위치를 기억해서 누릅니다",
      "순서만 바꾸고 강조(색·굵기)는 그대로 두는 것 — 시선과 손이 서로 다른 곳을 가리킵니다",
    ],
    tradeOffs: [
      {
        label: "취소 먼저",
        points: [
          "읽는 순서상 “그만둘 수 있다”를 먼저 알립니다",
          "탭 순서에서도 취소를 먼저 만나, 엔터로 실행되는 사고가 줄어듭니다",
        ],
      },
      {
        label: "확인 먼저",
        points: [
          "가장 자주 고르는 답이 앞에 와서 빠릅니다",
          "위험한 버튼이 먼저 손에 닿습니다",
        ],
      },
    ],
    why: "이 항목에는 업계 공통의 정답이 없습니다 — 플랫폼 가이드끼리 정반대를 규정하고 있고, 둘 다 자기 생태계 안에서는 옳습니다. 그러니 “어느 쪽이 맞나”를 찾기보다 제품이 어느 관례 위에 서 있는지를 한 번 정하고 전부 통일하는 편이 낫습니다. 실제 사고는 순서 자체가 아니라 화면마다 순서가 뒤집힐 때 일어납니다. 참고로 DOM 순서를 바꾸면 탭 순서도 함께 바뀌므로, 시각적 순서만 CSS 로 뒤집으면 키보드 사용자와 마우스 사용자가 서로 다른 순서를 경험하게 됩니다.",
    evidence: [
      {
        source: "GNOME Human Interface Guidelines — Dialogs",
        detail:
          "“Always ensure that the cancel button appears first, before the affirmative button. In left-to-right locales, this is on the left.” 취소가 먼저입니다.",
        url: GNOME_HIG,
      },
      {
        source: "Windows Desktop UX Guide — Dialog boxes",
        detail:
          "“Present the commit buttons in the following order: 1. OK/[Do it]/Yes 2. [Don't do it]/No 3. Cancel” — 확인이 먼저이고 취소가 마지막입니다. 앞의 GNOME 지침과 정확히 반대입니다.",
        url: WINDOWS_UX_DIALOG,
      },
    ],
  },

  tone: {
    summary: "확인 버튼을 파괴적 액션으로 표시할지 정합니다.",
    fits: [
      "삭제·탈퇴·되돌릴 수 없는 초기화",
      "다른 사람에게 영향이 가는 작업 — 초대 취소, 권한 회수",
    ],
    careful: [
      "되돌릴 수 있는 작업에까지 붉은 버튼을 쓰는 것 — 경고가 흔해지면 아무도 멈추지 않습니다",
      "색만 바꾸고 문구는 “확인”으로 두는 것 — 색을 인지하지 못하는 사용자에게는 아무 경고도 없는 셈입니다",
    ],
    tradeOffs: [
      {
        label: "강조하면",
        points: [
          "훑어보는 사용자도 이 버튼이 위험하다는 걸 알아챕니다",
          "남용하면 위험 신호로서의 의미가 닳습니다",
        ],
      },
      {
        label: "강조하지 않으면",
        points: [
          "화면이 조용하고 일관됩니다",
          "위험을 문구와 본문만으로 전달해야 합니다",
        ],
      },
    ],
    why: "색은 경고의 보조 수단이지 경고 자체가 될 수 없습니다. 버튼을 붉게 칠하기 전에 문구가 스스로 위험을 말하는지 — “확인”이 아니라 “영구 삭제” — 를 먼저 확인하세요. 문구가 제 역할을 하면 색은 강조가 되고, 문구가 비어 있으면 색은 유일한 단서가 되어 접근성 문제가 됩니다.",
    evidence: [
      {
        source: "WCAG 2.1 — 1.4.1 Use of Color, Level A",
        detail:
          "“Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.” 붉은 버튼 하나로 위험을 전달하는 설계는 이 기준에 걸립니다.",
        url: WCAG_USE_OF_COLOR,
      },
      {
        source: "GNOME Human Interface Guidelines — Dialogs",
        detail:
          "“Assign the return key to activate the affirmative button. However, this should not be done if its action is irreversible, destructive or otherwise inconvenient to the user.” 파괴적 액션은 색뿐 아니라 기본 동작(엔터)에서도 빼라고 규정합니다.",
        url: GNOME_HIG,
      },
    ],
  },

  focus: {
    summary: "모달이 열릴 때 첫 포커스를 어디에 둘지 정합니다.",
    fits: [
      "자동 — 대부분의 경우. 대화상자 안의 첫 번째 초점 가능 요소로 들어갑니다",
      "확인 버튼 — 엔터 한 번으로 끝내야 하는 반복 작업",
      "취소 버튼 — 삭제·결제처럼 잘못 누르면 되돌릴 수 없는 확인창",
    ],
    careful: [
      "파괴적 액션에 첫 포커스를 두는 것 — 엔터를 연타하던 손이 그대로 실행합니다",
      "본문이 길 때 첫 요소로 보내는 것 — 화면이 아래로 스크롤돼 사용자가 첫 문장을 보지 못합니다",
      "아무 데도 포커스를 두지 않는 것 — 키보드 포커스가 모달 밖에 남아 탭 이동이 뒤 화면을 헤맵니다",
    ],
    tradeOffs: [
      {
        label: "확인에 두면",
        points: [
          "가장 흔한 답을 키보드만으로 즉시 실행합니다",
          "확인이 위험한 작업이면 그 즉시성이 사고가 됩니다",
        ],
      },
      {
        label: "취소에 두면",
        points: [
          "실수로 눌러도 아무 일이 일어나지 않습니다",
          "매번 확인을 눌러야 하는 흐름에서는 탭을 한 번 더 눌러야 합니다",
        ],
      },
    ],
    why: "초기 포커스는 “엔터를 눌렀을 때 무슨 일이 일어나는가”를 정하는 설정입니다. 모달이 뜬 걸 보지 못한 채 엔터를 누르는 사용자를 기준으로 생각해 보세요 — 그때 실행되는 것이 삭제라면 그 배치는 틀린 것이고, 그때 실행되는 것이 닫기라면 안전합니다. 이 Playground 는 Radix 의 onOpenAutoFocus 를 가로채 포커스를 옮기는데, 어떤 방식을 쓰든 “모달 안 어딘가”에는 반드시 포커스가 있어야 합니다.",
    evidence: [
      {
        source: "W3C WAI-ARIA APG — Dialog (Modal) Pattern",
        detail:
          "기본 동작은 “focus moves to an element contained in the dialog. Generally, focus is initially set on the first focusable element.” 이지만, “If a dialog contains the final step in a process that is not easily reversible, such as deleting data or completing a financial transaction, it may be advisable to set focus on the least destructive action.” 라는 예외를 명시합니다.",
        url: APG_DIALOG,
      },
      {
        source: "Radix UI — Dialog",
        detail:
          "Content 의 onOpenAutoFocus 에서 event.preventDefault() 를 호출한 뒤 원하는 요소에 focus() 를 주면 기본 포커스 위치를 바꿀 수 있습니다.",
        url: RADIX_DIALOG,
      },
    ],
  },
}
