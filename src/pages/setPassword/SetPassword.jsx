import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the toast styles
import './setPassword.css';

const SetPassword = ({ onPasswordSet }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const validatePassword = () => {
    if (!password) {
      passwordInputRef.current.focus();
      return 'パスワードを入力してください。';
    }
    if (password.length < 8 || password.length > 20) {
      passwordInputRef.current.focus();
      return '半角大文字・小文字・数字を含めた8文字以上20文字以内で入力してください。';
    }
    if (!/[A-Z]/.test(password)) {
      passwordInputRef.current.focus();
      return '少なくとも1つの大文字を含めてください。';
    }
    if (!/[a-z]/.test(password)) {
      passwordInputRef.current.focus();
      return '少なくとも1つの小文字を含めてください。';
    }
    if (!/[0-9]/.test(password)) {
      passwordInputRef.current.focus();
      return '少なくとも1つの数字を含めてください。';
    }
    return '';
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      confirmPasswordInputRef.current.focus();
      return 'パスワード確認を入力してください。';
    }
    if (password !== confirmPassword) {
      confirmPasswordInputRef.current.focus();
      return 'パスワードが一致していません。';
    }
    return '';
  };

  const handleSubmit = () => {
    const passwordValidationError = validatePassword();
    const confirmPasswordValidationError = validateConfirmPassword();

    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (passwordValidationError || confirmPasswordValidationError) {
      toast.error('パスワード設定に失敗しました。もう一度お試しください。');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPasswordSet(password);
      toast.success('パスワードが正常に設定されました。');
    }, 2000);
  };

  return (
    <div className="container">
      <div className="main-form">
        <div className="form-head">
          <h2 className="title">パスワード設定</h2>
          <p className="sub-title">
            パスワードを入力後 [設定ボタン] を押してサービスの
            <br />
            利用を開始してください。
          </p>
        </div>
        <div className="form-wrapper">
          {/* Password Input */}
          <p className="label">パスワード</p>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              ref={passwordInputRef}
              className={`input-field-module ${passwordError ? 'input-error' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
            />
            <button
              className="toggle-vis"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '非表示' : '表示'}
            </button>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <p className="rule">半角大文字・小文字・数字を含めた8文字以上20文字以内</p>
          </div>

          {/* Confirm Password Input */}
          <p className="label">パスワード確認用</p>
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              ref={confirmPasswordInputRef}
              className={`i ${confirmPasswordError ? 'input-error' : 'input-field'}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError('');
              }}
            />
            <button
              className="toggle-vis"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '非表示' : '表示'}
            </button>
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>

          {/* Submit Button */}
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : '設定'}
          </button>
        </div>
      </div>

      {/* Toast Notification is automatically handled by ToastContainer */}
    </div>
  );
};

export default SetPassword;
