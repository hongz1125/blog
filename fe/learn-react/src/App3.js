import "./App.css";

import React, { Component } from "react";

// 如果没有Provider 拿默认值
let { Consumer, Provider } = React.createContext({ bbb: 124 });

// 支持无状态组件

const Son2 = () => {
  return (
    <Consumer>
      {({ aaa }) => {
        return <section>{aaa}</section>;
      }}
    </Consumer>
  );
};

class Son extends Component {
  render() {
    return (
      <Consumer>
        {({ aaa, onAdd, bbb }) => {
          return (
            <section>
              {aaa},{bbb} <button onClick={onAdd}>add</button>
            </section>
          );
        }}
      </Consumer>
    );
  }
}

const Child = () => {
  return (
    <section>
      <Son />
      <Son2 />
    </section>
  );
};

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aaa: 1234,
    };
  }
  onAdd = () => {
    this.setState({ aaa: this.state.aaa + 2 });
  };
  render() {
    return (
      <Provider value={{ aaa: this.state.aaa, onAdd: this.onAdd }}>
        <button onClick={this.onAdd}>add</button>
        <Child />
      </Provider>
    );
  }
}

function App() {
  return <Parent />;
}

export default App;
