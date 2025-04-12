import clsx from 'clsx';
import { Chat } from '../types';

type ChatItemProps = {
  chat: Chat;
  isActive?: boolean;
  onSelect?: (chat: Chat) => void;
};
export default function ChatItem({ chat, isActive, onSelect }: ChatItemProps) {
  const { agent } = chat;
  return (
    <li
      onClick={() => onSelect && onSelect(chat)}
      className={clsx('flex w-full cursor-pointer items-center justify-between rounded-md p-2', {
        'bg-gray-100 text-primary dark:bg-[#050b146a] dark:text-primary': isActive,
        'hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b146a] dark:hover:text-primary': !isActive,
      })}
    >
      <div className="flex-1">
        <div className="flex items-center">
          <div className="relative flex-shrink-0">
            <img src={agent.avatarURL} className="h-12 w-12 rounded-full object-cover" alt="" />
            <div>
              <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                <div className="h-4 w-4 rounded-full bg-success" />
              </div>
            </div>
          </div>
          <div className="mx-3 ltr:text-left rtl:text-right">
            <p className="mb-1 font-semibold">{agent.name}</p>
            <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.lastMessage}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
