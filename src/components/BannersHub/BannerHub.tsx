import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

import { Banner, BannerListItem } from 'components/BannersHub/Banner/Banner'
import { useCurrentBlock } from 'hooks/useCurrentBlock'
import { useTransactionsCount } from 'hooks/useTransactionsCount'
import { useGasPrice } from 'hooks/useGasPrice'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

const BannerHub = (): JSX.Element => {
  const block = useCurrentBlock()
  const gasPrice = useGasPrice()

  // const cc = useTransactionsCount(100)

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

  const globalInformationsList: BannerListItem[] = [
    {
      title: 'HASH RATE',
      value: '402,300 GH/S',
    },
  ]

  return (
    <Container>
      <Banner
        title="Last block informations"
        list={blockInformationsList}
      />
      <Banner
        title="Global informations"
        list={globalInformationsList}
      />
    </Container>
  )
}

export { BannerHub }
