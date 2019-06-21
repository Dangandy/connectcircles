// 3rd party libraries
import React from "react";
import styled from "styled-components";

// local libraries
import Circle from "./circle";
import Line from "./line";

const Div = styled.div`
  margin: 0 auto;
  width: 1024px;
  height: 900px;
  position: relative;
`;

class App extends React.Component {
  state = {
    circle1: {
      x: 0,
      y: 0,
      mouse: {
        x: 0,
        y: 0
      },
      toggle: false
    },
    circle2: {
      x: 400,
      y: 400,
      mouse: {
        x: 0,
        y: 0
      },
      toggle: false
    },
    line: {
      length: 566
    }
  };

  updateState = (object, position, value) => {
    let newState = { ...this.state };

    if (object == "line") {
      //push circle2
      let difference = parseInt(value) - this.state.line.length;
      let angle = Math.atan2(
        this.state.circle2.y - this.state.circle1.y,
        this.state.circle2.x - this.state.circle1.x
      );
      let height = Math.sin(angle) * difference;
      let width = Math.cos(angle) * difference;
      newState[object][position] = parseInt(value);
      newState.circle2.x += parseInt(width);
      newState.circle2.y += parseInt(height);
    } else {
      //update length based on Y with pythagorean?
      newState[object][position] = parseInt(value);
      newState.line.length = parseInt(
        Math.sqrt(
          Math.pow(newState.circle1.x - newState.circle2.x, 2) +
            Math.pow(newState.circle1.y - newState.circle2.y, 2)
        )
      );
    }

    this.setState(newState);
  };

  updateMouse = (object, x, y) => {
    let newState = { ...this.state };
    newState[object]["mouse"]["x"] = x;
    newState[object]["mouse"]["y"] = y;
    newState[object]["toggle"] = true;
    console.log(newState);
    this.setState(newState);
  };

  handleMouseMove = event => {
    if (this.state.circle1.toggle == true) {
      // find offset and modify x y
      let offsetX = event.nativeEvent.screenX - this.state.circle1.mouse.x;
      let offsetY = event.nativeEvent.screenY - this.state.circle1.mouse.y;
      let newState = { ...this.state };
      newState.circle1.x = offsetX;
      newState.circle1.y = offsetY;
      newState.line.length = parseInt(
        Math.sqrt(
          Math.pow(newState.circle1.x - newState.circle2.x, 2) +
            Math.pow(newState.circle1.y - newState.circle2.y, 2)
        )
      );
      this.setState(newState);
    } else if (this.state.circle2.toggle == true) {
      let offsetX = event.nativeEvent.screenX - this.state.circle2.mouse.x;
      let offsetY = event.nativeEvent.screenY - this.state.circle2.mouse.y;
      let newState = { ...this.state };
      newState.circle2.x = offsetX;
      newState.circle2.y = offsetY;
      newState.line.length = parseInt(
        Math.sqrt(
          Math.pow(newState.circle1.x - newState.circle2.x, 2) +
            Math.pow(newState.circle1.y - newState.circle2.y, 2)
        )
      );
      this.setState(newState);
    }
  };

  toggle = object => {
    let newState = { ...this.state };
    newState[object]["toggle"] = false;
    this.setState(newState);
  };

  render() {
    return (
      <Div onMouseMove={this.handleMouseMove}>
        <Line
          x={this.state.circle1.x}
          y={this.state.circle1.y}
          x2={this.state.circle2.x}
          y2={this.state.circle2.y}
          length={this.state.line.length}
          updateState={this.updateState}
        />

        <Circle
          x={this.state.circle1.x}
          y={this.state.circle1.y}
          name="circle1"
          updateState={this.updateState}
          updateMouse={this.updateMouse}
          toggle={this.toggle}
        />

        <Circle
          x={this.state.circle2.x}
          y={this.state.circle2.y}
          name="circle2"
          updateState={this.updateState}
          updateMouse={this.updateMouse}
          toggle={this.toggle}
        />
      </Div>
    );
  }
}

export default App;
