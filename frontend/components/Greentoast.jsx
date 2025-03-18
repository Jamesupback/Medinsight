import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const AuthToast = ({message}) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      const toastShown = sessionStorage.getItem('toastShown');
      if (!toastShown) {
        setShowToast(true);
        sessionStorage.setItem('toastShown', 'true'); 
        const timer = setTimeout(() => setShowToast(false), 2000);
        return () => clearTimeout(timer);
      }
    }

  }, [isSignedIn, isLoaded]);

  if (!showToast) return null;

  return (
    <div className="toast toast-end animate-fade-in" >
      <div className="alert alert-success" data-theme='dim'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AuthToast;
