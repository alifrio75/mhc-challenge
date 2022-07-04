import { useEffect, useState } from 'react';
import React from 'react';
import { SetAuthToken, UserLogin } from '../../service/user.service';

import { Button } from '../button/Button';
import './Login.scss';

import { onLogin } from '../../store/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const dispatch = useDispatch()
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = async () => {
    const payload = {
      company, password
    }
    try {
      const reqLogin = await UserLogin(payload);
      const { token } = reqLogin.data;
      localStorage.setItem("jwtToken", token);
      SetAuthToken(token);
      dispatch(onLogin(token));
      navigate('/');
    } catch (error) {
      SetAuthToken()
    }
  }

  useEffect(()=> {
    const localSession = localStorage.getItem('jwtToken')
    if (localSession) dispatch(onLogin(localSession))
  }, [])

  return (
    <div className="login">
      <div className="form">
        <input className="form__name" onChange={(e) => setCompany(e.target.value)} placeholder='Kimi no company?'/>
        <input className="form__password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Kimi no pasuwudo?'/>
        <div className="form__action">
          <Button size="small" backgroundColor="#ffffff" onClick={handleLogin} label="Log in" />
        </div>
      </div>
    </div>
  )
}

export default Login