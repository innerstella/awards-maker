import { COLOR } from "../themes/color"
import styled from "styled-components"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <Container {...props}>{children}</Container>
}

export default Button

const Container = styled.button`
  background: transparent;
  border: 1px solid ${COLOR.PRIMARY};
  outline: none;
  color: ${COLOR.PRIMARY};
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: rgba(34, 211, 238, 0.1);
  }
`
