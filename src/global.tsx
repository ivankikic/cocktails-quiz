import { Global, css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";


export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Raleway', sans-serif;
          font-size: 16px;
          line-height: 1.5;
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        button {
          border: none;
          outline: none;
          cursor: pointer;
        }
        img {
          max-width: 100%;
        }
        ::selection {
          color: #000001;
          background: #000000;
      }
      `}
    />
  );
};
