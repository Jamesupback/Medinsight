import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      if (username === 'admin@gmail.com' && password === 'admin@123') {
        navigate('/admindashboard');
      } else {
        setShowError(true);
        setIsLoading(false);
      }
    }, 800);
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    
    <>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center " data-thme='sunset' >

      {/* Main card */}
      <div className="card w-1/2 max-w-md shadow-2xl" data-theme="dim" data-aos="flip-up">
        <div className="card-body">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="avatar">
              {/* <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/api/placeholder/128/128" alt="Admin Logo" />
              </div> */}
            </div>
            <h1 className="text-3xl font-bold text-center text-primary">Admin Login</h1>
            <p className="text-center text-base-content/70">Please sign in to continue to dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-group">
                <span className="bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  placeholder="admin@example.com" 
                  className="input input-bordered w-full" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-group">
                <span className="bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input input-bordered w-full" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label className="label">
                <span className="label-text-alt"></span>
                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
              </label>
            </div>
            
            <div className="form-control mt-6">
              <button 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 
                  <span className="loading loading-spinner loading-sm"></span> : 
                  'Login'
                }
              </button>
            </div>
          </form>
          
         
        </div>
      </div>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-box bg-base-100">
            <h3 className="font-bold text-lg text-error">Login Failed!</h3>
            <p className="py-4">Incorrect username or password. Please try again.</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={closeError}>Close</button>
            </div>
          </div>
        </div>
      )}

     </div>
     <Footer/>
    </>
  );
};

export default AdminLogin;