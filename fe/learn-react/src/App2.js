import "./App.css";

import React, { Component } from "react";

// 无状态组件 sfc
const Child2 = ({ aaa }) => {
  return <section>{aaa}</section>;
};

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aaa: 12,
      bbb: 14,
    };
  }
  onAdd = () => {
    this.setState({ aaa: this.state.aaa + 1, bbb: this.state.bbb + 2 });
  };
  render() {
    let { aaa, bbb } = this.state;
    return (
      <div>
        {aaa},{bbb},<Child2 aaa={aaa} />
      </div>
    );
  }
}

class Parent extends Component {
  getL = () => {
    this.child.onAdd();
  };
  render() {
    return (
      <section>
        <Child
          ref={(self) => {
            this.child = self;
          }}
        />
        <button onClick={this.getL}>add</button>
      </section>
    );
  }
}

function App() {
  return <Parent />;
}

export default App;
