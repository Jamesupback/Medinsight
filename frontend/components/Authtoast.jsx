import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const AuthToast = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const prevIsSignedIn = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Check if authentication state changed from signed out to signed in
    if (prevIsSignedIn.current === false && isSignedIn) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }

    // Update previous value
    prevIsSignedIn.current = isSignedIn;
  }, [isSignedIn, isLoaded]);

  if (!showToast) return null;

  return (
    <div className="toast  toast-end animate-fade-in">
      <div className="alert alert-success">
        <span>Successfully logged in! 🎉</span>
      </div>
    </div>
  );
};

export default AuthToast;