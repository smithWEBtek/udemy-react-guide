import React from 'react';
import classes from './Person.css';

const person = (props) => {
  const rnd = Math.random();
  if (rnd > 0.7){
    throw new Error('Something went wrong!');
  }
  
  return (
    <div className={classes.Person}>
      <p 
        onClick={props.click}
        className={classes.Tagline}
      >I'm {props.name} and </p>
      <p className="NameTag">I am {props.age} years old.</p>
      <p>{props.children}</p>
      <input
        type="text" 
        onChange={props.changed}
        value={props.name}
      />
    </div>
  )
}

export default person; 