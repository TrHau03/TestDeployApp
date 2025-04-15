import { Agent } from '@/core/agent';

export type Chat = {
  id: string;
  lastMessage: string;
  agent: Agent;
};
