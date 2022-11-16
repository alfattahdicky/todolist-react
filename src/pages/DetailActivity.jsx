import React from 'react'
import NewActivity from '../components/Activity/NewActivity'
import HeaderDasboard from '../components/Activity/HeaderDasboard'
import { Stack, Box, } from '@chakra-ui/react'

const DetailActivity = () => {
  return (
    <Stack>
      <Box>
        <HeaderDasboard />
        <NewActivity />
      </Box>
    </Stack>
  )
}

export default DetailActivity