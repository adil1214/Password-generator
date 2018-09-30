import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    this.state = {
      passwords: [],
      count: 5
    }
  }
  
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    fetch(`/api/passwords/${this.state.count}`)
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }))
      .catch((e) => console.log(e)); 
  }

  decrement() {
    this.setState((prevState) => ({
      count: prevState.count < 2 ? 1 : prevState.count - 1    // min is 1 password
    }));
  }

  increment() {
    this.setState((prevState) => ({
      count: prevState.count > 14 ? 15 : prevState.count + 1   // max is 15 passwords
    }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {passwords.length ? (
          <div>
            <h1>{this.state.count} Password{this.state.count===1 ? '':'s'}.</h1>
            <button onClick={this.decrement}>-1</button>
            <button onClick={this.increment}>+1</button>
            <ul className="passwords">
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;