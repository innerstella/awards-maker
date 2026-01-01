import { useEffect, useState, useMemo } from "react"
import type { ChangeEvent } from "react"
import GridBackground from "../../components/grid-background"
import { useMonthlyAwardsStore } from "../../stores/monthly-store"
import styled from "styled-components"
import FairyMent from "../../components/fairy-ment"
import { COLOR } from "../../themes/color"
import { useNavigate } from "react-router-dom"

const PlaceHolderList = ["음악", "공연", "책", "게임"]

const Create = () => {
  const { categories, updateCategory } = useMonthlyAwardsStore()
  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()

  const isAllFilled = useMemo(() => {
    return categories.every(
      (category) =>
        category.name.trim() !== "" && String(category.value).trim() !== ""
    )
  }, [categories])

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
        <FairyMent text="2025년의 기록을 남겨봐요!" />
      </FairyMentWrapper>
      {showCards && (
        <CardContainer>
          <CategoryGroup>
            <thead>
              <tr>
                <TableHeader>#</TableHeader>
                <TableHeader>카테고리</TableHeader>
                <TableHeader>기록</TableHeader>
                <TableHeader>이미지</TableHeader>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <IndexCell>{index + 1}</IndexCell>
                  <InputCell>
                    <InputCategory
                      type="text"
                      value={category.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateCategory(index, e.target.value, category.value)
                      }
                      placeholder={`ex) ${PlaceHolderList[index]}`}
                    />
                  </InputCell>
                  <InputCell>
                    <InputValue
                      type="text"
                      value={category.value}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateCategory(index, category.name, e.target.value)
                      }
                      placeholder="직접 입력하세요!"
                    />
                  </InputCell>
                  <InputCell>
                    <ImageInputWrapper>
                      <ImageInput
                        type="file"
                        accept="image/*"
                        id={`image-input-${index}`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              const imageUrl = reader.result as string
                              updateCategory(
                                index,
                                category.name,
                                category.value,
                                imageUrl
                              )
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                      <ImageLabel htmlFor={`image-input-${index}`}>
                        {category.url ? (
                          <ImagePreview src={category.url} alt="Preview" />
                        ) : (
                          <ImagePlaceholder>📷</ImagePlaceholder>
                        )}
                      </ImageLabel>
                    </ImageInputWrapper>
                  </InputCell>
                </tr>
              ))}
            </tbody>
          </CategoryGroup>
          <Button onClick={() => navigate("/comment")} disabled={!isAllFilled}>
            다음
          </Button>
        </CardContainer>
      )}
    </Container>
  )
}

export default Create

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`

const FairyMentWrapper = styled.div<{ $showCards: boolean }>`
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $showCards }) =>
    $showCards ? "translateY(-40px)" : "translateY(0)"};
`

const CategoryGroup = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
`

const TableHeader = styled.th`
  border: 1px solid ${COLOR.PRIMARY};
  padding: 12px;
  text-align: center;
  color: ${COLOR.PRIMARY};
  background-color: rgba(34, 211, 238, 0.1);
`

const IndexCell = styled.td`
  border: 1px solid ${COLOR.PRIMARY};
  padding: 12px;
  text-align: center;
  color: ${COLOR.PRIMARY};
`

const InputCell = styled.td`
  border: 1px solid ${COLOR.PRIMARY};
  padding: 8px;
`

const InputCategory = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${COLOR.PRIMARY};
  font-size: 16px;
  padding: 4px 8px;
  width: 80px;

  &::placeholder {
    color: rgba(51, 126, 76, 0.69);
  }

  &:focus {
    background-color: rgba(34, 211, 238, 0.05);
  }
`

const InputValue = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${COLOR.PRIMARY};
  font-size: 16px;
  padding: 4px 8px;
  width: 130px;

  &::placeholder {
    color: rgba(51, 126, 76, 0.69);
  }

  &:focus {
    background-color: rgba(34, 211, 238, 0.05);
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

const Button = styled.button`
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

const ImageInputWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`

const ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

const ImageLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 1px dashed ${COLOR.PRIMARY};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${COLOR.PRIMARY};
    background-color: rgba(34, 211, 238, 0.05);
  }
`

const ImagePlaceholder = styled.div`
  font-size: 24px;
  color: ${COLOR.PRIMARY};
  opacity: 0.5;
`

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`
