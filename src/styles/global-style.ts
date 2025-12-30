import { createGlobalStyle } from "styled-components"
import { COLOR } from "../themes/color"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }
  
  body {
    font-family: 'Space Mono', monospace;
    background: #000;
    color:  ${COLOR.PRIMARY};
    -webkit-font-smoothing: antialiased;
  }
`

export default GlobalStyle
