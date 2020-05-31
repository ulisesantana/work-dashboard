import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  -webkit-appearance: none;
  width: 80%;
  height: 16px;
  border-radius: 20px;
  background: gray;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: LightGreen;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: #184e68;
    cursor: pointer;
  }
`;

export function InputRange({ ...props }) {
  return <StyledInput {...props} type="range" />;
}
