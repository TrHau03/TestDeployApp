'use client';

import { cn } from '@/app/_internal/utils/style';
import http from '@/client/integration/http';
import { useApiWithErrorHandler } from '@/components/common/useApiWithErrorHandler';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconSend from '@/components/icon/icon-send';
import { MarketSentiment } from '@/core/agent';
import { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Chat } from '../types';

const htmlContent = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Navigating the Crypto Market: Insights for New Investors</title> <style> :root { --primary-color: #2563eb; --secondary-color: #3b82f6; --accent-color: #1e40af; --text-color: #1e293b; --light-text-color: #64748b; --bg-color: #f8fafc; --card-bg: #ffffff; --border-color: #e2e8f0; --success-color: #10b981; --warning-color: #f59e0b; --danger-color: #ef4444; --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); --border-radius: 0.5rem; } /* Apply different color schemes based on audience */ .beginner { --primary-color: #0ea5e9; --secondary-color: #38bdf8; --accent-color: #0284c7; } .intermediate { --primary-color: #8b5cf6; --secondary-color: #a78bfa; --accent-color: #7c3aed; } .advanced { --primary-color: #1d4ed8; --secondary-color: #3b82f6; --accent-color: #1e40af; } body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: var(--text-color); background-color: var(--bg-color); margin: 0; padding: 0; } .container { max-width: 1100px; margin: 0 auto; padding: 2rem; } header { text-align: center; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; } h1 { color: var(--primary-color); font-size: 2.25rem; margin-bottom: 0.5rem; } .metadata { display: flex; justify-content: center; gap: 1.5rem; font-size: 0.875rem; color: var(--light-text-color); margin-bottom: 1rem; } .metadata span { display: flex; align-items: center; gap: 0.25rem; } .audience-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background-color: var(--primary-color); color: white; } .executive-summary { background-color: var(--card-bg); border-radius: var(--border-radius); padding: 1.5rem; margin-bottom: 2rem; box-shadow: var(--card-shadow); border-left: 4px solid var(--primary-color); } section { background-color: var(--card-bg); border-radius: var(--border-radius); padding: 1.5rem; margin-bottom: 2rem; box-shadow: var(--card-shadow); } h2 { color: var(--primary-color); font-size: 1.5rem; margin-top: 0; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; } .market-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; } @media (max-width: 768px) { .market-grid { grid-template-columns: 1fr; } } .market-card { background-color: var(--bg-color); border-radius: var(--border-radius); padding: 1.25rem; border: 1px solid var(--border-color); } .market-card h3 { color: var(--accent-color); margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem; } .trend { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem; } .trend.bearish { background-color: rgba(239, 68, 68, 0.1); color: var(--danger-color); } .trend.bullish { background-color: rgba(16, 185, 129, 0.1); color: var(--success-color); } .trend.neutral { background-color: rgba(245, 158, 11, 0.1); color: var(--warning-color); } .confidence { display: inline-block; font-size: 0.875rem; color: var(--light-text-color); margin-left: 0.5rem; } .outlook { margin-bottom: 0.75rem; } .outlook strong { color: var(--accent-color); } .recommendations-list { padding-left: 1.25rem; } .recommendations-list li { margin-bottom: 0.75rem; } .recommendations-list li:last-child { margin-bottom: 0; } /* Academic evaluation styles */ .academic-section { margin-top: 2rem; } .criteria-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; } @media (max-width: 768px) { .criteria-grid { grid-template-columns: 1fr; } } .criterion-card { background-color: var(--bg-color); border-radius: var(--border-radius); padding: 1rem; border: 1px solid var(--border-color); } .criterion-card h4 { color: var(--accent-color); margin-top: 0; margin-bottom: 0.5rem; font-size: 1rem; } .score-bar { height: 8px; background-color: var(--border-color); border-radius: 4px; margin-bottom: 0.75rem; overflow: hidden; position: relative; } .score-fill { height: 100%; position: absolute; left: 0; top: 0; border-radius: 4px; } .score-text { font-size: 0.875rem; color: var(--light-text-color); margin-bottom: 0.5rem; } .academic-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; margin-top: 1rem; } .research-grade { background-color: rgba(16, 185, 129, 0.1); color: var(--success-color); } .professional-grade { background-color: rgba(59, 130, 246, 0.1); color: var(--primary-color); } .commercial-grade { background-color: rgba(245, 158, 11, 0.1); color: var(--warning-color); } .informational-grade { background-color: rgba(239, 68, 68, 0.1); color: var(--danger-color); } footer { text-align: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); color: var(--light-text-color); font-size: 0.875rem; } .topics { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; } .topic { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; background-color: rgba(59, 130, 246, 0.1); color: var(--primary-color); } /* Technical Analysis specific styles */ .technical-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; } .indicator { display: flex; align-items: center; margin-bottom: 0.5rem; } .indicator-name { font-weight: 600; width: 100px; color: var(--accent-color); } .indicator-value { flex: 1; } /* Risk meter styles */ .risk-meter { height: 8px; background-color: #e5e7eb; border-radius: 4px; margin: 1rem 0; position: relative; } .risk-level { height: 100%; border-radius: 4px; position: absolute; left: 0; } .risk-low { background-color: var(--success-color); width: 33%; } .risk-medium { background-color: var(--warning-color); width: 66%; } .risk-high { background-color: var(--danger-color); width: 100%; } /* Improved market card styles */ .market-card { transition: all 0.2s ease-in-out; } .market-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); } </style> </head> <body class="beginner"> <div class="container"> <header> <h1>Navigating the Crypto Market: Insights for New Investors</h1> <div class="metadata"> <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg> Estimated reading time is approximately 7 minutes </span> <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path> <polyline points="22 4 12 14.01 9 11.01"></polyline> </svg> Complexity: 3/10 </span> <span class="audience-badge"> Beginner </span> </div> </header> <div class="executive-summary"> <p>The cryptocurrency market is currently experiencing a downturn, with Bitcoin and Ethereum facing short-term challenges. However, long-term prospects remain promising, driven by technological upgrades and growing institutional interest. This report aims to guide beginners through the current market landscape, offering simple strategies for navigating these turbulent times.</p> </div> <section> <h2>Market Analysis</h2> <div class="market-grid"> <div class="market-card"> <h3>Bitcoin</h3> <div class="trend bearish">Bearish</div> <div class="outlook"> <strong>Short-term:</strong> Bitcoin is currently in a downward trend, primarily due to global economic concerns. </div> <p>Bitcoin is currently in a downward trend, primarily due to global economic concerns. Think of it like a roller coaster that’s on a downward slope right now, but with the potential to climb back up over time. Despite the short-term drop, many big companies are still interested in Bitcoin, which suggests confidence in its future.</p> </div> <div class="market-card"> <h3>Ethereum</h3> <div class="trend bearish">Bearish</div> <div class="outlook"> <strong>Short-term:</strong> Ethereum, often seen as the second most popular cryptocurrency, is also experiencing a drop in value. </div> <p>Ethereum, often seen as the second most popular cryptocurrency, is also experiencing a drop in value. This is partly because it tends to follow Bitcoin’s lead, much like how a younger sibling might imitate an older one. However, Ethereum has a big update coming soon, called Ethereum 2.0, which aims to make it faster and more efficient, hinting at a brighter future.</p> </div> </div> </section> <section> <h2>Global Market Comparison</h2> <div class="market-grid"> <div class="market-card"> <h3>US Markets</h3> <p>In the United States, the markets are quite jumpy right now, much like a bumpy road due to new tariff announcements and fears of an economic slowdown. This uncertainty also affects how people view cryptocurrencies.</p> </div> <div class="market-card"> <h3>Asian Markets</h3> <p>Asian markets are also facing challenges, driven by concerns over trade disagreements and slowing economic growth. However, some countries in Asia are offering clearer rules for cryptocurrencies, which might help these markets recover faster.</p> </div> </div> <div class="market-card"> <h3>Regional Outlook Comparison</h3> <p>The differences between the US and Asian markets show that while both are affected by global issues, Asia might have more potential for growth due to regulatory clarity. These regional variations could offer different opportunities for investors.</p> </div> </section> <section> <h2>Market Sentiment</h2> <div class="market-card"> <h3>Fear &amp; Greed Index</h3> <div class="trend bearish">Extreme Fear</div> <p>The market is currently in a state of &#039;Extreme Fear,&#039; much like when people panic during a storm. Historically, this extreme fear can sometimes be a good opportunity to buy, as prices may eventually recover.</p> </div> </section> <section> <h2>Technical Analysis</h2> <div class="market-card"> <h3>Technical Indicators</h3> <p>Bitcoin and Ethereum are both trading below their 50-day moving averages, which is a bit like sailing against the wind. This suggests that prices might continue to face downward pressure in the short term. However, the Relative Strength Index (RSI) indicates that prices might stabilize soon.</p> </div> </section> <section> <h2>Volume &amp; Trading Patterns</h2> <div class="market-card"> <h3>Volume Insights</h3> <p>Trading volumes are currently low, suggesting that fewer people are buying and selling cryptocurrencies right now. Typically, when prices drop, more people sell, which increases the volume. This pattern is not unusual during times of market fear.</p> </div> </section> <section> <h2>Market Correlations</h2> <div class="market-card"> <h3>Asset Relationships</h3> <p>Bitcoin is starting to behave differently from traditional stocks, which means it might not always react the same way to economic news. Meanwhile, Ethereum is showing some potential strength compared to Bitcoin, suggesting that investors might be shifting their focus.</p> </div> </section> <section> <h2>Risk Assessment</h2> <div class="market-card"> <h3>Key Risk Factors</h3> <p>Expect increased volatility in Bitcoin prices, making them unpredictable. Important upcoming events include the Federal Open Market Committee meeting on April 15, options expiry on April 28, and the Ethereum protocol upgrade on May 5. These events could affect market movements significantly.</p> </div> </section> <section> <h2>Recommendations</h2> <ul class="recommendations-list"> <li>For beginners, consider buying small amounts of Bitcoin regularly instead of making large purchases. This approach, known as 'dollar-cost averaging,' can help manage risk during uncertain times.</li><li>Stay informed about major updates like Ethereum 2.0, as they could impact the market positively in the long term.</li> </ul> </section> <section> <h2>Academic Quality Assessment</h2> <div class="market-card"> <h3>Quality Classification</h3> <div class="trend bearish"> Informational Grade <span class="confidence">Score: 60/100</span> </div> <p>This analysis meets Informational Grade standards with a score of 60/100.</p> <h4>Areas for Improvement:</h4> <ul class="recommendations-list"> <li>Enhance source quality by utilizing more authoritative financial sources.</li> <li>Enhance theoretical grounding by incorporating more established economic and financial theories.</li> <li>Enhance analytical depth by providing more detailed examination of market factors.</li> <li>Enhance alternative perspectives by considering more alternative viewpoints and scenarios.</li> </ul> </div> <div class="criteria-grid"> <div class="criterion-card"> <h4>Source Quality</h4> <div class="score-bar"> <div class="score-fill" style="width: 30%; background-color: var(--danger-color)"></div> </div> <div class="score-text">Score: 30/100</div> <p>Analysis would benefit from more authoritative financial sources.</p> </div> <div class="criterion-card"> <h4>Analytical Depth</h4> <div class="score-bar"> <div class="score-fill" style="width: 56.53%; background-color: var(--danger-color)"></div> </div> <div class="score-text">Score: 56.53/100</div> <p>Analysis would benefit from deeper examination of market dynamics.</p> </div> <div class="criterion-card"> <h4>Methodological Rigor</h4> <div class="score-bar"> <div class="score-fill" style="width: 85%; background-color: var(--success-color)"></div> </div> <div class="score-text">Score: 85/100</div> <p>Analysis demonstrates a structured methodology with comprehensive coverage of key market segments and factors.</p> </div> <div class="criterion-card"> <h4>Theoretical Grounding</h4> <div class="score-bar"> <div class="score-fill" style="width: 60%; background-color: var(--warning-color)"></div> </div> <div class="score-text">Score: 60/100</div> <p>Analysis incorporates some economic and financial theoretical concepts.</p> </div> <div class="criterion-card"> <h4>Alternative Perspectives</h4> <div class="score-bar"> <div class="score-fill" style="width: 60%; background-color: var(--warning-color)"></div> </div> <div class="score-text">Score: 60/100</div> <p>Analysis would benefit from more consideration of alternative viewpoints.</p> </div> </div> </section> <footer> <p>This report was generated on April 8, 2025 based on market data and analysis with Ainosha Platform.</p> <div class="topics"> <span class="topic">Bitcoin</span> <span class="topic">Ethereum</span> <span class="topic">Market Trends</span> <span class="topic">Regulatory Outlook</span> <span class="topic">Risk Management</span> </div> </footer> </div> </body> </html>


`

type ChatWindowProps = {
  chat: Chat;
};

const data = [
  {
    key: '1',
    content: 'Hello. How are you?',
  },
  {
    key: '2',
    content: 'I am fine.',
  },
  {
    key: '3',
    content: 'What can I do for you?',
  },
  {
    key: '4',
    content: 'The sentiment of the market is positive.',
  },
  {
    key: '5',
    content: 'The price of BTC is increasing.',
  },
  {
    key: '6',
    content: 'The price of ETH is decreasing.',
  },
  {
    key: '7',
    content: 'The price of LINK is stable.',
  },
  {
    key: '8',
    content: 'The price of BNB is increasing.',
  },
  {
    key: '9',
    content: 'The price of USDT is stable.',
  },
];

export default function ChatWindow({ chat }: ChatWindowProps) {
  const ref = useRef<HTMLElement>(null);
  const [message, setMessage] = useState<string>('');
  const [agentChats, setAgentChats] = useState<{ content: string; key: string }[]>(data);
  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'LINK' | 'USDT' | 'BNB' | 'USD'>('BTC');
  const [selectedPeriod, setSelectedPeriod] = useState<'1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '7d' | '30d'>(
    '1h',
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { agent } = chat;

  const {
    data: marketSentimentData,
    trigger: requestMarketSentiment,
    loading: isRequestingMarketSentiment,
  } = useApiWithErrorHandler(async () => {
    const res = await http.get('/api/agents/market-sentiment/analytics').json<{ data: MarketSentiment }>();
    setAgentChats((prev) => [
      ...prev,
      {
        ...res.data,
        key: String(Date.now()),
      },
    ]);
    return res;
  });

  const {
    data: tokenData,
    trigger: requestToken,
    loading: isRequestingToken,
  } = useApiWithErrorHandler(async () => {
    const res = await http
      .post('/api/agents/token/analytics', {
        json: { symbol: selectedCoin, period: selectedPeriod },
      })
      .json<{ data: { content: string } }>();
    setAgentChats((prev) => [
      ...prev,
      {
        ...res.data,
        key: String(Date.now()),
      },
    ]);
    return res;
  });

  useEffect(() => {
    setMessage('');
    setAgentChats([]);
  }, [chat]);

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [agentChats]);

  const handleSelectCoin = (coin: typeof selectedCoin) => {
    setSelectedCoin(coin);
    setIsDropdownOpen(false);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (agent.type === 'market-sentiment') {
      requestMarketSentiment();
    } else if (agent.type === 'coin') {
      requestToken();
    }
    setMessage('');
  };
  return (
//     <div className="relative h-full">
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center space-x-2 rtl:space-x-reverse">
//           <div className="relative flex-none">
//             <img
//               src={agent.avatarURL}
//               className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
//               alt={agent.name}
//             />
//             <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
//               <div className="h-4 w-4 rounded-full bg-success"></div>
//             </div>
//           </div>
//           <div className="mx-3">
//             <p className="font-semibold">{agent.name}</p>
//             <p className="text-xs text-white-dark">Last seen at 2:05 PM</p>
//           </div>
//         </div>
//       </div>

//       <div className="h-px w-full border-b border-primary/30" />
//       <PerfectScrollbar
//         className={cn('ps relative h-full', {
//           'sm:h-[calc(100vh_-_312px)]': agent.type === 'market-sentiment',
//           'sm:h-[calc(100vh_-_350px)]': agent.type === 'coin',
//         })}
//         containerRef={(container) => {
//           ref.current = container;
//         }}
//       >
//         <div className="space-y-5 overflow-auto p-4 pb-[68px] sm:max-h-[480px] sm:min-h-[300px] sm:pb-0">
//           {agentChats.map((message) => (
//             <div key={message.key}>
//               <div className="flex items-start gap-3">
//                 <div className="flex-none">
//                   <img src={agent.avatarURL} className="h-10 w-10 rounded-full object-cover" alt={agent.name} />
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-3">
//                     <div className="rounded-md bg-black/10 p-4 py-2 text-white-dark dark:bg-gray-800 ltr:rounded-bl-none rtl:rounded-br-none">
//                       <span>{message.content}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {(isRequestingMarketSentiment || isRequestingToken) && (
//             <div className="flex animate-pulse items-start gap-3">
//               <div className="flex-none">
//                 <img
//                   src={agent.avatarURL}
//                   className="h-10 w-10 rounded-full object-cover opacity-60"
//                   alt={agent.name}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-md bg-black/10 p-4 py-2 text-white-dark dark:bg-gray-800 ltr:rounded-bl-none rtl:rounded-br-none">
//                     <span>Generating response...</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </PerfectScrollbar>
//       <div className="absolute bottom-0 left-0 right-0 w-full p-4">
//   <form onSubmit={handleGenerate}>
//     <div className="flex w-full items-center space-x-3 rtl:space-x-reverse">
//       {agent.type !== 'coin' ? (
//         <div className="relative flex-1">
//           <input
//             className="form-input w-full rounded-full border-1 border-[#6b7280] bg-[#f4f4f4] px-6 py-2 focus:outline-none"
//             placeholder="Type a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </div>
//       ) : (
//         <>
//           <select
//             value={selectedCoin}
//             onChange={(e) => handleSelectCoin(e.target.value as typeof selectedCoin)}
//             className="form-input flex-1 rounded-full bg-[#f4f4f4] px-4 py-2"
//           >
//             {['BTC', 'ETH', 'LINK', 'USDT', 'BNB', 'USD'].map((coin) => (
//               <option key={coin} value={coin}>
//                 {coin}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
//             className="form-input flex-1 rounded-full bg-[#f4f4f4] px-4 py-2"
//           >
//             {['1m', '5m', '15m', '30m', '1h', '4h', '1d', '7d', '30d'].map((p) => (
//               <option key={p} value={p}>
//                 {p}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       <button
//         type="submit"
//         className="hover:text-primary"
//         disabled={isRequestingMarketSentiment || isRequestingToken}
//       >
//         <IconSend />
//       </button>
//     </div>
//   </form>
// </div>

//     </div>
<iframe
srcDoc={htmlContent}
style={{ width: '100%', height: '500px', border: '1px solid black' }}
/>
  );
}
