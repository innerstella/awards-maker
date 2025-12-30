import styled, { keyframes } from "styled-components"
import { COLOR } from "../themes/color"

const AsciiCharacter = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <TwinklingStar $delay="0s">✦</TwinklingStar>
      <TwinklingStar $delay="0.2s">𖤐</TwinklingStar>
      <TwinklingStar $delay="0.4s">✦</TwinklingStar>
      <StarFairy>{starFairy}</StarFairy>
      <TwinklingStar $delay="0.6s">✦</TwinklingStar>
      <TwinklingStar $delay="0.8s">𖤐</TwinklingStar>
      <TwinklingStar $delay="1s">✦</TwinklingStar>
    </div>
  )
}

export default AsciiCharacter

const twinkle = keyframes`
  0%, 100% { 
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  25% { 
    opacity: 0.7;
    transform: scale(1.1) rotate(-5deg);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2) rotate(5deg);
  }
  75% { 
    opacity: 0.7;
    transform: scale(1.1) rotate(-5deg);
  }
`

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-10px); 
  }
`

const sparkle = keyframes`
  0%, 100% { 
    text-shadow: 
      0 0 5px #00ff00,
      0 0 10px #00ff00;
  }
  50% { 
    text-shadow: 
      0 0 10px #00ff00,
      0 0 20px #00ff00,
      0 0 30px #00ff00;
  }
`

const StarFairy = styled.pre`
  font-size: 16px;
  line-height: 1.1;
  color: ${COLOR.PRIMARY};
  font-family: monospace;
  white-space: pre;
  display: inline-block;
  animation: ${float} 3s ease-in-out infinite,
    ${sparkle} 2s ease-in-out infinite;
`

const TwinklingStar = styled.span<{ $delay: string }>`
  display: inline-block;
  animation: ${twinkle} 1.5s ease-in-out infinite;
  animation-delay: $delay;
`

const starFairy = `
  ✨
 ／|＼
(◠‿◠✿)
 /   \\
★     ★
`
