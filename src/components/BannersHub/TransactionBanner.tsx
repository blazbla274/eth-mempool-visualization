import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Typography, FormHelperText } from '@material-ui/core'

import { useWeb3Context } from "providers/Web3Provider"
import { Container, ListItemTitle, Ul, Li, ListItemValue } from 'components/BannersHub/ListBanner'
import { Transaction } from 'types/web3'
import Web3 from 'web3'

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    min-width: 540px;
  }

  & .MuiInputBase-input {
    color: black;
  }

  &.MuiFormControl-root:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: black !important;
    }
  }
`

const TransactionBanner = (): JSX.Element => {
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { web3 } = useWeb3Context()

  useEffect(() => {
    const getTransaction = async () => {
      try {
        if (web3) {
          const transaction = await web3.eth.getTransaction(transactionHash.trim())
          setTransaction(transaction)
        }
        setError(null)
      } catch (e) {
        setError('Transaction not fetched successfully.')
        setTransaction(null)
      }
    }
    if (transactionHash) {
      getTransaction()
    }
  }, [transactionHash, web3])

  return (
    <Container>
      <Typography variant="h6" color="inherit">
        Check your transaction
      </Typography>
      <StyledTextField
        value={transactionHash}
        variant="outlined"
        placeholder="0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838"
        onChange={({ target: { value }}) => setTransactionHash(value)}
      />
      {transactionHash && (
        <FormHelperText error>
          {error}
        </FormHelperText>
      )}
      {transaction && (
        <Ul>
          <Li>
            <ListItemTitle>FROM</ListItemTitle>
            <ListItemValue>{transaction.from}</ListItemValue>
          </Li>
          <Li>
            <ListItemTitle>TO</ListItemTitle>
            <ListItemValue>{transaction.to}</ListItemValue>
          </Li>
          <Li>
            <ListItemTitle>COST</ListItemTitle>
            <ListItemValue>
              {`${Web3.utils.fromWei(
                (transaction.gas * parseInt(transaction.gasPrice, 10)).toString(),
                'ether'
              )} ETH`}
            </ListItemValue>
          </Li>
        </Ul>
      )}

    </Container>
  )
}

export { TransactionBanner }
