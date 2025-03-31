import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SignOutButton, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import AOS from "aos";
import Erroralert from "./Erroralert";

const Navbar = ({credentials,fixed}) => {
  const { user, isLoaded } = useUser(); 
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const[showerror,setShowerror] = React.useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);


  const handleLogout = ()=>{
    sessionStorage.removeItem('toastShown')
    signOut()
  }
  


const chatclicked = (action) => {
  

  if (!user) {
    setShowerror(true);
    setTimeout(() => {
      setShowerror(false);
    }, 1200);
  } else {
    // Redirect based on the action
    if (action === "analyze") {
      navigate("/extract");
    } else if (action === "chat") {
      navigate("/chat");
    }
    else if (action === "live") {
      navigate("/upload");
    }
    else if (action === "data") {
      navigate("/mydata");
    }
  }
};
  // console.log(user)
    return (
      <>
      {showerror && (
        <Erroralert message={'Login first'}/>
      )}
        <div className="navbar bg-base-100  z-50" data-theme='sunset'
          style={{ position: fixed ? 'fixed' : 'relative' }}>
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a href='/upload'>Live analysis</a></li>
                <li><a href='/extract'>Trend anlaysis</a></li>
                <li><a href='/chat'>Chat</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl" href='/'>MEDINSIGHT</a>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal space-x-24 text-base">
            <li><a onClick={() => chatclicked("analyze")}>Trend Analysis</a></li>
            <li><a onClick={()=>chatclicked('live')}>Live Analysis</a></li>
            <li><a onClick={() => chatclicked("chat")}>Chat</a></li>
            <li><a onClick={() => chatclicked("data")}>My data</a></li>
            </ul>
          </div>
          <div className="navbar-end pr-0 sm:pr-5" >
          {
            isLoaded ? (
              user ? (
                <>
                  <div className="flex flex-nowrap gap-2">
                    <button 
                      data-theme='cupcake' 
                      className="btn btn-primary flex-shrink-0 min-h-3 h-8 whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <UserButton 
                      data-theme='cupcake' 
                      className="btn btn-primary flex-shrink-0 min-h-3 h-8" 
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-nowrap gap-2 ">
                    <Link to='/login' className="flex-shrink-0">
                      <button 
                        data-theme='cupcake' 
                        className="btn btn-primary min-h-3 h-8 whitespace-nowrap"
                      >
                        Login
                      </button>
                    </Link>
                    <Link to='/register' className="flex-shrink-0">
                      <button 
                        data-theme='cupcake' 
                        className="btn btn-primary min-h-3 h-8 whitespace-nowrap"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </>
              )
            ) : (
              <span className="loading loading-ball loading-lg"></span>
            )
          }
          </div>
        </div>
      </>
    )
}

export default Navbar;