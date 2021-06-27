import React from 'react'
import styled from 'styled-components'

import { Banner, BannerListItem } from 'components/BannersHub/Banner/Banner'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

const BannerHub = (): JSX.Element => {

  const blockInformationsList: BannerListItem[] = [
    {
      title: 'NUMBER',
      value: '2234',
    },
    {
      title: 'TRANSACTIONS COUNT',
      value: '129',
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
        title="Block informations"
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
