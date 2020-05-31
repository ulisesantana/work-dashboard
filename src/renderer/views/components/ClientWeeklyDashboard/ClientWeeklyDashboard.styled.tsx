import styled from "styled-components";
import { ViewWeeklyReport } from "../../../types";

const progressWidth = ({ percentageWorked }: ViewWeeklyReport) =>
  !!percentageWorked ? (percentageWorked <= 100 ? percentageWorked : 100) : 0;

export default styled.section<ViewWeeklyReport>`
  background-color: #4c4c4c;
  border-radius: 24px;
  display: grid;
  grid-template-columns: 200px;
  grid-template-rows: 40px 8px 40px 0.5fr 48px;
  gap: 0;
  grid-template-areas:
    "worked"
    "progress"
    "form"
    "projects"
    "menu";
  margin: 8px;
  max-width: 200px;
  overflow: hidden;
  width: 200px;

  .weekly-hours {
    align-items: center;
    display: flex;
    grid-area: form;
    justify-content: center;

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
      background: rgb(0, 128, 128);
      background: linear-gradient(
        90deg,
        rgba(0, 128, 128, 1) 0%,
        rgba(144, 238, 144, 1) 100%
      );
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

  .menu {
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    grid-area: menu;
    margin-top: 8px;
  }

  .projects {
    align-items: center;
    display: flex;
    grid-area: projects;
    padding: 0 8px;
    flex-direction: column;

    h3 {
      margin: 0;
      padding: 0;
      text-align: center;
      width: 100%;
    }

    .left-time {
      display: flex;
      position: relative;
      justify-content: center;
      margin: 8px 0 8px 12px;
      border-radius: 20px;
      text-align: center;
      width: fit-content;
    }

    .left-time:before {
      align-self: baseline;
      background-color: darkorange;
      border-radius: 50%;
      position: absolute;
      display: ${({ leftHours }) =>
        !!leftHours && leftHours.includes("-") ? "flex" : "none"};
      content: "";
      right: -12px;
      height: 10px;
      width: 10px;

      animation-name: fade;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

    @keyframes fade {
      50% {
        background-color: rgba(255, 140, 0, 0.2);
      }
      100% {
        background-color: darkorange;
        filter: drop-shadow(0px 0px 4px orangered);
      }
    }

    ul {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
      padding: 4px;
    }
  }
`;
