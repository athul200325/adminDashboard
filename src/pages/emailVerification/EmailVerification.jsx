import React, { useState } from 'react';
import './emailVerification.css';

const EmailVerification = ({ onVerifyEmail, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3000); // Hide toast after 3 seconds
  };

  const validateEmail = () => {
    if (!email.trim()) {
      return '現在お使いのメールアドレスを入力してください';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '有効なメールアドレスを入力してください';
    }
    return '';
  };

  const handleVerify = () => {
    const validationError = validateEmail();
    if (validationError) {
      setEmailError(validationError);
      document.getElementById('email').focus(); // Focus on the email input
      return;
    }

    setEmailError('');
    try {
      onVerifyEmail(email);
      showToast('パスワード再設定用URLが送信されました。', 'success');
    } catch (error) {
      showToast(
        'パスワード再設定用URLの送信に失敗しました。もう一度お試しください。',
        'error'
      );
    }
  };

  return (
    <div className="container">
      <div className="main-form">
        <div className="form-head">
          <h2 className="title">パスワード再設定</h2>
          <p className="sub-title">
            現在使っているメールアドレスを入力してください。パス
            <br />
            ワード再設定用のURLをメールで送信いたします。
          </p>
        </div>
        <div className="form-wrapper">
          <label htmlFor="email">メールアドレス</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              className={` ${emailError ? 'input-error' : 'input-field'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Clear error on input change
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <button className="submit-button" onClick={handleVerify}>
            パスワード再設定用URLを送信する
          </button>

          {/* Add Return to Login Link */}
          <p className="back-to-login">
              <a onClick={onBackToLogin} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                ログイン画面にもどる
              </a>
            </p>

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

export default EmailVerification;
