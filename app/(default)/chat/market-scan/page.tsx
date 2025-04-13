import ChatWindow from "../ChatBox/ChatWindow";
import { Chat } from "../types";

const agent = {
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
  }
export default function MarketScanPage() {
    return <ChatWindow chat={agent as Chat} />
    ;
  }
  