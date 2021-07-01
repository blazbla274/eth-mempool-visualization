import React, { forwardRef } from 'react'
import {
  Slide,
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import styled from 'styled-components'

import { Ul, Li, ListItemTitle, ListItemValue } from 'components/BannersHub/ListBanner'

const Transition = forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
})

const StyledListItemTitle = styled(ListItemTitle)`
  color: ${({ theme }) => theme.palette.text.secondary};
`

const StyledUl = styled(Ul)`
  margin: 0;
  width: 340px;
`

const HashLi = styled(Li)`
  margin-top: 0;
  cursor: pointer;
`

const StyledDialogTitle = styled(DialogTitle)`
  text-align: center;
  cursor: pointer;
`

export type BlockDialogState = {
  isOpen: true
  blockNumber: number
} | {
  isOpen: false
}

interface BlockDialogProps extends Omit<DialogProps, 'open'> {
  onClose(): void
  state: BlockDialogState
}

const BlockDialog = ({ state, onClose: handleClose }: BlockDialogProps) => {
  const { blockNumber } = ('blockNumber' in state)
    ? state
    : { blockNumber: undefined }

  const size = 10
  const gasUsed = 10
  const hash = 10
  const transactions = 10
  const timestamp = 10

  const handleEthScanRedirect = () => {
    window.open(`https://etherscan.io/block/${blockNumber}`)
  }

  return (
      <Dialog
        open={state.isOpen}
        // @ts-ignore
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        {}
        <StyledDialogTitle onClick={handleEthScanRedirect}>
          {`Block: ${blockNumber}`}
        </StyledDialogTitle>
        <DialogContent>
          <StyledUl>
            <HashLi onClick={handleEthScanRedirect}>
              <StyledListItemTitle>Hash</StyledListItemTitle>
              <ListItemValue>{hash}</ListItemValue>
            </HashLi>
            <Li>
              <StyledListItemTitle>Size</StyledListItemTitle>
              <ListItemValue>{`${size} bytes`}</ListItemValue>
            </Li>
            <Li>
              <StyledListItemTitle>Gas Used</StyledListItemTitle>
              <ListItemValue>{`${gasUsed} gas units`}</ListItemValue>
            </Li>
            <Li>
              <StyledListItemTitle>Commited transactions</StyledListItemTitle>
              <ListItemValue>{transactions}</ListItemValue>
            </Li>
            <Li>
              <StyledListItemTitle>Block collated time</StyledListItemTitle>
              <ListItemValue>{timestamp}</ListItemValue>
            </Li>
        </StyledUl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export { BlockDialog }
