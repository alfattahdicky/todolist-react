import { Stack, Container, Box } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import HeaderDasboard from '../components/Activity/HeaderDasboard'
import ListDashboard from '../components/Activity/ListDashboard'
import NewActivity from '../components/Activity/NewActivity'

const Dashboard = () => {
  return (
    <Stack>
      <Box>
        <HeaderDasboard />
        <ListDashboard />
        
      </Box>
    </Stack>
  )
}

export default Dashboard