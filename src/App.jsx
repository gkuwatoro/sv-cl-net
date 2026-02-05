import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Monitor, 
  Smartphone, 
  Laptop, 
  ArrowRight, 
  ArrowLeftRight, 
  Globe, 
  Mail, 
  Search, 
  CheckCircle, 
  XCircle, 
  RefreshCcw, 
  Info,
  Users,
  Database,
  Video,
  PlayCircle,
  Lock,
  FileVideo,
  MessageCircle,
  Zap,
  Send,
  Cloud,
  TrendingUp,
  Box,
  Cpu
} from 'lucide-react';

// --- データセット ---

// クイズのプール
const QUIZ_POOL = [
  {
    id: 1,
    question: "Webページを閲覧する際に使われる「約束事（プロトコル）」はどれ？",
    options: ["SMTP", "HTTP / HTTPS", "DNS", "P2P"],
    answer: 1,
    explanation: "Webページを見るためのルールはHTTP（または暗号化されたHTTPS）です。SMTPはメール送信、DNSはドメイン名の変換に使われます。"
  },
  {
    id: 2,
    question: "クラウドサービス（AWSなど）の最大の特徴として正しいものは？",
    options: [
      "自社で物理的なサーバを購入して設置する必要がある",
      "必要な時に、必要な分だけサーバ能力を借りて利用できる",
      "インターネットに接続していなくても利用できる",
      "一度契約すると、サーバの台数を変更することができない"
    ],
    answer: 1,
    explanation: "クラウドは「所有」から「利用」への転換です。アクセス集中時に自動でサーバを増やしたり（オートスケーリング）、使った分だけ料金を支払う従量課金制が特徴です。"
  },
  {
    id: 3,
    question: "SNSのDM（チャット）が、通常のメールと大きく異なる点は？",
    options: [
      "文字しか送れない",
      "リアルタイム通信で、相手に即座にメッセージが表示される",
      "インターネットを使わずに通信している",
      "サーバを通さずに直接スマホ同士で通信している"
    ],
    answer: 1,
    explanation: "DMやチャットアプリは、サーバと常時接続（WebSocketなど）を保つことで、メールのような「問い合わせ」動作なしに、即座に相手にメッセージを届ける（プッシュする）ことができます。"
  },
  {
    id: 4,
    question: "Webメールを利用する際、ブラウザとWebサーバ間の通信で主に使われるプロトコルは？",
    options: [
      "SMTP",
      "POP3",
      "HTTPS",
      "FTP"
    ],
    answer: 2,
    explanation: "ブラウザとWebサーバの間は、Webページを見るのと同じHTTP（安全なHTTPS）で通信します。裏側のメール送信処理でSMTPが使われます。"
  },
  {
    id: 5,
    question: "動画ストリーミング配信の仕組みとして適切な記述は？",
    options: [
      "動画データを全てダウンロードし終わってから再生する",
      "データを小分けにして受信し、再生しながら同時に読み込む",
      "画質を落とさずに送るため、必ずCD-ROMで郵送される",
      "サーバからではなく、隣の家のテレビから受信する"
    ],
    answer: 1,
    explanation: "ストリーミング方式では、全てのデータの到着を待たず、バッファ（一時保存場所）にデータが溜まった順に再生していきます。"
  }
];

// --- コンポーネント ---

const App = () => {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              情報Ⅰ：ネットワークの仕組み
            </h1>
          </div>
          <nav className="hidden md:flex gap-1 bg-slate-100 p-1 rounded-lg">
            {['intro', 'structure', 'protocol', 'cloud', 'quiz'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'intro' && 'はじめに'}
                {tab === 'structure' && '2つの接続方式'}
                {tab === 'protocol' && 'サービスの裏側'}
                {tab === 'cloud' && 'クラウド'}
                {tab === 'quiz' && '確認テスト'}
              </button>
            ))}
          </nav>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-2 bg-slate-100 no-scrollbar">
           {['intro', 'structure', 'protocol', 'cloud', 'quiz'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-500 border border-slate-200'
                }`}
              >
                {tab === 'intro' && 'はじめに'}
                {tab === 'structure' && '接続方式'}
                {tab === 'protocol' && '裏側の仕組み'}
                {tab === 'cloud' && 'クラウド'}
                {tab === 'quiz' && 'テスト'}
              </button>
            ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'intro' && <IntroSection key="intro" onNext={() => setActiveTab('structure')} />}
          {activeTab === 'structure' && <StructureSection key="structure" />}
          {activeTab === 'protocol' && <ProtocolSection key="protocol" />}
          {activeTab === 'cloud' && <CloudSection key="cloud" />}
          {activeTab === 'quiz' && <QuizSection key="quiz" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

// 1. はじめにセクション
const IntroSection = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8 text-center py-12"
  >
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ArrowLeftRight className="w-10 h-10 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-slate-800">ネットワークの「カタチ」を知ろう</h2>
      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
        私たちが普段使っているインターネットやアプリ。<br/>
        実は、コンピュータ同士の「つなぎ方」や「会話のルール」にはいくつかの種類があります。<br/>
        この教材で、その仕組みを動かしながら学んでみましょう。
      </p>
      <button
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
      >
        学習をスタート <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

// 2. 接続方式の比較セクション
const StructureSection = () => {
  const [mode, setMode] = useState('client-server'); // 'client-server' | 'p2p'
  const [animating, setAnimating] = useState(false);

  // シミュレーション用アニメーションループ
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">ネットワークの構成方式</h2>
        <p className="text-slate-600">コンピュータ同士がどう繋がっているか、2つのパターンを見てみましょう。</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Controller */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setMode('client-server')}
            className={`flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center gap-2 ${
              mode === 'client-server' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Server className="w-5 h-5" /> クライアントサーバ方式
          </button>
          <button
            onClick={() => setMode('p2p')}
            className={`flex-1 py-4 text-center font-bold transition-colors flex items-center justify-center gap-2 ${
              mode === 'p2p' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Users className="w-5 h-5" /> P2P方式
          </button>
        </div>

        {/* Visualizer Area */}
        <div className="p-8 h-80 bg-slate-50 relative flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {mode === 'client-server' ? (
              <ClientServerVisual key="cs" animating={animating} />
            ) : (
              <P2PVisual key="p2p" animating={animating} />
            )}
          </AnimatePresence>
        </div>

        {/* Explanation Area */}
        <div className="p-6 bg-white border-t border-slate-100">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            {mode === 'client-server' ? 'クライアントサーバ方式の特徴' : 'P2P（ピアツーピア）方式の特徴'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2 text-sm">👍 メリット</h4>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {mode === 'client-server' ? (
                  <>
                    <li>データを一元管理しやすい</li>
                    <li>セキュリティ対策をサーバに集中できる</li>
                    <li>バックアップが容易</li>
                  </>
                ) : (
                  <>
                    <li>特定の親機が不要で低コスト</li>
                    <li>一部が故障しても全体は止まらない</li>
                    <li>アクセス集中に強い</li>
                  </>
                )}
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-2 text-sm">👎 デメリット</h4>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {mode === 'client-server' ? (
                  <>
                    <li>サーバがダウンすると全員使えなくなる</li>
                    <li>アクセスが集中すると遅くなる</li>
                    <li>高性能なサーバコンピュータが必要</li>
                  </>
                ) : (
                  <>
                    <li>データの管理・更新が難しい</li>
                    <li>セキュリティの責任が個々に分散する</li>
                    <li>ウイルス拡散のリスクがある</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-slate-100 rounded-md text-sm text-slate-600">
            <strong>用語解説：</strong>
            {mode === 'client-server' ? (
              <span>
                <span className="font-bold text-slate-800">サーバ</span> = サービスを提供する側（料理人）。<br/>
                <span className="font-bold text-slate-800">クライアント</span> = サービスを利用する側（お客さん）。
              </span>
            ) : (
              <span>
                <span className="font-bold text-slate-800">ピア</span> = 対等な仲間。<br/>
                サービスをする側・される側の区別がなく、みんなが持ちつ持たれつの関係です。
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Visual Components for Structure
const ClientServerVisual = ({ animating }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
      {/* Central Server */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="bg-blue-600 p-4 rounded-lg shadow-xl">
          <Server className="w-10 h-10 text-white" />
        </div>
        <span className="text-xs font-bold mt-2 text-blue-700 bg-white px-2 py-0.5 rounded shadow">サーバ</span>
      </div>

      {/* Clients */}
      {[0, 1, 2].map((i) => {
        const angle = (i * 120 + 90) * (Math.PI / 180);
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <React.Fragment key={i}>
            <div 
              className="absolute top-1/2 left-1/2 flex flex-col items-center z-10"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <div className="bg-white p-3 rounded-lg shadow border border-slate-200">
                {i === 0 ? <Laptop className="w-6 h-6 text-slate-600" /> : <Smartphone className="w-6 h-6 text-slate-600" />}
              </div>
              <span className="text-xs text-slate-500 mt-1 font-medium">クライアント</span>
            </div>
            
            {/* Data Flow Animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full z-0"
              animate={{
                x: animating ? 0 : x,
                y: animating ? 0 : y,
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
            {/* Connection Line */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              <line 
                x1="50%" y1="50%" 
                x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"
              />
            </svg>
          </React.Fragment>
        );
      })}
    </motion.div>
  );
};

const P2PVisual = ({ animating }) => {
  const positions = [
    { x: 0, y: -80 },
    { x: -80, y: 60 },
    { x: 80, y: 60 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
      {positions.map((pos, i) => (
        <div 
          key={i}
          className="absolute top-1/2 left-1/2 flex flex-col items-center z-10"
          style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
        >
          <div className="bg-indigo-100 p-3 rounded-lg shadow border border-indigo-200">
            <Laptop className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="text-xs text-indigo-500 mt-1 font-bold">ピア (対等)</span>
        </div>
      ))}

      {/* Mesh Connections & Data Flow */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <path d="M calc(50% + 0px) calc(50% - 80px) L calc(50% - 80px) calc(50% + 60px)" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M calc(50% - 80px) calc(50% + 60px) L calc(50% + 80px) calc(50% + 60px)" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M calc(50% + 80px) calc(50% + 60px) L calc(50% + 0px) calc(50% - 80px)" stroke="#cbd5e1" strokeWidth="2" />
      </svg>
      
      {/* Animated Packets Moving Between Nodes */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-500 rounded-full"
        animate={{
          x: [0, -80, 80, 0],
          y: [-80, 60, 60, -80],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-500 rounded-full"
        animate={{
          x: [80, -80, 0, 80],
          y: [60, 60, -80, 60],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </motion.div>
  );
};

// 3. プロトコルセクション
const ProtocolSection = () => {
  const [activeProto, setActiveProto] = useState(null);

  const protocols = [
    {
      id: 'webmail',
      name: 'Webメールの仕組み (閲覧)',
      icon: <div className="relative inline-block"><Mail className="w-8 h-8 text-indigo-500" /><Globe className="w-4 h-4 text-blue-400 absolute -bottom-1 -right-1 bg-white rounded-full border border-white" /></div>,
      desc: 'ブラウザでメールを確認する仕組み。',
      role: 'HTTPS + IMAP',
      detail: 'メールを見る時、ブラウザはWebサーバにページを要求(HTTPS)します。Webサーバは裏でメールサーバに「IMAP」でメール情報を問い合わせ、結果をWebページとしてあなたに返します。',
      action: '閲覧(HTTPS+IMAP)'
    },
    {
      id: 'dm',
      name: 'SNSのDM（チャット）',
      icon: <div className="relative inline-block"><MessageCircle className="w-8 h-8 text-pink-500" /><Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 bg-white rounded-full border border-white" /></div>,
      desc: 'インスタなどのリアルタイムなメッセージ。',
      role: 'リアルタイム通信',
      detail: 'DMやチャットは「WebSocket」などの技術でサーバと常時接続しています。「会話」のように、送信した瞬間に相手の画面にメッセージが表示（プッシュ）されるのが特徴です。',
      action: '会話(WebSocket)'
    },
    {
      id: 'streaming',
      name: '動画配信 (ストリーミング)',
      icon: <Video className="w-8 h-8 text-red-500" />,
      desc: '巨大な動画を少しずつ再生しながら送る。',
      role: 'HTTP Streaming',
      detail: '動画ファイル全体をダウンロードするのを待たず、小分けにしたデータ（セグメント）を順番に受け取り、バッファ（一時保存）しながら再生します。',
      action: '再生要求'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">現代のサーバ活用事例</h2>
        <p className="text-slate-600">
          多くのWebサービスは、目的に合わせて通信方式を使い分けています。<br/>
          「Webメール」、「SNSのDM」、「動画サイト」の違いを見てみましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        {protocols.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProto(activeProto === p.id ? null : p.id)}
            className={`text-left p-6 rounded-xl border-2 transition-all shadow-sm hover:shadow-md relative overflow-hidden ${
              activeProto === p.id ? 'border-blue-500 bg-blue-50' : 'border-white bg-white hover:border-blue-200'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-3 relative z-10">
              <div className="p-3 bg-white rounded-full shadow-sm">
                {p.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{p.name}</h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full mt-1 inline-block">
                  {p.role}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-snug">
                {p.desc}
              </p>
            </div>
            
            {/* Interactive hint */}
            <div className="mt-4 pt-4 border-t border-slate-200/50 text-center relative z-10">
               <span className="text-blue-600 text-xs font-bold flex items-center justify-center gap-1">
                 {activeProto === p.id ? '図解を閉じる' : '図解を見る'} 
                 {activeProto !== p.id && <ArrowRight className="w-3 h-3" />}
               </span>
            </div>
          </button>
        ))}
      </div>

      {/* Animation Stage */}
      <AnimatePresence mode="wait">
        {activeProto && (
          <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="overflow-hidden"
          >
            <div className="bg-slate-800 rounded-xl border-4 border-slate-700 shadow-inner p-4 mb-4">
              <div className="h-64 relative flex items-center justify-center">
                 <ProtocolSimulation type={activeProto} info={protocols.find(p => p.id === activeProto)} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
              <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                <Info className="w-5 h-5" /> 
                {activeProto === 'webmail' && 'Webメールの仕組み解説'}
                {activeProto === 'dm' && 'SNSのDM（チャット）の仕組み解説'}
                {activeProto === 'streaming' && '動画配信の仕組み解説'}
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {protocols.find(p => p.id === activeProto).detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!activeProto && (
         <div className="text-center p-8 text-slate-400 bg-slate-100 rounded-xl border border-dashed border-slate-300">
           上のカードをクリックして、データの流れを確認してみましょう。
         </div>
      )}
    </motion.div>
  );
};

const ProtocolSimulation = ({ type, info }) => {
  const isWebMail = type === 'webmail';
  const isDM = type === 'dm';
  const isStreaming = type === 'streaming';

  return (
    <div className="w-full h-full relative">
       
       {/* ---------------- Webメールのシミュレーション (閲覧フロー) ---------------- */}
       {isWebMail && (
         <div className="flex items-center justify-between px-4 h-full">
            {/* Client */}
            <div className="flex flex-col items-center z-10 w-24 relative">
               <Laptop className="w-12 h-12 text-slate-200" />
               <span className="text-white text-xs mt-2 font-bold">あなた</span>
               <div className="text-[10px] text-slate-400 mt-1">Webブラウザ</div>
            </div>

            {/* Connection 1: Client <-> WebServer */}
            <div className="flex-1 flex flex-col items-center justify-center relative h-full mx-2">
               <div className="w-full h-0.5 bg-slate-600 absolute top-1/2"></div>
               <span className="bg-slate-800 text-slate-300 text-[10px] px-2 relative -top-4">HTTPS (暗号化)</span>
               
               {/* Packet 1: HTTPS Request (Client -> Web) */}
               <motion.div
                  className="absolute top-1/2 -mt-5 bg-blue-500 text-white text-[9px] px-2 py-1 rounded shadow flex flex-col items-center z-20"
                  initial={{ left: '10%', opacity: 0 }}
                  animate={{ left: '80%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4.5 }}
               >
                 <span className="font-bold">HTTPS</span>
                 <span className="text-[8px]">要求: "メール見せて"</span>
               </motion.div>

               {/* Packet 4: HTTPS Response (Web -> Client) */}
               <motion.div
                  className="absolute top-1/2 mt-1 bg-green-500 text-white text-[9px] px-2 py-1 rounded shadow flex flex-col items-center z-20"
                  initial={{ right: '10%', opacity: 0 }}
                  animate={{ right: '80%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, delay: 4.5, repeat: Infinity, repeatDelay: 4.5 }}
               >
                 <span className="font-bold">HTTPS</span>
                 <span className="text-[8px]">応答: メール一覧画面</span>
               </motion.div>
            </div>

            {/* Web Server */}
            <div className="flex flex-col items-center z-10 w-28 relative">
               <div className="relative">
                 <Server className="w-14 h-14 text-blue-400" />
                 <Globe className="w-5 h-5 text-white absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5" />
               </div>
               <span className="text-white text-xs mt-2 font-bold">Webサーバ</span>
               <div className="text-[10px] text-blue-300 mt-1">「代理人」</div>
            </div>

            {/* Connection 2: WebServer <-> MailServer */}
            <div className="flex-1 flex flex-col items-center justify-center relative h-full mx-2">
               <div className="w-full h-0.5 bg-slate-600 absolute top-1/2"></div>
               <span className="bg-slate-800 text-slate-300 text-[10px] px-2 relative -top-4">IMAP (メール取得)</span>

               {/* Packet 2: IMAP Request (Web -> Mail) */}
               <motion.div
                  className="absolute top-1/2 -mt-5 bg-indigo-500 text-white text-[9px] px-2 py-1 rounded shadow flex flex-col items-center z-20"
                  initial={{ left: '10%', opacity: 0 }}
                  animate={{ left: '80%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 4.5 }}
               >
                 <span className="font-bold">IMAP</span>
                 <span className="text-[8px]">問い合わせ</span>
               </motion.div>

               {/* Packet 3: IMAP Response (Mail -> Web) */}
               <motion.div
                  className="absolute top-1/2 mt-1 bg-indigo-500 text-white text-[9px] px-2 py-1 rounded shadow flex flex-col items-center z-20"
                  initial={{ right: '10%', opacity: 0 }}
                  animate={{ right: '80%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, delay: 3.0, repeat: Infinity, repeatDelay: 4.5 }}
               >
                 <span className="font-bold">IMAP</span>
                 <span className="text-[8px]">メールデータ</span>
               </motion.div>
            </div>

            {/* Mail Server */}
            <div className="flex flex-col items-center z-10 w-24 relative">
               <Database className="w-12 h-12 text-indigo-300" />
               <span className="text-white text-xs mt-2 font-bold">メールサーバ</span>
               <div className="text-[10px] text-slate-400 mt-1">郵便局</div>
            </div>
         </div>
       )}

      {/* ---------------- DM (Chat) のシミュレーション ---------------- */}
       {isDM && (
         <div className="w-full h-full absolute inset-0">
           {/* 背景の接続線 (常時接続イメージ) */}
           <div className="absolute top-1/2 left-0 w-full px-20 z-0 transform -translate-y-1/2">
              <div className="w-full h-1 bg-yellow-500/20 rounded-full"></div>
              <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-[10px] text-yellow-300/80">
                常時接続 (WebSocketなど)
              </span>
           </div>

           {/* 配置レイアウト */}
           <div className="flex items-center justify-between px-8 h-full relative z-10">
              {/* Client A (Left) */}
              <div className="flex flex-col items-center w-20 relative">
                 <Smartphone className="w-12 h-12 text-pink-300" />
                 <span className="text-white text-xs mt-2 font-bold">あなた</span>
                 
                 {/* Balloon A */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0, y: 10 }}
                   animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0], y: [10, -20, -20, 10] }}
                   transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                   className="absolute -top-4 right-0 bg-white text-slate-800 text-[10px] px-2 py-1 rounded-lg rounded-bl-none shadow z-30"
                 >
                   送信！
                 </motion.div>
              </div>
              
              {/* Server (Center) */}
              <div className="flex flex-col items-center w-24 relative">
                 <div className="relative">
                    <Server className="w-14 h-14 text-yellow-500" />
                    <MessageCircle className="w-5 h-5 text-white absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1" />
                 </div>
                 <span className="text-white text-xs mt-2 font-bold">チャットサーバ</span>
                 <div className="text-[10px] text-yellow-300 mt-1">即座に転送</div>
              </div>

              {/* Client B (Right) */}
              <div className="flex flex-col items-center w-20 relative">
                 <Smartphone className="w-12 h-12 text-purple-300" />
                 <span className="text-white text-xs mt-2 font-bold">友達</span>
                 
                 {/* Balloon B */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0, y: 10 }}
                   animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0], y: [10, -20, -20, 10] }}
                   transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 3 }}
                   className="absolute -top-4 left-0 bg-white text-slate-800 text-[10px] px-2 py-1 rounded-lg rounded-br-none shadow z-30"
                 >
                   返信！
                 </motion.div>
              </div>
           </div>

           {/* --- アニメーションパケット (全体座標で制御) --- */}
           
           {/* 1. A -> Server (送信) */}
           <motion.div 
             className="absolute top-1/2 -mt-3 z-20 flex flex-col items-center"
             initial={{ left: '10%', opacity: 0 }}
             animate={{ left: '50%', opacity: 1 }}
             transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 5.2 }}
           >
             <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow">
               <Send className="w-3 h-3" />
             </div>
           </motion.div>

           {/* 2. Server -> B (Push) : 高速移動 */}
           <motion.div 
             className="absolute top-1/2 -mt-3 z-20 flex flex-col items-center"
             initial={{ left: '50%', opacity: 0 }}
             animate={{ left: '90%', opacity: 1 }}
             transition={{ duration: 0.4, delay: 0.8, repeat: Infinity, repeatDelay: 5.6 }}
           >
             <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow animate-pulse">
               <Zap className="w-3 h-3" />
             </div>
             <span className="text-[9px] text-yellow-300 font-bold whitespace-nowrap mt-1">Push!</span>
           </motion.div>
           
           {/* 3. B -> Server (返信) */}
           <motion.div 
             className="absolute top-1/2 mt-1 z-20 flex flex-col items-center"
             initial={{ left: '90%', opacity: 0 }}
             animate={{ left: '50%', opacity: 1 }}
             transition={{ duration: 0.8, delay: 3.5, repeat: Infinity, repeatDelay: 5.2 }}
           >
             <div className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow">
               <Send className="w-3 h-3 transform rotate-180" />
             </div>
           </motion.div>

           {/* 4. Server -> A (Push) : 高速移動 */}
           <motion.div 
             className="absolute top-1/2 mt-1 z-20 flex flex-col items-center"
             initial={{ left: '50%', opacity: 0 }}
             animate={{ left: '10%', opacity: 1 }}
             transition={{ duration: 0.4, delay: 4.3, repeat: Infinity, repeatDelay: 5.6 }}
           >
             <div className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow animate-pulse">
               <Zap className="w-3 h-3" />
             </div>
             <span className="text-[9px] text-yellow-300 font-bold whitespace-nowrap mt-1">Push!</span>
           </motion.div>

         </div>
       )}

       {/* ---------------- 動画配信のシミュレーション ---------------- */}
       {isStreaming && (
         <div className="flex items-center justify-between px-8 h-full">
            {/* Client with Buffer */}
            <div className="flex flex-col items-center z-10 w-28 relative">
               <div className="relative">
                 <Monitor className="w-14 h-14 text-slate-200" />
                 {/* Video Screen Simulation */}
                 <div className="absolute top-1 left-1 w-12 h-9 bg-black rounded overflow-hidden flex items-center justify-center">
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <PlayCircle className="w-5 h-5 text-red-500" />
                    </motion.div>
                 </div>
               </div>
               <span className="text-white text-xs mt-2 font-bold">あなた</span>
               
               {/* Buffer Gauge */}
               <div className="mt-2 w-full">
                 <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                   <span>再生中...</span>
                   <span>Buffer</span>
                 </div>
                 <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600 relative">
                   {/* Played part */}
                   <motion.div 
                      className="absolute left-0 top-0 h-full bg-slate-500/50"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   />
                   {/* Buffered part */}
                   <motion.div 
                      className="absolute left-0 top-0 h-full bg-red-500"
                      initial={{ width: '0%' }}
                      animate={{ width: ['20%', '50%', '40%', '80%', '60%'] }}
                      transition={{ duration: 4, repeat: Infinity }}
                   />
                 </div>
               </div>
            </div>

            {/* Streaming Flow */}
            <div className="flex-1 flex flex-col items-center justify-center relative h-full mx-4">
               <div className="w-full h-0.5 bg-slate-600 dashed absolute top-1/2"></div>
               <span className="bg-slate-800 text-slate-300 text-[10px] px-2 relative -top-6">HTTP/HTTPS ストリーミング</span>
               
               {/* Packets (Segments) */}
               {[0, 1, 2, 3].map((i) => (
                 <motion.div
                    key={i}
                    className="absolute top-1/2 -mt-2 bg-red-500 border border-red-300 text-white w-6 h-4 rounded flex items-center justify-center shadow-lg z-20"
                    initial={{ right: '0%', opacity: 0, scale: 0.8 }}
                    animate={{ right: '100%', opacity: [0, 1, 1, 0], scale: 1 }}
                    transition={{ 
                      duration: 3, 
                      delay: i * 0.8, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                 >
                   <FileVideo className="w-3 h-3" />
                 </motion.div>
               ))}
            </div>

            {/* Video Server */}
            <div className="flex flex-col items-center z-10 w-24 relative">
               <div className="relative">
                 <Server className="w-14 h-14 text-red-400" />
                 <Video className="w-5 h-5 text-white absolute -bottom-1 -right-1 bg-red-600 rounded-full p-1" />
               </div>
               <span className="text-white text-xs mt-2 font-bold">動画配信サーバ</span>
               <div className="text-[10px] text-red-300 mt-1">巨大データ</div>
            </div>
         </div>
       )}
    </div>
  );
};

// 4. クラウドセクション（新規追加）
const CloudSection = () => {
  const [traffic, setTraffic] = useState(1); // 1: Low, 2: Mid, 3: High
  const [servers, setServers] = useState(1);
  const [mode, setMode] = useState('cloud'); // 'onpremise' | 'cloud'

  // オートスケーリングのロジック
  useEffect(() => {
    if (mode === 'cloud') {
       // クラウド：負荷に合わせてサーバ台数を変更
       setServers(traffic); 
    } else {
       // オンプレミス：固定（増えない）
       setServers(1); 
    }
  }, [traffic, mode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
           <Cloud className="w-8 h-8 text-blue-500" />
           現代のインフラ「クラウド」
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          AWS (Amazon Web Services) などのクラウドサービスは、インターネット越しに
          <strong>「必要な時に、必要な分だけ」</strong>コンピュータの能力を借りる仕組みです。
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Comparison Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50">
           <button 
             onClick={() => setMode('onpremise')}
             className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'onpremise' ? 'bg-white text-slate-700 border-t-2 border-slate-500 shadow-sm' : 'text-slate-400'}`}
           >
             <Box className="w-4 h-4" /> 昔：オンプレミス（自社所有）
           </button>
           <button 
             onClick={() => setMode('cloud')}
             className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'cloud' ? 'bg-white text-blue-600 border-t-2 border-blue-500 shadow-sm' : 'text-slate-400'}`}
           >
             <Cloud className="w-4 h-4" /> 今：クラウド（AWSなど）
           </button>
        </div>

        {/* Simulation Area */}
        <div className="p-8 bg-slate-900 text-white relative overflow-hidden min-h-[300px]">
           {/* Controls */}
           <div className="absolute top-4 left-4 z-20 bg-slate-800/80 p-3 rounded-lg backdrop-blur-sm border border-slate-700">
             <div className="text-xs text-slate-400 mb-2 font-bold flex items-center gap-1">
               <TrendingUp className="w-3 h-3" /> アクセス負荷レベル
             </div>
             <div className="flex gap-2">
               {[1, 2, 3].map((level) => (
                 <button
                   key={level}
                   onClick={() => setTraffic(level)}
                   className={`w-8 h-8 rounded font-bold text-sm transition-all ${
                     traffic === level 
                       ? 'bg-blue-500 text-white scale-110 shadow-lg' 
                       : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                   }`}
                 >
                   {level === 1 ? '低' : level === 2 ? '中' : '高'}
                 </button>
               ))}
             </div>
           </div>
           
           {/* Status Display */}
           <div className="absolute top-4 right-4 z-20 text-right">
              <div className={`text-sm font-bold mb-1 ${mode === 'cloud' && traffic > 1 ? 'text-green-400' : 'text-slate-300'}`}>
                {mode === 'cloud' ? 'オートスケーリング有効' : 'サーバ台数固定'}
              </div>
              <div className="text-xs text-slate-400">
                稼働サーバ: <span className="text-xl font-bold text-white">{servers}</span> 台
              </div>
              {mode === 'onpremise' && traffic > 1 && (
                <div className="text-red-400 text-xs font-bold mt-1 animate-pulse">
                   ⚠️ 負荷上昇中！処理能力不足の恐れ
                </div>
              )}
           </div>

           {/* Visualization */}
           <div className="flex flex-col items-center justify-center h-full pt-12 space-y-8">
              {/* Traffic Flow */}
              <div className="w-full max-w-md h-4 bg-slate-800 rounded-full relative overflow-hidden border border-slate-700">
                 <motion.div 
                   className={`h-full ${traffic === 1 ? 'bg-green-500' : traffic === 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                   animate={{ width: `${traffic * 33}%` }}
                   transition={{ duration: 0.5 }}
                 />
                 <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-white/90">
                    ユーザーアクセス流入
                 </span>
              </div>

              {/* Servers */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                 <AnimatePresence>
                   {Array.from({ length: servers }).map((_, i) => (
                     <motion.div
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0, opacity: 0 }}
                       className="relative"
                     >
                        <div className={`p-4 rounded-xl border-2 shadow-xl flex flex-col items-center gap-2 ${
                           mode === 'cloud' ? 'bg-blue-900/50 border-blue-500' : 'bg-slate-700 border-slate-500'
                        }`}>
                           <Server className={`w-10 h-10 ${mode === 'cloud' ? 'text-blue-300' : 'text-slate-300'}`} />
                           <span className="text-[10px] font-bold opacity-70">Server {i + 1}</span>
                           <motion.div 
                             className="w-2 h-2 rounded-full bg-green-400"
                             animate={{ opacity: [0.5, 1, 0.5] }}
                             transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                           />
                        </div>
                        {mode === 'cloud' && i > 0 && (
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: -10, opacity: 1 }}
                            className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[9px] text-green-400 font-bold whitespace-nowrap"
                          >
                            + Auto Scale
                          </motion.div>
                        )}
                     </motion.div>
                   ))}
                   
                   {/* On-premise Overload Simulation */}
                   {mode === 'onpremise' && traffic > 1 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                         <motion.div 
                           animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                           transition={{ duration: 0.5, repeat: Infinity }}
                         >
                            <XCircle className="w-24 h-24 text-red-500/30" />
                         </motion.div>
                      </div>
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Explanation */}
        <div className="p-6 bg-white border-t border-slate-100">
           <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-slate-800">
             <Info className="w-5 h-5 text-blue-500" />
             {mode === 'onpremise' ? 'オンプレミス（自社所有）の課題' : 'クラウド（AWSなど）のメリット'}
           </h3>
           <p className="text-sm text-slate-600 leading-relaxed mb-4">
             {mode === 'onpremise' 
               ? '自前でサーバを持つ場合、急にアクセスが増えてもすぐにサーバを追加できません。逆に、アクセスが少ない時は高いサーバが無駄になってしまいます。' 
               : 'クラウドなら、プログラムが自動で混雑を検知し、数秒で新しいサーバ（仮想マシン）を立ち上げて処理を分担します（オートスケーリング）。混雑が収まれば自動で減るため、無駄なコストもかかりません。'}
           </p>
           
           <div className="bg-slate-100 p-3 rounded-lg text-xs text-slate-500 flex flex-col gap-1">
             <div className="flex gap-2">
               <span className="font-bold w-20">キーワード:</span>
               <span>
                 <span className="font-bold text-slate-700">仮想化 (Virtualization)</span>: 1台の物理マシンの上で、ソフトウェア的に複数のコンピュータを作る技術。クラウドの基盤技術。
               </span>
             </div>
             <div className="flex gap-2">
               <span className="font-bold w-20">例:</span>
               <span>AWS (Amazon), Azure (Microsoft), GCP (Google) など</span>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// 5. クイズセクション
const QuizSection = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize Quiz
  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = () => {
    // Shuffle and pick 3
    const shuffled = [...QUIZ_POOL].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === questions[currentIndex].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      resetQuestionState();
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return <div className="p-8 text-center">Loading...</div>;

  if (showResult) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12 bg-white rounded-2xl shadow-xl border border-slate-100"
      >
        <div className="mb-6">
          {score === 3 ? (
             <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
               <span className="text-4xl">🏆</span>
             </div>
          ) : (
            <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
               <span className="text-4xl">📝</span>
             </div>
          )}
          <h2 className="text-3xl font-bold mb-2">結果発表</h2>
          <p className="text-slate-600">あなたのスコア</p>
        </div>
        
        <div className="text-5xl font-bold text-blue-600 mb-8">
          {score} / {questions.length}
        </div>

        {score === 3 && (
          <p className="text-orange-500 font-bold text-lg mb-8 animate-bounce">
            全問正解！素晴らしい理解度です！
          </p>
        )}
        
        <button
          onClick={startQuiz}
          className="bg-slate-800 text-white px-8 py-3 rounded-full hover:bg-slate-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCcw className="w-4 h-4" /> もう一度挑戦する
        </button>
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">Q{currentIndex + 1}</span>
           知識チェック
        </h2>
        <span className="text-slate-400 text-sm">あと {questions.length - currentIndex} 問</span>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 mb-6">
        <h3 className="text-lg font-bold mb-6 text-slate-800 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let baseClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
            if (!isAnswered) {
              baseClass += "border-slate-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
            } else {
              if (idx === currentQ.answer) {
                 baseClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedOption) {
                 baseClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                 baseClass += "border-slate-100 text-slate-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={baseClass}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.answer && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {isAnswered && idx === selectedOption && idx !== currentQ.answer && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-100 p-5 rounded-xl mb-6"
          >
            <div className="font-bold text-blue-800 mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" /> 解説
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {currentQ.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={!isAnswered}
          className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
            isAnswered 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentIndex === questions.length - 1 ? '結果を見る' : '次の問題へ'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default App;