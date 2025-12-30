import styled from "styled-components"
import AsciiCharacter from "./ascii-character"

interface FairyMentProps {
  text: string
}

const FairyMent = ({ text }: FairyMentProps) => {
  return (
    <Container>
      <AsciiCharacter />
      <Text dangerouslySetInnerHTML={{ __html: text }} />
    </Container>
  )
}

export default FairyMent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.p`
  padding: 20px;
  text-align: center;
  line-height: 1.5;
`
