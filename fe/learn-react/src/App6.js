import "./App.css";

import React, { Component } from "react";

import { EventEmitter } from "events";

const eventBus = new EventEmitter();

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bbb: 5,
    };
  }
  sendEvent = () => {
    let bbb = this.state.bbb;
    eventBus.emit("myEvent", bbb);
  };
  render() {
    let { aaa } = this.props;
    return (
      <section>
        {aaa}
        <button onClick={this.sendEvent}>add</button>
      </section>
    );
  }
}

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aaa: 1234,
    };
  }
  componentDidMount() {
    eventBus.on(`myEvent`, this.onAdd);
  }
  componentWillUnmount() {
    eventBus.off(`myEvent`, this.onAdd);
  }

  onAdd = (val) => {
    this.setState({ aaa: this.state.aaa + val });
  };
  render() {
    let { aaa } = this.state;
    return <section>23{aaa}</section>;
  }
}

function App() {
  return (
    <section>
      <Child1></Child1>
      <Child2></Child2>
    </section>
  );
}

export default App;
