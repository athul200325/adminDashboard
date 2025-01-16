import React, { useState, useRef } from 'react';
import './login.css';

const Login = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  const emailInputRef = useRef(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3000); // Hide toast after 3 seconds
  };

  const validateEmail = () => {
    if (!email) {
      return '有効なメールアドレスを入力してください。';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '有効なメールアドレスを入力してください。';
    }
    return '';
  };

  const handleSubmit = () => {
    const emailValidationError = validateEmail();
    if (emailValidationError) {
      setEmailError(emailValidationError);
      emailInputRef.current.focus(); // Use ref to focus
      return;
    }

    setEmailError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Simulating login scenarios
      const loginSuccess = true;
      const accountBlocked = false;

      if (loginSuccess) {
        onLogin(password);
      } else if (accountBlocked) {
        showToast('お使いのアカウントは現在アクセスできません。ログインするには担当の管理者までお知らせください。', 'error');
      } else {
        showToast('メールアドレスかパスワードに誤りがあります。', 'error');
      }
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="main-form">
        <div className="form-head">
          <h2 className="title">ログイン</h2>
        </div>
        <div className="form-wrapper">
          <label htmlFor="email">メールアドレス</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              className={` ${emailError ? 'input-error' : 'input-field'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <label htmlFor="password">パスワード</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className={` ${emailError ? 'input-error' : 'input-field'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-visibility-module"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '隠す' : '表示'}
            </button>
          </div>

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : 'ログイン'}
          </button>

          <a className="forgot-password-module" onClick={onForgotPassword}>
            パスワードをお忘れの場合
          </a>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.message && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Login;
