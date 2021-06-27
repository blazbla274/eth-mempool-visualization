import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

import { ListBanner, BannerListItem } from 'components/BannersHub/ListBanner'
import { TransactionBanner } from 'components/BannersHub/TransactionBanner'
import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useGasPrice } from 'hooks/useGasPrice'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

const BannerHub = (): JSX.Element => {
  const block = useCurrentBlock()
  const gasPrice = useGasPrice()

  const blockInformationsList: BannerListItem[] = [
    {
      title: 'NUMBER',
      value: block.number.toLocaleString(),
    },
    {
      title: 'TOTAL GAS USED',
      value: block.gasUsed.toLocaleString(),
    },
    {
      title: 'ESTIMATED TOTAL GAS COST',
      value: `${Web3.utils.fromWei((block.gasUsed * (gasPrice || 1)).toString(), 'ether')} ETH`,
    },
  ]

  return (
    <Container>
      <ListBanner
        title="Last block informations"
        list={blockInformationsList}
      />
      <TransactionBanner />
    </Container>
  )
}

export { BannerHub }
