import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './App.css';
 
class App extends Component {
  state = {
    persons: [
      { id: 'k1', name: "Max", age: 28 },
      { id: 'k2', name: "Manu", age: 29 },
      { id: 'k3', name: "Stephanie", age: 26 }
    ],
    otherState: 'some other value', 
    showPersons: false
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({
      showPersons: !doesShow
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p=> {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person
    
    this.setState({ persons: persons }) 
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1)
    this.setState({
      persons: persons,
    })  
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event)=>this.nameChangedHandler(event, person.id)} 
              />
            )}
          )}
        </div>
      )
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push( classes.red );
    }
    if(this.state.persons.length <=1){
      assignedClasses.push( classes.bold );
    }

    return (
      <div className={classes.App}> 
        <h1>Hi this is a React App!</h1>
        <p className={assignedClasses.join(' ')}>This is really working!!!</p>
        <button 
          onClick={this.togglePersonsHandler}
          className={btnClass}
          >Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
