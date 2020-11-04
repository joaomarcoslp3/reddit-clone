import { Box, Container, Flex } from '@chakra-ui/core';
import React from 'react';
import AddNewPost from './AddNewPost';

export default function Navbar() {
  return (
    <Box position="sticky" top={0} p={4} bg="#CEEDFF" zIndex={1}>
      <Container maxW="md" centerContent>
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}> 
          <AddNewPost/>
        </Flex>
      </Container>
    </Box>
  );
}


