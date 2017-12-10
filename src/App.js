import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';
 
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
    // const doesShow = this.state.showPersons
    // this.setState({
    //   showPersons: !doesShow
    // })
    // this also works:
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  nameChangedHandler = (event, id) => {
    // const person = this.state.persons.find(person => person.id === id);
    // assign variable to id passed in by findIndex method on existing state.persons arr
    const personIndex = this.state.persons.findIndex(p=> {
      return p.id === id;
    })
    // const person = this.state.persons[personIndex];
    // const person = Object.assign({}, this.state.persons[personIndex])
    // create separate variable (don't mutate state directly) using spread & personIndex var
    const person = {
      ...this.state.persons[personIndex]
    }
    // change the value of the person.name (again, not directly mutating state)
    person.name = event.target.value;

    // const persons = this.state.persons.slice()
    // now, create a separate copy of this.state.persons arr
    const persons = [...this.state.persons]
    
    // using the personIndex, find that person in the coppied array, and change it to the value of the 'person copy' from original state (safely making the change to a 'person copy', and inserting that into the copy of the original array)
    persons[personIndex] = person

    // now that we have an updated version of persons, we update orig w/ setState()
    this.setState({ persons: persons }) 
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1)
    this.setState({
      persons: persons,
    })  
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px', 
      cursor: 'pointer'
    }

    let persons = null;
    if (this.state.showPersons){
      persons =
      this.state.persons.map((person, index) =>
        <div>
          <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            changed={(event)=>this.nameChangedHandler(event, person.id)}
            key={person.id}
          />
        </div>
      );
      style.backgroundColor = 'red'
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <=1){
      classes.push('bold');
    }

    return (
      <div className="App"> 
        <h1>Hi this is a React App!</h1>
        <p className={classes.join(' ')}>This is really working!!!</p>
        <button onClick={this.togglePersonsHandler} style={style}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
