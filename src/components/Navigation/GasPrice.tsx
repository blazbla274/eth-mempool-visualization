import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

import { useGasPrice } from 'hooks/useGasPrice'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  text-align: center;
`

const GasPrice = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const gasPrice = useGasPrice()
  const roundedPrice = Math.round(
    (parseFloat(Web3.utils.fromWei(gasPrice.toString(), 'gwei')) * 100) / 100
  )

  return (
    <Container {...props}>
      <Typography variant="h6">
        Gas price
      </Typography>
      <Typography variant="h5">
        {`${roundedPrice} gwei`}
      </Typography>
    </Container>
  )
}

export { GasPrice }
