import React, { useEffect } from 'react'; 
import HomePage from './pages/HomePage' 
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage' 
import EmailVerificationPage from './pages/EmailVerificationPage' 
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import LoadingSpinner from './components/LoadingSpinner'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'  
import NotFoundPage from './pages/NotFoundPage'  


const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (user && !user.isVerified) return <Navigate to="/verify-email" replace />;
  
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  
  return children;
};

function App() { 
  const { checkAuthRequest, isCheckingAuth } = useAuthStore();

  useEffect(()=>{ 
     const Check = async () => {
      try { 
        await checkAuthRequest();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    Check();
  }, [checkAuthRequest]);

  if(isCheckingAuth){
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">  
      <Routes>
        <Route path='/' element={ 
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute> } />

        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser> } />

        <Route path='/login' element={ 
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser> } />
    
        <Route path='/verify-email' element={<EmailVerificationPage />} />

        <Route path='/forget-password' element={
          <RedirectAuthenticatedUser>
            <ForgetPasswordPage />
          </RedirectAuthenticatedUser>} /> 

        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>} /> 

        <Route path='*' element={ <NotFoundPage /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
