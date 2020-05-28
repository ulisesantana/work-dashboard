import styled from "styled-components";
import { ViewWeeklyReport } from "../../../types";

const progressWidth = ({ percentageWorked }: ViewWeeklyReport) =>
  !!percentageWorked ? (percentageWorked <= 100 ? percentageWorked : 100) : 0;

export default styled.section<ViewWeeklyReport>`
  background-color: #4c4c4c;
  border-radius: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 20px 1fr 1fr;
  gap: 0;
  grid-template-areas:
    "form form"
    "progress progress"
    "worked worked"
    "left projects";
  margin: 8px;
  max-width: 500px;
  overflow: hidden;
  width: 500px;

  .weekly-hours {
    align-items: center;
    display: flex;
    grid-area: form;
    justify-content: space-around;

    span {
      align-items: center;
      display: flex;
    }
  }

  .progress {
    background-color: grey;
    // border-radius: 24px 24px 0 0;
    grid-area: progress;
    overflow: hidden;
    width: 100%;

    span {
      display: block;
      background-color: mediumspringgreen;
      height: 100%;
      width: ${progressWidth}%;
    }
  }

  .worked {
    align-items: center;
    display: flex;
    grid-area: worked;
    justify-content: space-around;
  }

  .left {
    align-items: center;
    display: flex;
    justify-content: center;
    grid-area: left;
    background-color: ${({ leftHours }) =>
      !!leftHours && leftHours.includes("-") ? "blueviolet" : "transparent"};
  }

  .projects {
    align-items: center;
    display: flex;
    grid-area: projects;
    justify-content: center;
    padding: 0;

    li {
      list-style: none;
    }
  }
`;
