'use client';
import { useUser } from '@/client/auth';

export default function ChatUser() {
  const user = useUser();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex-none">
          <img className="h-12 w-12 rounded-full object-cover" alt="avatar" src="/assets/images/user-profile.jpeg" />
        </div>
        <div className="mx-3">
          <p className="mb-1 font-semibold">{user._tag === 'AUTHENTICATED' ? user.name : null}</p>
          <p className="text-xs text-white-dark">Normal user</p>
        </div>
      </div>
    </div>
  );
}
