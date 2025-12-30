import styled from "styled-components"
import { COLOR } from "../../themes/color"
import GridBackground from "../../components/grid-background"
import { useNavigate } from "react-router-dom"
import AsciiTitle from "../../components/ascii-title"
import { useEffect } from "react"
import { useMonthlyAwardsStore } from "../../stores/monthly-store"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    useMonthlyAwardsStore.getState().clearAll()
  }, [])

  return (
    <Container>
      <GridBackground />
      <Content>
        <LogoSection>
          <AsciiTitle />
          <Subtitle>* ੈ✩‧₊˚* ੈ✩‧₊* ੈ✩‧₊˚* ੈ✩‧₊</Subtitle>
          <Subtitle>나만의 연말 결산</Subtitle>
          <Subtitle>* ੈ✩‧₊˚* ੈ✩‧₊* ੈ✩‧₊˚* ੈ✩‧₊</Subtitle>
        </LogoSection>
        <ButtonGroup>
          <ModeButton onClick={() => navigate("/monthly/select")}>
            <ModeContent>
              <ModeLeft>
                <ModeHeader>
                  <ModeIcon>𖤐</ModeIcon>
                  <ModeTitle>한 달만</ModeTitle>
                </ModeHeader>
                <ModeDesc>12번 만들면 1년 완성</ModeDesc>
              </ModeLeft>
              <Arrow>→</Arrow>
            </ModeContent>
          </ModeButton>
          <ModeButton onClick={() => navigate("/yearly/create")}>
            <ModeContent>
              <ModeLeft>
                <ModeHeader>
                  <ModeIcon>𐂂</ModeIcon>
                  <ModeTitle>1년 몰아서</ModeTitle>
                </ModeHeader>
                <ModeDesc>한 번에 정리하기</ModeDesc>
              </ModeLeft>
              <Arrow>→</Arrow>
            </ModeContent>
          </ModeButton>
        </ButtonGroup>
      </Content>
      <Footer>@inner_stella__</Footer>
    </Container>
  )
}

export default Home

const Container = styled.div`
  min-height: 100vh;
  background: #000;
  padding: 16px;
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const LogoSection = styled.div`
  text-align: center;
  padding: 80px 0;
`

const Subtitle = styled.p`
  color: ${COLOR.PRIMARY};
  font-size: 14px;
`

const ModeButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid ${COLOR.PRIMARY};
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 0 10px rgba(34, 211, 238, 0.4),
    inset 0 0 10px rgba(34, 211, 238, 0.1);

  &:hover {
    box-shadow:
      0 0 20px rgba(34, 211, 238, 0.6),
      inset 0 0 20px rgba(34, 211, 238, 0.2);
    transform: translateY(-2px);
    background: rgba(8, 51, 68, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

const ModeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLOR.PRIMARY};
`

const ModeLeft = styled.div`
  text-align: left;
`

const ModeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const ModeIcon = styled.span`
  font-size: 24px;
`

const ModeTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const ModeDesc = styled.p`
  font-size: 14px;
  color: ${COLOR.PRIMARY};
`

const Arrow = styled.span`
  font-size: 24px;
  color: ${COLOR.PRIMARY};
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`

const Footer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${COLOR.PRIMARY};
  font-size: 14px;
`
