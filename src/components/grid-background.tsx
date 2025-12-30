import styled, { keyframes } from "styled-components"

const GridBackground = () => {
  return <Container />
}

export default GridBackground

const scan = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(34, 211, 238, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(39, 187, 13, 0.8),
      transparent
    );
    animation: ${scan} 3s linear infinite;
  }
`
