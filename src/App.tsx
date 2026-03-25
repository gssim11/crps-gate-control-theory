import React, { useState } from "react";
// 미사용 아이콘 제거 및 깔끔한 정리 완료
import {
  Brain,
  Activity,
  Wind,
  AlertTriangle,
  ShieldAlert,
  Zap,
  ChevronRight,
  Hand,
} from "lucide-react";

export default function App() {
  // --- 상태 관리 ---
  const [isBrushing, setIsBrushing] = useState(false); // Aβ 섬유 (빠른 자극)
  const [isStroking, setIsStroking] = useState(false); // C-LTMR 섬유 (느린 쓰다듬기)
  const [isSympatheticActive, setIsSympatheticActive] = useState(false); // 교감신경 항진 (NE 분비, 병리적 상태)

  // 퀴즈 상태 관리 (타입스크립트 엄격성 검사 통과를 위해 <number | null> 추가)
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);
  const [quiz4Answer, setQuiz4Answer] = useState<number | null>(null);

  // --- 생리학적 로직 계산 ---
  let painLevel = 0;
  let tCellStatus = "안정 (Resting)";
  let sgStatus = "정상 작동 (Inhibiting)";
  let clinicalSign = "정상적인 감각 인지";

  if (isSympatheticActive) {
    sgStatus = "기능 상실 (Disinhibited) - α2 매개 과분극";
    if (isStroking) {
      painLevel = 95; // C-LTMR 이질통 (가장 극심한 불쾌감 동반)
      tCellStatus = "폭주 (Wind-up)";
      clinicalSign = "극심한 동적 이질통 (Affective Allodynia)";
    } else if (isBrushing) {
      painLevel = 80; // Aβ 이질통
      tCellStatus = "과도 활성 (Hyperactive)";
      clinicalSign = "동적 이질통 (Mechanical Allodynia)";
    } else {
      painLevel = 20; // 자발통
      tCellStatus = "경미한 활성";
      clinicalSign = "자발통 / 과민 상태";
    }
  } else {
    sgStatus = "정상 작동 (Active) - 억제 물질(GABA) 분비 중";
    if (isBrushing) {
      painLevel = 0;
      tCellStatus = "강하게 억제됨 (Inhibited)";
      clinicalSign = "시원함 / 가벼운 분별 촉각 인지";
    } else if (isStroking) {
      painLevel = 0;
      tCellStatus = "안정됨 (Inhibited)";
      clinicalSign = "편안함 / 감정적 위안 (Affective touch)";
    }
  }

  // 버튼 핸들러
  const handleBrushing = () => {
    setIsBrushing(true);
    setIsStroking(false);
    setTimeout(() => setIsBrushing(false), 2000); // 빠른 순응
  };

  const handleStroking = () => {
    setIsStroking(true);
    setIsBrushing(false);
    setTimeout(() => setIsStroking(false), 4000); // 느린 순응
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 헤더 영역 */}
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Brain className="text-blue-600" size={32} />
            CRPS 심화 기전 시뮬레이터: 관문조절설 & 탈억제 통합 모델
          </h1>
          <p className="mt-1 font-semibold text-blue-700">
            안산대학교 물리치료학과 심경섭 교수
          </p>
          <p className="mt-2 text-slate-600">
            모낭 신경얼기의 다중 섬유(Aβ, C-LTMR) 병렬 신호가 교감신경(NE)에
            의한 척수 탈억제(Disinhibition) 상황에서 어떻게 동적 이질통을
            유발하는지 시각화
          </p>
        </header>

        {/* 메인 시뮬레이터 패널 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 컨트롤 패널 (좌측) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-indigo-500" /> 말초 자극
                (Input)
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleBrushing}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    isBrushing
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 hover:border-blue-300 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wind
                      size={24}
                      className={
                        isBrushing
                          ? "text-blue-500 animate-pulse"
                          : "text-slate-400"
                      }
                    />
                    <div className="text-left">
                      <div className="font-bold">빠른 붓 터치 (초당 30cm)</div>
                      <div className="text-xs opacity-80">
                        Aβ 섬유 (RA) 활성화
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="opacity-50" />
                </button>

                <button
                  onClick={handleStroking}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    isStroking
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-slate-200 hover:border-pink-300 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Hand
                      size={24}
                      className={
                        isStroking
                          ? "text-pink-500 animate-pulse"
                          : "text-slate-400"
                      }
                    />
                    <div className="text-left">
                      <div className="font-bold">느린 쓰다듬기 (초당 3cm)</div>
                      <div className="text-xs opacity-80">
                        C-LTMR (감정적 촉각) 활성화
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="opacity-50" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <ShieldAlert size={20} className="text-orange-500" /> 중추
                  병리 기전 (CRPS)
                </h2>
                <button
                  onClick={() => setIsSympatheticActive(!isSympatheticActive)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    isSympatheticActive
                      ? "border-orange-500 bg-orange-500 text-white shadow-md"
                      : "border-slate-200 hover:border-orange-300 text-slate-700 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Zap
                      size={24}
                      className={
                        isSympatheticActive ? "text-white" : "text-slate-400"
                      }
                    />
                    <div className="text-left">
                      <div className="font-bold">교감신경 과항진 유발</div>
                      <div
                        className={`text-xs ${
                          isSympatheticActive ? "text-orange-100" : "opacity-80"
                        }`}
                      >
                        노르에피네프린(NE) 방출 ON/OFF
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      isSympatheticActive ? "bg-orange-400" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isSympatheticActive ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 시각화 및 결과 패널 (우측) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  모낭 신경얼기 → 척수 뒤뿔 병렬 회로
                </h2>
                {isSympatheticActive && (
                  <span className="flex items-center gap-1 text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full animate-pulse">
                    <AlertTriangle size={14} /> 탈억제(Disinhibition) 진행 중
                  </span>
                )}
              </div>

              {/* SVG Animation Area */}
              <div className="w-full h-64 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-inner relative mb-6">
                <svg
                  viewBox="0 0 800 300"
                  className="w-full h-full preserve-aspect-ratio"
                >
                  <defs>
                    <marker
                      id="arrowBlue"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                    </marker>
                    <marker
                      id="arrowPink"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
                    </marker>
                    <marker
                      id="arrowRed"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Gate Control Box */}
                  <rect
                    x="330"
                    y="60"
                    width="280"
                    height="220"
                    rx="15"
                    fill="#1e293b"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text
                    x="470"
                    y="85"
                    fill="#94a3b8"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Spinal Cord Dorsal Horn (관문조절 시스템)
                  </text>
                  {/* Skin & Hair Follicle */}
                  <path
                    d="M 60 100 L 60 250"
                    stroke="#475569"
                    strokeWidth="4"
                  />
                  <path
                    d="M 30 180 L 90 180"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />{" "}
                  {/* Skin surface */}
                  <path
                    d="M 60 180 Q 80 120 50 40"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="4"
                    className={
                      isBrushing || isStroking
                        ? "origin-[60px_180px] animate-[wiggle_0.5s_ease-in-out_infinite]"
                        : ""
                    }
                  />
                  {/* --- 1. A-beta (LTMR, Fast) --- */}
                  <path
                    d="M 60 170 L 140 170 L 220 120 L 530 120"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                  />
                  <text
                    x="170"
                    y="110"
                    fill="#60a5fa"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    LTMR: Aβ (분별촉각)
                  </text>
                  {isBrushing && (
                    <circle
                      cx="0"
                      cy="0"
                      r="6"
                      fill="#60a5fa"
                      filter="url(#glow)"
                    >
                      <animateMotion
                        dur="0.8s"
                        repeatCount="indefinite"
                        path="M 60 170 L 140 170 L 220 120 L 530 120"
                      />
                    </circle>
                  )}
                  {/* A-beta collateral to SG */}
                  <path
                    d="M 380 120 L 380 160"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    markerEnd="url(#arrowBlue)"
                  />
                  <circle
                    cx="380"
                    cy="160"
                    r="8"
                    fill="#1e293b"
                    stroke="#3b82f6"
                  />
                  <text
                    x="380"
                    y="164"
                    fill="#3b82f6"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    +
                  </text>
                  {/* A-beta direct to T */}
                  <circle
                    cx="510"
                    cy="120"
                    r="8"
                    fill="#1e293b"
                    stroke="#3b82f6"
                  />
                  <text
                    x="510"
                    y="124"
                    fill="#3b82f6"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    +
                  </text>
                  {/* --- 2. C-LTMR (Affective Touch, Slow) --- */}
                  <path
                    d="M 60 185 L 140 185 L 220 160 L 360 160 L 380 180"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    markerEnd="url(#arrowPink)"
                  />
                  <text
                    x="170"
                    y="150"
                    fill="#f472b6"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    LTMR: C-촉각 (감정적 촉각)
                  </text>
                  {isStroking && (
                    <circle
                      cx="0"
                      cy="0"
                      r="5"
                      fill="#f472b6"
                      filter="url(#glow)"
                    >
                      <animateMotion
                        dur="2.5s"
                        repeatCount="indefinite"
                        path="M 60 185 L 140 185 L 220 160 L 360 160 L 380 180"
                      />
                    </circle>
                  )}
                  {/* --- 3. A-delta/C (HTMR, Noxious) --- */}
                  <path
                    d="M 60 200 L 140 200 L 220 250 L 530 250"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                  />
                  <text
                    x="170"
                    y="270"
                    fill="#f87171"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    HTMR: Aδ, C (고역치 통각)
                  </text>
                  {/* A-delta/C collateral to SG */}
                  <path
                    d="M 380 250 L 380 220"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    markerEnd="url(#arrowRed)"
                  />
                  <circle
                    cx="380"
                    cy="220"
                    r="8"
                    fill="#1e293b"
                    stroke="#ef4444"
                  />
                  <text
                    x="380"
                    y="224"
                    fill="#ef4444"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    -
                  </text>
                  {/* A-delta/C direct to T */}
                  <circle
                    cx="510"
                    cy="250"
                    r="8"
                    fill="#1e293b"
                    stroke="#ef4444"
                  />
                  <text
                    x="510"
                    y="254"
                    fill="#ef4444"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    +
                  </text>
                  {/* --- 4. Central Control (NE) --- */}
                  <rect
                    x="360"
                    y="10"
                    width="180"
                    height="30"
                    rx="5"
                    fill={isSympatheticActive ? "#ea580c" : "#334155"}
                    stroke={isSympatheticActive ? "#f97316" : "#475569"}
                    strokeWidth="2"
                  />
                  <text
                    x="450"
                    y="30"
                    fill={isSympatheticActive ? "#fff" : "#94a3b8"}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    CENTRAL CONTROL (NE)
                  </text>
                  <path
                    d="M 450 40 L 450 110 L 380 110 L 380 180"
                    fill="none"
                    stroke={isSympatheticActive ? "#f97316" : "#475569"}
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {isSympatheticActive && (
                    <>
                      <circle
                        cx="0"
                        cy="0"
                        r="4"
                        fill="#f97316"
                        filter="url(#glow)"
                      >
                        <animateMotion
                          dur="1.2s"
                          repeatCount="indefinite"
                          path="M 450 40 L 450 110 L 380 110 L 380 180"
                        />
                      </circle>
                      <rect
                        x="365"
                        y="180"
                        width="30"
                        height="14"
                        fill="#ea580c"
                        rx="2"
                      />
                      <text
                        x="380"
                        y="191"
                        fill="#fff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        α2 (-)
                      </text>
                    </>
                  )}
                  {/* --- 5. SG Node (Interneuron) --- */}
                  <g transform="translate(380, 200)">
                    <circle
                      cx="0"
                      cy="0"
                      r="20"
                      fill={isSympatheticActive ? "#475569" : "#eab308"}
                      stroke={isSympatheticActive ? "#ef4444" : "#fef08a"}
                      strokeWidth="2"
                    />
                    <text
                      x="0"
                      y="4"
                      fill={isSympatheticActive ? "#94a3b8" : "#713f12"}
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      SG
                    </text>

                    {/* SG Output to T-Cell (Inhibitory) */}
                    <path
                      d="M 20 0 L 110 0"
                      fill="none"
                      stroke={isSympatheticActive ? "#475569" : "#eab308"}
                      strokeWidth="3"
                    />
                    {!isSympatheticActive && (
                      <>
                        <circle
                          cx="110"
                          cy="0"
                          r="8"
                          fill="#1e293b"
                          stroke="#eab308"
                        />
                        <text
                          x="110"
                          y="4"
                          fill="#eab308"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          -
                        </text>
                      </>
                    )}
                  </g>
                  {/* --- 6. T-Cell Node (WDR) --- */}
                  <g transform="translate(530, 200)">
                    <circle
                      cx="0"
                      cy="0"
                      r="35"
                      fill={
                        painLevel > 50
                          ? "#ef4444"
                          : painLevel > 0
                          ? "#f87171"
                          : "#fca5a5"
                      }
                      stroke="#b91c1c"
                      strokeWidth="3"
                      filter={painLevel > 50 ? "url(#glow)" : ""}
                    />
                    <text
                      x="0"
                      y="5"
                      fill="#7f1d1d"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      WDR
                    </text>
                    <text
                      x="0"
                      y="20"
                      fill="#991b1b"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      (T-cell)
                    </text>

                    {/* Output to Brain */}
                    <path
                      d="M 35 0 L 130 0"
                      fill="none"
                      stroke={painLevel > 50 ? "#ef4444" : "#64748b"}
                      strokeWidth={painLevel > 50 ? "5" : "2"}
                      markerEnd={painLevel > 50 ? "url(#arrowRed)" : ""}
                    />
                    {painLevel > 0 && (
                      <circle
                        cx="0"
                        cy="0"
                        r="5"
                        fill="#fff"
                        filter="url(#glow)"
                      >
                        <animateMotion
                          dur={painLevel > 50 ? "0.2s" : "1s"}
                          repeatCount="indefinite"
                          path="M 35 0 L 130 0"
                        />
                      </circle>
                    )}
                  </g>
                  {/* --- 7. Action System (Brain) --- */}
                  <rect
                    x="670"
                    y="175"
                    width="100"
                    height="50"
                    rx="6"
                    fill="#f1f5f9"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                  <text
                    x="720"
                    y="200"
                    fill="#475569"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    ACTION
                  </text>
                  <text
                    x="720"
                    y="215"
                    fill="#475569"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    SYSTEM (뇌)
                  </text>
                </svg>
                <style>{`
                  @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
                `}</style>
              </div>

              {/* 상태 대시보드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-xl border-l-4 ${
                    isSympatheticActive
                      ? "bg-orange-50 border-orange-500"
                      : "bg-green-50 border-green-500"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-500 mb-1">
                    문지기(SG) 상태
                  </div>
                  <div
                    className={`font-semibold ${
                      isSympatheticActive ? "text-orange-700" : "text-green-700"
                    }`}
                  >
                    {sgStatus}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border-l-4 ${
                    painLevel > 50
                      ? "bg-red-50 border-red-500"
                      : painLevel > 0
                      ? "bg-yellow-50 border-yellow-500"
                      : "bg-slate-50 border-slate-400"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-500 mb-1">
                    WDR(T-cell) 발화 수준
                  </div>
                  <div
                    className={`font-semibold ${
                      painLevel > 50
                        ? "text-red-700"
                        : painLevel > 0
                        ? "text-yellow-700"
                        : "text-slate-700"
                    }`}
                  >
                    {tCellStatus}
                  </div>
                  <div className="mt-2 h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        painLevel > 50
                          ? "bg-red-500"
                          : painLevel > 0
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${painLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border-l-4 ${
                    painLevel > 50
                      ? "bg-red-50 border-red-500"
                      : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-500 mb-1">
                    임상 증상 (환자 호소)
                  </div>
                  <div
                    className={`font-bold ${
                      painLevel > 50 ? "text-red-700 text-lg" : "text-blue-700"
                    }`}
                  >
                    {clinicalSign}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- 통합 퀴즈 영역 ----------------- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-8">
          <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
            <Brain size={24} className="text-purple-600" /> 임상 추론 및
            국가고시 대비 종합 평가
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Q1: 기초 생리 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-sm text-slate-800 mb-3">
                Q1. 정상 상태에서 가벼운 붓 터치(Aβ 섬유 활성화)를 적용했을 때,
                척수 수준에서 일어나는 올바른 반응은?
              </p>
              <div className="space-y-2">
                {[
                  "WDR의 활성을 억제하여 통증 관문을 닫는다.",
                  "노르에피네프린을 분비하여 교감신경을 항진시킨다.",
                  "WDR의 활성을 촉진하여 이질통을 유발한다.",
                ].map((option, idx) => (
                  <button
                    key={`q1-${idx}`}
                    onClick={() => setQuiz1Answer(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-sm border transition-colors ${
                      quiz1Answer === idx
                        ? idx === 0
                          ? "bg-green-100 border-green-500 text-green-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : "bg-white border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {idx + 1}. {option}
                  </button>
                ))}
              </div>
              {quiz1Answer !== null && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs font-medium ${
                    quiz1Answer === 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {quiz1Answer === 0
                    ? "✅ 정답! Aβ 섬유는 억제성 사이신경세포(SG)를 활성화하여 WDR로 가는 통증 신호를 차단합니다."
                    : "❌ 오답. Aβ 섬유 자체는 정상 상태에서 관문을 닫는 역할을 합니다."}
                </div>
              )}
            </div>

            {/* Q2: 병태 생리 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-sm text-slate-800 mb-3">
                Q2. CRPS 환자의 교감신경 과항진 시, 분비된 노르에피네프린(NE)이
                결합하여 SG의 '탈억제'를 유발하는 수용체는?
              </p>
              <div className="space-y-2">
                {[
                  "α1-아드레날린 수용체",
                  "α2-아드레날린 수용체",
                  "NMDA 수용체",
                ].map((option, idx) => (
                  <button
                    key={`q2-${idx}`}
                    onClick={() => setQuiz2Answer(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-sm border transition-colors ${
                      quiz2Answer === idx
                        ? idx === 1
                          ? "bg-green-100 border-green-500 text-green-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : "bg-white border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {idx + 1}. {option}
                  </button>
                ))}
              </div>
              {quiz2Answer !== null && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs font-medium ${
                    quiz2Answer === 1
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {quiz2Answer === 1
                    ? "✅ 정답! NE가 억제성인 α2 수용체에 결합하면 SG 세포가 과분극되어 억제능력을 상실(Disinhibition)합니다."
                    : "❌ 오답. α2 수용체가 탈억제의 핵심 기전입니다."}
                </div>
              )}
            </div>

            {/* Q3: 임상 신경학 (새로 추가됨) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-sm text-slate-800 mb-3">
                Q3. 무릎반사(Knee jerk reflex) 검사 시 나타나는 감각-운동 루프의
                신경 경로가 올바르게 짝지어진 것은?
              </p>
              <div className="space-y-2">
                {[
                  "감각: Ia 섬유 / 운동: 감마(γ) 운동신경",
                  "감각: Ia 섬유 / 운동: 알파(α) 운동신경",
                  "감각: C 섬유 / 운동: 알파(α) 운동신경",
                ].map((option, idx) => (
                  <button
                    key={`q3-${idx}`}
                    onClick={() => setQuiz3Answer(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-sm border transition-colors ${
                      quiz3Answer === idx
                        ? idx === 1
                          ? "bg-green-100 border-green-500 text-green-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : "bg-white border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {idx + 1}. {option}
                  </button>
                ))}
              </div>
              {quiz3Answer !== null && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs font-medium ${
                    quiz3Answer === 1
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {quiz3Answer === 1
                    ? "✅ 정답! 근방추의 일차종말(Ia)이 신장됨을 감지하고, 척수 앞뿔의 알파(α) 운동신경을 즉각 발화시켜 수축을 유발합니다."
                    : "❌ 오답. 감마 신경은 방추속근육을, C섬유는 통증을 조절합니다."}
                </div>
              )}
            </div>

            {/* Q4: 임상 중재 (새로 추가됨) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-sm text-slate-800 mb-3">
                Q4. 관절 가동술(Joint Mobilization) 적용 시 통증이 억제되는
                관문조절설의 신경생리학적 기전은?
              </p>
              <div className="space-y-2">
                {[
                  "Aδ 섬유의 전도 속도를 늦추어 뇌로 가는 신호를 지연시킨다.",
                  "감마(γ) 운동신경을 과활성화시켜 근방추의 민감도를 낮춘다.",
                  "피부 압각(Aβ)과 관절 수용기(Aα)를 동시 활성화하여 C 섬유의 전달을 억제한다.",
                ].map((option, idx) => (
                  <button
                    key={`q4-${idx}`}
                    onClick={() => setQuiz4Answer(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-sm border transition-colors ${
                      quiz4Answer === idx
                        ? idx === 2
                          ? "bg-green-100 border-green-500 text-green-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : "bg-white border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {idx + 1}. {option}
                  </button>
                ))}
              </div>
              {quiz4Answer !== null && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs font-medium ${
                    quiz4Answer === 2
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {quiz4Answer === 2
                    ? "✅ 정답! 전도 속도가 빠른 Aβ 및 Aα 섬유가 먼저 척수에 도달하여 억제성 사이신경세포(교양질)를 활성화합니다."
                    : "❌ 오답. 굵은 섬유(Aβ, Aα)의 빠른 억제 개입이 핵심입니다."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
