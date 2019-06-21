import React from "react";
import styled from "styled-components";

const Input = styled.input`
  position: absolute;
  z-index: 100;
  left: 50%;
  background: #001733;
  margin-top: -15px;
  margin-left: -30px;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  outline: none;
  width: 60px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #001733;
`;

const Div = styled.div.attrs(({ width, top, left, rad }) => ({
  style: {
    width,
    top,
    left,
    transform: `rotate(${rad}rad)`
  }
}))`
  background: #001733;
  height: 2px;
  display: block;
  transform-origin: 0 0;
  position: absolute;
`;

class Line extends React.Component {
  handleChange = event => {
    this.props.updateState("line", "length", event.target.value);
  };

  render() {
    return (
      <Div
        width={this.props.length}
        top={this.props.y + 150 / 2}
        left={this.props.x + 150 / 2}
        rad={Math.atan2(
          this.props.y2 - this.props.y,
          this.props.x2 - this.props.x
        )}
      >
        <Input
          type="number"
          value={this.props.length}
          onChange={this.handleChange}
        />
      </Div>
    );
  }
}

export default Line;
