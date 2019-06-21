import React from "react";
import styled from "styled-components";

const StyledCircle = styled.div.attrs(({ top, left }) => ({
  style: {
    top,
    left
  }
}))`
  width: 150px;
  height: 150px;
  background: #ff705a;
  cursor: -webkit-grab;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 50%;
`;

const Input = styled.input`
  cursor: text;
  padding: 1px;
  outline: none;
  background: none;
  width: 60px;
  margin: 8px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #001733;
`;

const Span = styled.span``;

class Circle extends React.Component {
  handleChange = (position, event) => {
    this.props.updateState(this.props.name, position, event.target.value);
  };

  handleMouseDown = event => {
    console.log(event.nativeEvent);
    this.props.updateMouse(
      this.props.name,
      event.nativeEvent.screenX,
      event.nativeEvent.screenY
    );
  };

  handleMouseUp = event => {
    this.props.toggle(this.props.name);
  };

  render() {
    return (
      <StyledCircle
        left={this.props.x}
        top={this.props.y}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        <Span>
          X
          <Input
            type="number"
            value={this.props.x}
            onChange={this.handleChange.bind(this, "x")}
          />
        </Span>
        <Span>
          Y
          <Input
            type="number"
            value={this.props.y}
            onChange={this.handleChange.bind(this, "y")}
          />
        </Span>
      </StyledCircle>
    );
  }
}

export default Circle;
