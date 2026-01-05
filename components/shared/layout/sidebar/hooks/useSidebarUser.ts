import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../lib/AuthContext';
import type { UserInfo } from '../types';

export function useSidebarUser() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const userInfo: UserInfo = useMemo(() => {
    const name = user?.fullName || 'Usuário';
    const email = user?.email || '';
    const avatar = user?.avatarUrl || '';
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return { name, email, avatar, initials };
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return {
    userInfo,
    handleLogout,
  };
}
