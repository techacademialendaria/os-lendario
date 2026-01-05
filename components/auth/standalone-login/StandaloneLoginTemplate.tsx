/**
 * StandaloneLoginTemplate - Orchestrator for premium login experience
 */
import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useAuthForm, useLoginForm, useRegisterForm, useForgotPasswordForm, useGoldTheme } from './hooks';
import { LoginForm, RegisterForm, ForgotPasswordForm, LoginCard, AuthBackground } from './organisms';

const StandaloneLoginTemplate: React.FC = () => {
  useGoldTheme();
  useMetaTags({
    title: 'Entrar',
    description: 'Acesse sua conta na Academia Lendária. Resumos de livros, frameworks mentais e clones cognitivos dos maiores pensadores.',
    type: 'website',
  });
  const authForm = useAuthForm();
  const loginForm = useLoginForm({ setError: authForm.setError });
  const registerForm = useRegisterForm({
    setError: authForm.setError, setSuccess: authForm.setSuccess,
    handleViewChange: authForm.handleViewChange, setView: authForm.setView,
  });
  const forgotForm = useForgotPasswordForm({ setError: authForm.setError, setSuccess: authForm.setSuccess });

  const renderForm = () => {
    switch (authForm.view) {
      case 'register':
        return (
          <RegisterForm
            name={registerForm.name} email={registerForm.email} password={registerForm.password}
            inviteInfo={registerForm.inviteInfo} inviteLoading={registerForm.inviteLoading}
            isLoading={registerForm.isLoading} isTransitioning={authForm.isTransitioning}
            onNameChange={(e) => registerForm.setName(e.target.value)}
            onEmailChange={(e) => registerForm.setEmail(e.target.value)}
            onPasswordChange={(e) => registerForm.setPassword(e.target.value)}
            onSubmit={registerForm.handleRegister}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            email={forgotForm.email} isLoading={forgotForm.isLoading}
            isTransitioning={authForm.isTransitioning}
            onEmailChange={(e) => forgotForm.setEmail(e.target.value)}
            onSubmit={forgotForm.handleForgotPassword}
          />
        );
      default:
        return (
          <LoginForm
            email={loginForm.email} password={loginForm.password}
            showPassword={loginForm.showPassword} isLoading={loginForm.isLoading}
            isTransitioning={authForm.isTransitioning}
            onEmailChange={(e) => loginForm.setEmail(e.target.value)}
            onPasswordChange={(e) => loginForm.setPassword(e.target.value)}
            onTogglePassword={() => loginForm.setShowPassword(!loginForm.showPassword)}
            onSubmit={loginForm.handleLogin}
            onForgotPassword={() => authForm.handleViewChange('forgot-password')}
          />
        );
    }
  };

  return (
    <AuthBackground>
      <LoginCard view={authForm.view} error={authForm.error} success={authForm.success} onViewChange={authForm.handleViewChange}>
        {renderForm()}
      </LoginCard>
    </AuthBackground>
  );
};

export default StandaloneLoginTemplate;
