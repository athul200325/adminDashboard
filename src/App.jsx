import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

import Login from './pages/login/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import SetPassword from './pages/setPassword/SetPassword.jsx';
import PasswordReset from './pages/passwordReset/PasswordReset.jsx';
import SplashScreen from './pages/splashScreen/SplashScreen';
import Header from './components/header/Header.jsx';
import EmailVerification from './pages/emailVerification/EmailVerification.jsx';

function App() {
  const [userPassword, setUserPassword] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleSplashEnd = () => {
    setIsSplashVisible(false);
  };

  const handlePasswordSet = (password) => {
    setUserPassword(password);
    setIsPasswordSet(true);
  };

  const handleLogin = (password) => {
    if (password === userPassword) {
      setIsLoggedIn(true);
      toast.success('ログインに成功しました。');
    } else {
      toast.error('無効なパスワードです。'); 
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set the state to logged out
  };

  return (
    <div className="App">
      {isSplashVisible ? (
        <SplashScreen onSplashEnd={handleSplashEnd} />
      ) : (
        <>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          {!isPasswordSet && <SetPassword onPasswordSet={handlePasswordSet} />}
          {isPasswordSet && !isLoggedIn && !isResettingPassword && (
            <Login
              onLogin={handleLogin}
              onForgotPassword={() => setIsResettingPassword(true)}
            />
          )}
          {isLoggedIn && <Dashboard />}
          {isResettingPassword && !isEmailVerified && (
            <EmailVerification
              onVerifyEmail={(email) => setIsEmailVerified(true)}
              onBackToLogin={() => setIsResettingPassword(false)}
            />
          )}
          {isResettingPassword && isEmailVerified && (
            <PasswordReset
              onResetPassword={(newPassword) => {
                setUserPassword(newPassword);
                setIsResettingPassword(false);
                setIsEmailVerified(false);
              }}
              onCancel={() => setIsResettingPassword(false)}
            />
          )}
        </>
      )}

      <ToastContainer 
      position="bottom-center"  
        autoClose={1500}          
        hideProgressBar={true}     
        newestOnTop={false}        
        closeButton={false}        
        rtl={false}                />
    </div>
  );
}

export default App;
