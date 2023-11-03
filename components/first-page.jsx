import React from 'react'

function First(props) {
    return (
        <div className='first-page'>
            <h1 className='first-title'>Quizzical</h1>
            <p className='first-desc'>Answer a few questions to know your Beta Level of Quotient</p>
            <p className='quotient'>(EQ and IQ)</p>
            <button className='first-btn'
            onClick={()=>{props.increaseID(1); props.launch() }}>Start quiz</button>
        </div>
    )
}

export default First