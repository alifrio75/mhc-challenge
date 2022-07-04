import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../modal/Modal';
import { Button } from '../button/Button';
import { Map } from '../map/Map';

import './schedule.scss';
// import eventData from './mockdata'
import { useState } from 'react';

import { getAllEvent, createNewEvent, editEvent } from './../../service/event.api'
import { userState } from '../../store/user.slice';
import { useSelector } from 'react-redux';
import { FetchVendor } from '../../service/user.service';

/**
 * Schedule page, containing sets of event list. TODO: Virtual Scroll Pagination
 */

const TableCell = (props) => {
  return (
    <div className="event__cell" onClick={props.handleClick}>
        {/* <div>Chevron</div> */}
        <div>{ props.currentUser.role === 'Vendor' ? props.company.company : props.activity }</div>
        <div>{ props.approvedDate }</div>
        <div>{ props.status }</div>
    </div>
  )
}

const EventDetail = (props) => {
  const handleApprove = async (approvedVal) => {
    const payload = {
      status: "approved",
      approvedDate: approvedVal
    }
    try {
      const req = await editEvent(payload, props._id)
      if (req) props.handleClick()
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = async () => {
    let remarksInpt = prompt("Leave remarks", "")
    const payload = {
      status: "rejected",
      remarks: remarksInpt
    }
    try {
      const req = await editEvent(payload, props._id)
      if (req) props.handleClick()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="eventdetail">
      <div className="eventdetail__header">Proposed by <b>{props.company.company}</b> to <b>{props.vendor.company}</b> </div>
      <div className="eventdetail__subtitle">Location <b>{props.address}</b></div>
      <div className="eventdetail__body">
        <Map defaultMarker={props.location}></Map>
      </div>
      {
        props.currentUser.role === "Vendor" && (
        <div className='buttonlabel'>
                  Click date below to approve event
        </div>
        )
      }
      <div className="eventdetail__action">
        {
          props.status === "rejected" ? (<div>Rejected with remarks : {props.remarks}</div> ) :
          props.status === "approved" ? (<div>Approved date : {props.approvedDate}</div>) :
          props.currentUser.role === "Vendor" ? (
            <>
              {(props.requestedDate ||[]).map((dte, dti) => (
              <div key={'reqdate'+dti}>
                <Button onClick={()=> handleApprove(dte)} primary label={dte}></Button>
              </div>))}
              <div style={{flexGrow: '1'}}></div>
              <Button onClick={()=> handleReject()} label='Reject'></Button>
            </>
          ) : (
            <>
            </>
          )
        }
        <Button onClick={props.handleClick} label='Close'></Button>
      </div>
    </div>
  )
}

export const Schedule = () => {
  const [newEventModal, setnewEventModal] = useState(false);
  const [eventModal, seteventModal] = useState('');
  const [eventData, setEventData] = useState([])
  const [newEventForm, setNewEventForm] = useState({})
  const [vendorList, setVendorList] = useState([])

  const user = useSelector(userState);

  useEffect(()=> {
    getEvent();
    getVendor();
  }, [])
  
  const getEvent = async (params = {}) => {
    const { status } = params
    const companyId = user.id
    try {
      const req = await getAllEvent(companyId, status);
      setEventData(req.docs)
    } catch (error) {
      console.log(error)
    }

  }

  const wellnessevent = ['Health Screenings', 'Specialized Challenges', 'Yoga', 'Healthy Buffet', 'Mental Wellness Events', 'Webinars & Seminars', 'Team-Building Exercises']

  const handleMap = (e) => {
    setNewEventForm((prevstate)=> ({
      ...prevstate,
      address: e.formatted_address,
      location: e.geometry.location
    }))
  }

  const handleNewEventChange = (ev) => {
    setNewEventForm((prevstate)=> ({
      ...prevstate,
      [ev.target.name] : ev.target.value
    }))
  }

  const validateObject = (obj) => {
    console.log(obj)
    let isvalid = true
    for(var p in obj) {
      if(obj[p] === undefined){
        isvalid = false;
      }
    }
    return isvalid;
  }

  const submitNewEvent = async () => {
    const formatPayload = {
      company: user.id,
      requestedDate: [newEventForm.date1, newEventForm.date2, newEventForm.date3],
      activity: newEventForm.activity,
      address: newEventForm.address,
      location: newEventForm.location,
      vendor: newEventForm.vendor
    }
    if (!validateObject(formatPayload)) {
      alert("You must fill all forms")
      return
    }
    try {
      const submit = await createNewEvent(formatPayload)
      if (submit) getEvent()
      setNewEventForm({})
      setnewEventModal(false)
      return submit
    } catch (error) {
      console.log(error)
    }
  }

  const filterEvent = async (filterParam = '') => {
    const res =  await getEvent(filterParam && { status: filterParam })
    return res
  }

  const getVendor = async () => {
    const vendor = await FetchVendor()
    setVendorList(vendor)
    return vendor
  }

  const handleEventDetailClose = async () => {
    await getEvent()
    seteventModal('')
  }
  
  return (
    <div className="schedule">
      <Modal active={newEventModal}>
        <div className="neweventmodal">
          <div className="neweventmodal__map">
            <Map onPlaceChanged={handleMap}></Map>
          </div>
          <div className="neweventmodal__action">
            <div className="neweventmodal__actionheader">
              <div>Create New Event</div>
            </div>
            <div className="neweventmodal__actionform">
              <input type="date" name='date1' onInput={handleNewEventChange}/>
              <input type="date" name='date2' onInput={handleNewEventChange}/>
              <input type="date" name='date3' onInput={handleNewEventChange}/>
              <input list="activities" name='activity' placeholder="Activity" onInput={handleNewEventChange}/>
              <datalist id="activities">
                {
                  wellnessevent.map((wellev, evIndex) => {
                    return <option key={evIndex} value={wellev} />
                  })
                }
              </datalist>
              <select name="vendor" onClick={handleNewEventChange}>
                <option value={"default"} disabled>
                  Choose an option
                </option>
                {
                  vendorList.map((vendor, vi) => (<option key={vi} value={vendor._id}>{vendor.company}</option>))
                }
              </select>
            </div>
            <div className='neweventmodal__actionsubmit'>
              <span>Submit 3 date options and select or type your event</span>
              <Button onClick={()=> setnewEventModal(false)} label='Discard'></Button>
              <Button onClick={()=> submitNewEvent()} primary label='Create'></Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="overview">
        <div className="overview__header">
          <div>
            Event
          </div>
          <div className="createevent" onClick={() => setnewEventModal(true)}>
            <span>
              New event
            </span>
          </div>
        </div>
        <div className="overview__content">
          <div className="card">
            <h1>28</h1>
            <h4>Active Event</h4>
          </div>
          <div className="card">
            <h1>28</h1>
            <h4>Pending Approval</h4>
          </div>
          <div className="card">
            <h1>28</h1>
            <h4>Canceled Event</h4>
          </div>
        </div>
      </div>
      <div className='event'>
        <div className="event__head">
          <div className="event__head--left">
            <div>This Week</div>
          </div>
          <div className="buttongroup">
            <div className='buttongroup--active' onClick={() => filterEvent()}>All</div>
            <div onClick={() => filterEvent('approved')}>Approved</div>
            <div onClick={() => filterEvent('pending')}>Pending</div>
          </div>
        </div>
        <div className="event__content">
          { eventData.length ? eventData.map((eventItem, index) => {
            return (
            <div key={'ev'+index}>
              <TableCell {...eventItem} {...{currentUser: user}} handleClick={()=> seteventModal(index)}/>
              <Modal active={eventModal === index}>
                <EventDetail handleClick={()=> handleEventDetailClose()} {...eventItem} {...{currentUser: user}}></EventDetail>
              </Modal>
            </div>
            )
          }) : (<>No Event</>)}
        </div>
      </div>
    </div>
  );
};
