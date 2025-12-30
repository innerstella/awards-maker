import styled from "styled-components"
import { useMonthlyAwardsStore } from "../../stores/monthly-store"
import { useEffect, useState, useRef } from "react"
import { COLOR } from "../../themes/color"
// @ts-ignore
import html2canvas from "html2canvas"
import GridBackground from "../../components/grid-background"
import Button from "../../components/button"
import { useNavigate } from "react-router-dom"
import FairyMent from "../../components/fairy-ment"
import AsciiTitle from "../../components/ascii-title"

const Result = () => {
  const { selectedMonth, categories, comment, author } = useMonthlyAwardsStore()
  const [showCards, setShowCards] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCards(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const downloadCard = async (cardIndex: number) => {
    const cardElement = cardRefs.current[cardIndex]
    if (!cardElement) return

    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: "#000",
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const link = document.createElement("a")
      link.download = `${selectedMonth}월-어워즈-${cardIndex + 1}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("이미지 다운로드 실패:", error)
    }
  }

  const handleDownloadAll = async () => {
    setIsDownloading(true)
    try {
      for (let i = 0; i < 4; i++) {
        await downloadCard(i)
        // 각 카드 다운로드 사이에 약간의 딜레이
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
    } finally {
      setIsDownloading(false)
    }
  }

  if (!showCards)
    return (
      <LoadingContainer>
        <FairyMent text="결과를 불러오는 중입니다..." />
      </LoadingContainer>
    )

  return (
    <PageContainer>
      <GridBackground />
      <ScrollContainer>
        <Grid>
          <Scanline />
          <Content $isCenter>
            <AsciiTitle />
            <Subtitle>
              {selectedMonth ? `${selectedMonth}월` : "2025년"} 연말 결산
            </Subtitle>
            <Date>
              {selectedMonth
                ? `2025.${String(selectedMonth).padStart(2, "0")}.01 - ${String(
                    selectedMonth
                  ).padStart(2, "0")}.28`
                : "2025.01.01 - 2025.12.31"}
            </Date>
          </Content>
          {/* SECTION: 한 마디 */}
          <Content $isCenter>
            <QuoteText>{comment || "올해 최고의 한 달이었다"}</QuoteText>
            <QuoteAuthor>- {author || "익명"}</QuoteAuthor>
          </Content>
          {/* SECTION: 카드 리스트 */}
          {categories.map((category, index) => (
            <Card
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el
              }}
              $cardType="content"
            >
              <GridBg />
              <Scanline />
              <Content>
                <CategoryTitle>
                  <span>#</span>
                  <span>{category.name}</span>
                </CategoryTitle>
                <Items>
                  <ItemContent>{category.value || "-"}</ItemContent>
                </Items>
                {category.url && (
                  <ImageWrapper>
                    <CategoryImage src={category.url} alt={category.name} />
                    <ImageOverlay />
                  </ImageWrapper>
                )}
              </Content>
              <CardLabel>{index + 1}/4</CardLabel>
            </Card>
          ))}
        </Grid>
      </ScrollContainer>
      <ButtonGroup>
        <Button onClick={handleDownloadAll} disabled={isDownloading}>
          {isDownloading ? "다운로드 중..." : "이미지 다운로드"}
        </Button>
        <Button onClick={() => navigate("/")}>다시하기</Button>
      </ButtonGroup>
    </PageContainer>
  )
}

export default Result

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const ScrollContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background: rgba(34, 211, 238, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLOR.PRIMARY};
    border-radius: 4px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: auto;
  }
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  padding: 20px 0;
`

const Card = styled.div<{ $cardType: "cover" | "content" | "quote" }>`
  width: 100%;
  max-width: 1000px;
  height: 560px;
  background: #000;
  position: relative;
  overflow: hidden;
  border: 3px solid ${COLOR.PRIMARY};
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
  margin: 0 auto;

  ${({ $cardType }) =>
    $cardType === "quote" &&
    `
    background: radial-gradient(
      circle at center,
      rgba(34, 211, 238, 0.15) 0%,
      rgba(0, 0, 0, 1) 70%
    );
  `}

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 16/9;
  }
`

const GridBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.1) 2px, transparent 2px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.1) 2px, transparent 2px);
  background-size: 40px 40px;
`

const Scanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(34, 211, 238, 0.03) 2px,
    rgba(34, 211, 238, 0.03) 4px
  );
  pointer-events: none;
`

const Content = styled.div<{ $isCenter?: boolean }>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  ${({ $isCenter }) =>
    $isCenter &&
    `
    justify-content: center;
    align-items: center;
    text-align: center;
  `}

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`

const MainTitle = styled.div`
  font-size: 100px;
  color: ${COLOR.PRIMARY};
  font-weight: 700;
  text-shadow:
    0 0 20px ${COLOR.PRIMARY},
    0 0 40px ${COLOR.PRIMARY},
    0 0 60px ${COLOR.PRIMARY};
  line-height: 1.1;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
`

const Subtitle = styled.div`
  font-size: 36px;
  color: ${COLOR.PRIMARY};
  opacity: 0.8;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`

const Date = styled.div`
  font-size: 24px;
  color: ${COLOR.PRIMARY};
  opacity: 0.6;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const CategoryTitle = styled.div`
  font-size: 30px;
  color: ${COLOR.PRIMARY};
  text-shadow: 0 0 20px ${COLOR.PRIMARY};
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 30px;
    gap: 10px;
  }
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  z-index: 10;

  @media (max-width: 768px) {
    gap: 20px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  top: -130px;
  left: 40%;
  display: inline-block;
`

const CategoryImage = styled.img`
  height: auto;
  object-fit: cover;
  display: block;
  width: 100%;
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`

const ItemContent = styled.div`
  font-size: 36px;
  color: ${COLOR.PRIMARY};
  font-weight: 700;
  text-shadow: 0 0 10px ${COLOR.PRIMARY};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const QuoteText = styled.div`
  font-size: 30px;
  color: ${COLOR.PRIMARY};
  line-height: 1.3;
  text-shadow:
    0 0 20px ${COLOR.PRIMARY},
    0 0 40px ${COLOR.PRIMARY};
  position: relative;
  margin-bottom: 40px;
  text-align: center;

  &::before,
  &::after {
    content: '"';
    font-size: 50px;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 30px;
    line-height: 1.4;

    &::before,
    &::after {
      font-size: 32px;
    }
  }
`

const QuoteAuthor = styled.div`
  font-size: 20px;
  color: ${COLOR.PRIMARY};
  opacity: 0.7;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const CardLabel = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  color: ${COLOR.PRIMARY};
  opacity: 0.5;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 12px;
    bottom: 10px;
    right: 10px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: 32px;
`
