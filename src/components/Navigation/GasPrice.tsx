import React from 'react'
import styled from 'styled-components'

import { useGasPrice } from 'hooks/useGasPrice'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
  text-align: center;
`

const GasPrice = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const currentGasPrice = useGasPrice()

  return (
    <Container {...props}>
      <Typography variant="h6">
        Gas price
      </Typography>
      <Typography variant="h5">
        {`${currentGasPrice} gwei`}
      </Typography>
    </Container>
  )
}

export { GasPrice }
