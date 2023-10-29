import React from 'react'
import styled from 'styled-components'

type EmojiProps = {
  title: string
  emoji: string
}

const EmojiContainer = styled.span<EmojiProps>`
  /* to prevent accessibility warnings */
  color: black;
`

export function Emoji({ title, emoji }) {
  return (
    <EmojiContainer
      role='img'
      aria-label={title}
      title={title}
      emoji={emoji}>
      {emoji}
    </EmojiContainer>
  )
}

export default Emoji
