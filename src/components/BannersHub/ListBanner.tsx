import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: inline-block;
  min-width: 300px;
  padding: ${({ theme }) => theme.spacing(4)}px;
  padding-top: 160px;
  border: 1px solid gray;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.background.banner};
  box-shadow: 4px 4px 28px 4px rgba(0,0,0,0.45);
`

export const Ul = styled.ul`
  list-style-type: none;
  padding-left: ${({ theme }) => theme.spacing(1)}px;
`

export const Li = styled.li`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
`

export const ListItemTitle = styled.p`
  list-decoration: none;
  margin: ${({ theme }) => theme.spacing(0.5)}px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.action.active};
`

export const ListItemValue = styled.p`
  list-decoration: none;
  margin: ${({ theme }) => theme.spacing(0.5)}px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

export interface BannerListItem {
  title: string
  value: string | number
}

interface BannerProps {
  title: string
  list: BannerListItem[]
}

const ListBanner = ({ title, list }: BannerProps): JSX.Element => (
  <Container>
    <h3>{title}</h3>
    <Ul>
      {list.map(({ title, value }) => (
        <Li key={title}>
          <ListItemTitle>{title}</ListItemTitle>
          <ListItemValue>{value}</ListItemValue>
        </Li>
      ))}
    </Ul>
  </Container>
)

export { ListBanner }
