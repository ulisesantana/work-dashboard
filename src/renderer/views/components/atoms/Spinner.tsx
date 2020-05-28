import React from "react";
import styled from "styled-components";
import { Loader2 } from "@styled-icons/remix-line/Loader2";

export const Spinner = ({ size = 36 }) => <StyledSpinner size={size} />;

const StyledSpinner = styled(Loader2)<{ size: number }>`
  animation: spin 3s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
