/**
 * SignupPage - Redireciona para login (agora unificado)
 */

import React from 'react';
import { StandaloneLoginTemplate } from '../../components/auth/standalone-login';

export const SignupPage: React.FC = () => {
  return <StandaloneLoginTemplate />;
};

export default SignupPage;
