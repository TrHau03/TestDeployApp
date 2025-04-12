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
    <div className="relative h-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative flex-none">
            <img
              src={agent.avatarURL}
              className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
              alt={agent.name}
            />
            <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
              <div className="h-4 w-4 rounded-full bg-success"></div>
            </div>
          </div>
          <div className="mx-3">
            <p className="font-semibold">{agent.name}</p>
            <p className="text-xs text-white-dark">Last seen at 2:05 PM</p>
          </div>
        </div>
      </div>

      <div className="h-px w-full border-b border-primary/30" />
      <PerfectScrollbar
        className={cn('ps relative h-full', {
          'sm:h-[calc(100vh_-_312px)]': agent.type === 'market-sentiment',
          'sm:h-[calc(100vh_-_350px)]': agent.type === 'coin',
        })}
        containerRef={(container) => {
          ref.current = container;
        }}
      >
        <div className="space-y-5 overflow-auto p-4 pb-[68px] sm:max-h-[480px] sm:min-h-[300px] sm:pb-0">
          {data.map((message) => (
            <div key={message.key}>
              <div className="flex items-start gap-3">
                <div className="flex-none">
                  <img src={agent.avatarURL} className="h-10 w-10 rounded-full object-cover" alt={agent.name} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-black/10 p-4 py-2 text-white-dark dark:bg-gray-800 ltr:rounded-bl-none rtl:rounded-br-none">
                      <span>{message.content}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(isRequestingMarketSentiment || isRequestingToken) && (
            <div className="flex animate-pulse items-start gap-3">
              <div className="flex-none">
                <img
                  src={agent.avatarURL}
                  className="h-10 w-10 rounded-full object-cover opacity-60"
                  alt={agent.name}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-black/10 p-4 py-2 text-white-dark dark:bg-gray-800 ltr:rounded-bl-none rtl:rounded-br-none">
                    <span>Generating response...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PerfectScrollbar>
      <div className="absolute bottom-0 left-0 right-0 w-full p-4">
        <div className="flex w-full items-center space-x-3 sm:flex rtl:space-x-reverse">
          <div className="relative flex-1">
            <form onSubmit={handleGenerate}>
              <input
                className="form-input rounded-full border-0 bg-[#f4f4f4] px-6 py-2 focus:outline-none"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:right-4 rtl:left-4"
                disabled={isRequestingMarketSentiment || isRequestingToken}
              >
                <IconSend />
              </button>
            </form>
          </div>
          {agent.type === 'coin' && (
            <>
              <div className="relative">
                <button
                  className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-white"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedCoin}
                  <IconCaretDown
                    className={`h-5 w-5 transform text-gray-500 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-gray-800 text-white shadow-lg">
                    {['BTC', 'ETH', 'LINK', 'USDT', 'BNB', 'USD'].map((coin) => (
                      <div
                        key={coin}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                        onClick={() => handleSelectCoin(coin as typeof selectedCoin)}
                      >
                        {coin}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
                className="form-input"
              >
                {['1m', '5m', '15m', '30m', '1h', '4h', '1d', '7d', '30d'].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
