import "./App.css";

import React, { Component } from "react";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bbb: 5,
    };
  }
  sendEvent = () => {
    let bbb = this.state.bbb;
    document.dispatchEvent(
      new CustomEvent("myEvent", {
        detail: bbb, // 注意这里才可以放要传的参数
      })
    );
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

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aaa: 1234,
    };
  }
  componentDidMount() {
    document.addEventListener(`myEvent`, this.onAdd);
  }
  componentWillUnmount() {
    document.removeEventListener(`myEvent`, this.onAdd);
  }

  onAdd = (e) => {
    this.setState({ aaa: this.state.aaa + e.detail });
  };
  render() {
    let { aaa } = this.state;
    return (
      <section>
        <Child aaa={aaa} />
      </section>
    );
  }
}

function App() {
  return <Parent />;
}

export default App;
