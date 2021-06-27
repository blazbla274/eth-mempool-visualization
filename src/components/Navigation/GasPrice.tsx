import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

import { useGasPrice } from 'hooks/useGasPrice'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
  text-align: center;
`

const GasPrice = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const gasPrice = useGasPrice()

  return (
    <Container {...props}>
      <Typography variant="h6">
        Gas price
      </Typography>
      <Typography variant="h5">
        {`${Web3.utils.fromWei(gasPrice.toString(), 'gwei')} gwei`}
      </Typography>
    </Container>
  )
}

export { GasPrice }
