import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login,signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signin,setSigin]=useState('Sign In');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false)

  const user_auth=async (event)=>{
    event.preventDefault();
    setLoading(true)
    if (signin==='Sign In'){
      await login(email,password)
    }else{
      await signup(name,email,password)
    }
    setLoading(false)
  }

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='Login'>
      <img src={logo} alt="" className='Login-logo'/>
      <div className="login-form">
        <h1>{signin}</h1>
        <form >
          {signin==='Sign In'?<></>:<input type="text" placeholder='Your Name '
          value={name} onChange={(e)=>setName(e.target.value)} />}
          <input type="email" placeholder=' Email ' 
          value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder=' Password ' 
          value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={user_auth} type='submit'>{signin}</button>
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
