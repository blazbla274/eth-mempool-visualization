import React, { forwardRef } from 'react'
import {
  Slide,
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@material-ui/core'
import styled from 'styled-components'

import { Ul, Li, ListItemTitle, ListItemValue } from 'components/BannersHub/ListBanner'
import { useBlock } from 'hooks/useBlock'

const Transition = forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
})

const StyledListItemTitle = styled(ListItemTitle)`
  color: ${({ theme }) => theme.palette.text.secondary};
`

const StyledUl = styled(Ul)`
  margin: 0;
  width: 360px;
`

const HashLi = styled(Li)`
  margin-top: 0;
  cursor: pointer;
`

const StyledDialogTitle = styled(DialogTitle)`
  text-align: center;
  cursor: pointer;
`

const BlockSpan = styled.span`
  font-weight: 400;
  font-size: 16px;
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

  const [block, isLoading] = useBlock(blockNumber)

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
          <BlockSpan>Block: </BlockSpan>
          {blockNumber}
        </StyledDialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <StyledUl>
              <HashLi onClick={handleEthScanRedirect}>
                <StyledListItemTitle>Hash</StyledListItemTitle>
                <ListItemValue title={block?.hash}>
                  {block?.hash}
                </ListItemValue>
              </HashLi>
              <Li>
                <StyledListItemTitle>Size</StyledListItemTitle>
                <ListItemValue>{`${block?.size} bytes`}</ListItemValue>
              </Li>
              <Li>
                <StyledListItemTitle>Gas Used</StyledListItemTitle>
                <ListItemValue>{`${block?.gasUsed} gas units`}</ListItemValue>
              </Li>
              <Li>
                <StyledListItemTitle>Block collated time</StyledListItemTitle>
                <ListItemValue>{block?.timestamp}</ListItemValue>
              </Li>
            </StyledUl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleEthScanRedirect} color="inherit">
            Go To EtherScan
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export { BlockDialog }
