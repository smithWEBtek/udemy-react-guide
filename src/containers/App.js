import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';
 
class App extends Component {
  constructor(props){
    super(props);
    console.log("[App.js] inside constructor: ", props);
    this.state = {
      persons: [
        { id: 'k1', name: "Max", age: 28 },
        { id: 'k2', name: "Manu", age: 29 },
        { id: 'k3', name: "Stephanie", age: 26 }
      ],
      showPersons: false
    }
  }
  
  componentWillMount(){
    console.log("[App.js] inside componentWillMount()")
  }

  componentDidMount(){
    console.log('[App.js] inside componentDidMount()')
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
    console.log('[App.js] inside render()')
    let persons = null;

    if (this.state.showPersons){
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App}> 
        <Cockpit 
          appTitle={this.props.title}
          persons={this.state.persons} 
          showPersons={this.state.showPersons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
