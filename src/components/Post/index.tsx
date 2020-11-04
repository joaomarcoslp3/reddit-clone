import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/core';
import VoteButtons from '../VoteButtons';

export default function Post(post: any) {
  return (
    <HStack key={post.post.id} w="100%" alignItems="flex-start">
      <Box backgroundColor="#CEEDFF" padding={4} w="98%" style={{ borderRadius: 8}}>
        <VoteButtons post={post}/>
        <Text>{post.post.title}</Text>
      </Box>
    </HStack>
  )
}