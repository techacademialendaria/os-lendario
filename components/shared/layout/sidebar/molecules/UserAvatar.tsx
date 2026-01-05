import React from 'react';
import type { UserInfo } from '../types';

interface UserAvatarProps {
  userInfo: UserInfo;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userInfo,
  size = 'md',
  className = '',
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.nextElementSibling?.classList.remove('hidden');
  };

  return (
    <div className={`relative overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}>
      {userInfo.avatar ? (
        <img
          src={userInfo.avatar}
          alt={userInfo.name}
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
      ) : null}
      <div
        className={`flex h-full w-full items-center justify-center bg-muted text-sm font-semibold text-muted-foreground ${
          userInfo.avatar ? 'hidden' : ''
        }`}
      >
        {userInfo.initials}
      </div>
    </div>
  );
};
