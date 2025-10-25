import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  const [signin,setSigin]=useState('Sign In')

  return (
    <div className='Login'>
      <img src={logo} alt="" className='Login-logo'/>
      <div className="login-form">
        <h1>{signin}</h1>
        <form >
          {signin==='Sign In'?<></>:<input type="text" placeholder='Your Name ' />}
          <input type="email" placeholder=' Email ' />
          <input type="password" placeholder=' Password ' />
          <button>{signin}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
         {signin==='Sign In'?<p>New to Netflix?<span onClick={()=>setSigin('Sign Up')}>Sign UP Now</span></p>:
          <p>Already have account?<span onClick={()=>setSigin('Sign In')} >Sign In Now</span></p>} 
        </div>
      </div>
    </div>
  )
}

export default Login  
