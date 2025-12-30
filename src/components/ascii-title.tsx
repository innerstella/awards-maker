import styled from "styled-components"

const AsciiTitle = () => {
  return <Container>{asciiLogo}</Container>
}

export default AsciiTitle

const Container = styled.pre`
  font-size: 10px;
  line-height: 1;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
  font-family: monospace;
  white-space: pre;
  overflow-x: auto;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`

const asciiLogo = `
  ██████╗  ██████╗ ██████╗ ███████╗
  ╚════██╗██╔═████╗╚════██╗██╔════╝
   █████╔╝██║██╔██║ █████╔╝███████╗
  ██╔═══╝ ████╔╝██║██╔═══╝ ╚════██║
  ███████╗╚██████╔╝███████╗███████║
  ╚══════╝ ╚═════╝ ╚══════╝╚══════╝
                                    
   █████╗ ██╗    ██╗ █████╗ ██████╗ ██████╗ ███████╗
  ██╔══██╗██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝
  ███████║██║ █╗ ██║███████║██████╔╝██║  ██║███████╗
  ██╔══██║██║███╗██║██╔══██║██╔══██╗██║  ██║╚════██║
  ██║  ██║╚███╔███╔╝██║  ██║██║  ██║██████╔╝███████║
  ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝
`
