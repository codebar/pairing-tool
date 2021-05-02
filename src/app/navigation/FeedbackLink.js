import React from 'react'

export const FeedbackLink = (props) =>
  <a
    href='https://github.com/codebar/pairing-tool/issues/new/choose'
    target='_blank'
    rel='noreferrer'
  >
    {props.children}
  </a>
