import React from 'react'

export default function Container(props) {
    return (
        <div className={`container ${props.className ? props.className : ''}`} id={ props.id ? props.id : '' }>
            {props.children}
        </div>
    )
}