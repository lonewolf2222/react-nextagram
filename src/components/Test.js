import React from 'react'

const Test = (props) => {
    console.log(props.children)
return (<div>Test {props.children}</div>)
}

export default Test