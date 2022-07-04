import React from 'react';
import PropTypes from 'prop-types';

import style from './Modal.module.scss';

export const Modal = ({children, active}) => {
  return (
    <>
      { active ? (
        <>
          <div className={style.modal} >
            <div className={style.modal__container}>
              {children}
            </div>
          </div>
        </>
        ) : <></>
      }
    </>
  )
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired
}