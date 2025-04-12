'use client';
import { useUser, useUserLoading } from '@/client/auth';
import Lottie from 'lottie-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Chat } from '../types';
import ChatWindow from './ChatWindow';
import Info from './Info';
import ChatItem from './Item';
import SearchChat from './Search';

const chats: Chat[] = [
  {
    id: '1',
    lastMessage: "Hello, it's Market Scan",
    agent: {
      id: '1',
      name: 'Market Scan',
      type: 'market-sentiment',
      slug: 'market-scan',
      description:
        'A digital assistant with advanced capabilities for analyzing entire cryptocurrency markets. This AI evaluates multiple coins simultaneously, tracks market trends, and identifies patterns across different assets to provide comprehensive insights into market movements and investment opportunities.',
      avatarURL: '/assets/images/market-sentiment.svg',
    },
  },
  {
    id: '2',
    agent: {
      id: '2',
      name: 'Coin Deep',
      type: 'coin',
      slug: 'coin-deep',
      description:
        'A specialized assistant focused on deep analysis of individual cryptocurrencies. This AI performs detailed examination of specific coins, evaluating fundamentals, technical metrics, and historical performance to generate precise insights and forecasts for single crypto assets.',
      avatarURL: '/assets/images/coin-analysis.svg',
    },
    lastMessage: "Hello, it's Coin Deep",
  },
];

export default function ChatBox() {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUser();
  const isLoadingUser = useUserLoading();

  const [selectedChatID, setSelectedChatID] = useState('');
  const chat = chats.find((chat) => chat.id === selectedChatID);

  useEffect(() => {
    if (isLoadingUser) return;
    if (user._tag === 'ANONYMOUS') {
      router.push(`/auth/login?returnTo=${pathname}`);
    }
  }, [isLoadingUser, user]);

  return (
    <div className="grid min-h-[calc(100vh_-_8rem)] grid-cols-10 gap-5 overflow-hidden">
      <div className="panel relative z-10 col-span-2 flex h-full flex-col space-y-4 overflow-hidden border-[0.5px] border-primary/30 p-4">
        <SearchChat />
        <ul className="flex flex-col gap-3 overflow-auto scroll-smooth">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={selectedChatID === chat.id}
              onSelect={(chat) => setSelectedChatID(chat.id)}
            />
          ))}
        </ul>
      </div>

      <div className="panel col-span-6 h-full border-[0.5px] border-primary/30 p-0">
        {chat ? (
          <ChatWindow chat={chat} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Lottie
              animationData={require('@/public/animations/emptyAgent.json')}
              loop
              autoplay
              className="mx-auto mb-10 mt-20 w-[50%] sm:w-[50%]"
            />
            <span className="text-center text-base font-bold">Choose an agent to show messages!</span>
          </div>
        )}
      </div>

      <div className="panel col-span-2 h-full border-[0.5px] border-primary/30 p-0">
        {chat ? (
          <Info profile={chat.agent} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Lottie
              animationData={require('@/public/animations/profile.json')}
              autoplay
              className="mb-6 w-[50%] sm:w-[50%]"
            />
            <span className="text-center text-base font-bold">Choose an agent to show profile!</span>
          </div>
        )}
      </div>
    </div>
  );
}
