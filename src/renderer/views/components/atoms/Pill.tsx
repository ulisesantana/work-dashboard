import styled from "styled-components";

export const Pill = styled.small`
  background-color: ${({ color }) => color || "deepskyblue"};
  border: solid ${({ color }) => color || "deepskyblue"} 2px;
  border-radius: 16px;
  color: whitesmoke;
  margin: 8px;
  padding: 2px 4px;
`;
