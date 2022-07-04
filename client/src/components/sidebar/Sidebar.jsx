import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../button/Button';
import './Sidebar.scss';

import { onLogout, userState } from '../../store/user.slice';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const user = useSelector(userState);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(onLogout())
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <div className="profile">
        <img className="profile__avatar" src="logo512.png"/>
        <div className="profile__name">
          <span>{user.role}</span> <br />
          <span>{user.company}</span>
        </div>
        <div className="profile__action">
          <Button size="small" backgroundColor="#ffffff" onClick={handleLogout} label="Log out" />
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  onLogout: PropTypes.func
}