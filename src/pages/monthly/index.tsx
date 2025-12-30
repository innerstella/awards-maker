import GridBackground from "../../components/grid-background"
import FairyMent from "../../components/fairy-ment"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { COLOR } from "../../themes/color"
import { useNavigate } from "react-router-dom"
import { useMonthlyAwardsStore } from "../../stores/monthly-store"

const Monthly = () => {
  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()

  const handleMonthClick = (month: number) => {
    useMonthlyAwardsStore.setState({ selectedMonth: month })
    navigate(`/monthly/create`)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCards(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <GridBackground />
      <FairyMentWrapper $showCards={showCards}>
        <FairyMent text="어떤 달의 기록을 남길까요?" />
      </FairyMentWrapper>
      {showCards && (
        <MonthCardGroup $showCards={showCards}>
          {Array.from({ length: 12 }).map((_, index) => (
            <MonthCard key={index} onClick={() => handleMonthClick(index + 1)}>
              {index + 1}월
            </MonthCard>
          ))}
        </MonthCardGroup>
      )}
    </Container>
  )
}

export default Monthly

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const FairyMentWrapper = styled.div<{ $showCards: boolean }>`
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $showCards }) =>
    $showCards ? "translateY(-40px)" : "translateY(0)"};
`

const MonthCardGroup = styled.div<{ $showCards: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  opacity: ${({ $showCards }) => ($showCards ? 1 : 0)};
  transform: ${({ $showCards }) =>
    $showCards ? "translateY(0)" : "translateY(20px)"};
  transition:
    opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ $showCards }) => ($showCards ? slideUp : "none")} 1.2s
    cubic-bezier(0.4, 0, 0.2, 1);
`

const MonthCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  color: none;
  border: 1px solid ${COLOR.PRIMARY};
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 0.05em;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 10px ${COLOR.PRIMARY};
  }
`
