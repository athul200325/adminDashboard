import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import './passwordReset.css';

const PasswordReset = ({ onResetPassword, onCancel }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(password)) {
      return '半角大文字・小文字・数字を含めた8文字以上20文字以内で入力してください';
    }
    return '';
  };

  const handleReset = () => {
    // Validate new password
    const newPasswordError = validatePassword(newPassword);
    if (newPasswordError) {
      setPasswordError(newPasswordError);
      setConfirmPasswordError(''); // Clear confirm password error
      document.getElementById('newPassword').focus();
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('パスワードが一致していません');
      setPasswordError(''); // Clear new password error
      document.getElementById('confirmPassword').focus();
      return;
    }

    // Clear all errors
    setPasswordError('');
    setConfirmPasswordError('');

    // Attempt to reset password
    try {
      onResetPassword(newPassword);
      toast.success('パスワードが再設定されました。'); 
    } catch (error) {
      toast.error('パスワード再設定に失敗しました。もう一度お試しください。'); 
    }
  };

  return (
    <div className="container">
      <div className="main-form">
        <div className="form-head">
          <h2 className="title">パスワード再設定</h2>
        </div>
        <div className="form-wrapper">
          {/* New Password Field */}
          <label htmlFor="newPassword">新しいパスワード</label>
          <div className="input-wrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              className={` ${passwordError ? 'input-error' : 'input-field'}`}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError(''); // Clear error on input change
              }}
            />
            <button
              className="toggle-visibility-module"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? '非表示' : '表示'}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}

          {/* Confirm Password Field */}
          <label htmlFor="confirmPassword">パスワード確認用</label>
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className={` ${
                confirmPasswordError ? 'input-error' : 'input-field'
              }`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(''); // Clear error on input change
              }}
            />
            <button
              className="toggle-visibility-module"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '非表示' : '表示'}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="error-message">{confirmPasswordError}</p>
          )}

          {/* Buttons */}
          <button className="submit-button" onClick={handleReset}>
            リセット
          </button>
        </div>
      </div>

    </div>
  );
};

export default PasswordReset;
