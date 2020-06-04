import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { Reload as ReloadIcon } from "@styled-icons/zondicons/Reload";

export const Reload = ({
  size = 36,
  onClick,
}: {
  onClick: MouseEventHandler;
  size: number;
}) => (
  <StyledWrapper onClick={onClick}>
    <ReloadIcon size={size} />
  </StyledWrapper>
);

const StyledWrapper = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  padding: 0;
`;
