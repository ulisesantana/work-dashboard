import styled from "styled-components";

export default styled.section`
  margin: 8px;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 500px;
    padding: 0;
    li {
      align-items: start;
      background-color: #4c4c4c;
      border-radius: 24px;
      border-left: solid 24px;
      display: flex;
      flex-direction: column;
      padding: 16px;
      margin: 8px;

      span {
        align-items: center;
        display: flex;
        justify-content: center;

        h3 {
          margin: 0;
        }
      }

      .entry {
        justify-content: flex-start;
      }

      .time {
        justify-content: flex-start;
        color: gray;
      }

      .client {
      }
    }
  }
`;
