import React, {useState} from 'react'

export default function Alerts(alert) {
    const [showAlert, setShowAlert] = useState(false)
    
    //Toggles the alert box
    function toggleShowAlert() {
        setShowAlert(!showAlert)
    }

    return (
        <div onClick={toggleShowAlert}>
            <h1 className='alertHeader'>&#9888; {alert.alert.event} &#9888;</h1>
            <sub>Click to {showAlert ? 'Collapse' : 'Expand'}</sub>
            {showAlert ?
                <div>
                    <hr/>
                    <h5>From: {alert.alert.sender_name}</h5>
                    <p className='description'>{alert.alert.description}</p>
                </div>
                : null}
        </div>
    )
}
