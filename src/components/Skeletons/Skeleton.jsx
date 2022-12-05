import React from 'react'
import './Skeleton.css'

const Skeleton = ({type}) => {
    const classes = `skeleton ${type}`
  return (
    <div className={classes}></div>
  )
}

export default Skeleton