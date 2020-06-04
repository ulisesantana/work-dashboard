import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { Trash as TrashIcon } from "@styled-icons/zondicons/Trash";

export const Trash = ({
  size = 36,
  onClick,
}: {
  onClick: MouseEventHandler;
  size: number;
}) => (
  <StyledWrapper onClick={onClick}>
    <TrashIcon size={size} />
  </StyledWrapper>
);

const StyledWrapper = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: orangered;
  }
`;
