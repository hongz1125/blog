import "./App.css";

import React, { Component } from "react";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { onAdd, aaa, bbb } = this.props;
    return (
      <div>
        <button
          onClick={() => {
            onAdd(aaa + 1, bbb + 2);
          }}
        >
          add
        </button>
        {aaa},{bbb}
      </div>
    );
  }
}

class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aaa: 12,
      bbb: 13,
    };
  }
  onAdd = (val, val2) => {
    this.setState({ aaa: val, bbb: val2 });
  };
  render() {
    let { aaa, bbb } = this.state;
    return <Child aaa={aaa} bbb={bbb} onAdd={this.onAdd} />;
  }
}

function App() {
  return <Parent />;
}

export default App;
