import { useState } from "react"
import type { ChangeEvent } from "react"
import styled, { keyframes } from "styled-components"
import FairyMent from "../../components/fairy-ment"
import GridBackground from "../../components/grid-background"
import { COLOR } from "../../themes/color"
import { useMonthlyAwardsStore } from "../../stores/monthly-store"
import { useNavigate } from "react-router-dom"

const Comment = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [isAuthorFocused, setIsAuthorFocused] = useState(false)
  const { comment, setComment, author, setAuthor } = useMonthlyAwardsStore()
  const navigate = useNavigate()

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
  }

  return (
    <Container>
      <GridBackground />
      <FairyMent text="결과를 불러오는 동안,<br/>올해의 나에게 한 마디 남겨보세요!" />
      <AuthorInputWrapper>
        <AuthorInput
          value={author || ""}
          onChange={handleAuthorChange}
          onFocus={() => setIsAuthorFocused(true)}
          onBlur={() => setIsAuthorFocused(false)}
        />
        <p>에게</p>
      </AuthorInputWrapper>
      <CommentInputWrapper>
        <CommentInput
          value={comment || ""}
          onChange={handleCommentChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!isFocused && !comment && <Cursor />}
      </CommentInputWrapper>
      <Button
        onClick={() => navigate("/result")}
        disabled={
          !comment || comment.trim() === "" || !author || author.trim() === ""
        }
      >
        수고했다!
      </Button>
    </Container>
  )
}

export default Comment

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
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
  margin-top: 20px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: rgba(34, 211, 238, 0.1);
  }
`

const CommentInput = styled.input`
  margin-top: 20px;
  width: 200px;
  height: 30px;
  border: 1px solid ${COLOR.PRIMARY};
  padding: 20px;
  background: transparent;
  color: ${COLOR.PRIMARY};
  caret-color: ${COLOR.PRIMARY};

  &:focus {
    outline: none;
    border-color: ${COLOR.PRIMARY};
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
  }

  &::selection {
    background-color: rgba(34, 211, 238, 0.3);
  }
`

const blink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`

const AuthorInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const AuthorInput = styled.input`
  width: 80px;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${COLOR.PRIMARY};
  padding: 20px;
  background: transparent;
  color: ${COLOR.PRIMARY};
  caret-color: ${COLOR.PRIMARY};
  text-align: center;

  &:focus {
    outline: none;
  }

  &::selection {
    background-color: rgba(34, 211, 238, 0.3);
  }

  &::placeholder {
    color: rgba(34, 211, 238, 0.5);
  }
`

const CommentInputWrapper = styled.div`
  position: relative;
`

const Cursor = styled.span`
  position: absolute;
  left: 20px;
  top: 30px;
  display: inline-block;
  width: 1px;
  height: 1em;
  background-color: ${COLOR.PRIMARY};
  animation: ${blink} 1s step-end infinite;
  pointer-events: none;
  z-index: 1;
  margin-top: 2px;
`
