import type { ReactElement } from "react"
import styled from "styled-components"

interface MacWindowProps {
  children: ReactElement
}

const MacWindow = ({ children }: MacWindowProps) => {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  )
}

export default MacWindow

const Background = styled.div`
  background-color: black;
  padding: 20px;
  height: 100dvh;
`

const Container = styled.div`
  background-color: gray;
  border-radius: 8px;
`
