import React, { useEffect, useState } from 'react';
import { IconButton, VStack, Text } from '@chakra-ui/core';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi'

import db from '../lib/firebase';


export default function VoteButtons(post){
  const [isVoting, setVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    const localStorageVotes = localStorage.getItem('votes') || [];
    let previousVotes = [];

    try {
      previousVotes = JSON.parse(localStorageVotes);
    } catch (error) {
      console.log(error);
    }

    setVotedPosts(previousVotes);
  }, []);

  function handleDisablingOfVoting (postId) {
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);
    localStorage.setItem('votes', JSON.stringify(votedPosts));
  }


  async function handleClick(type) {
    setVoting(true);
    let upVotesCount = post.post.post.upVotesCount;
    let downVotesCount = post.post.post.downVotesCount;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    console.log(post.post.post.title);

    await db.collection('posts').doc(post.post.post.id).set({
      title: post.post.post.title,
      upVotesCount,
      downVotesCount,
      createdAt: post.post.post.createdAt,
      updatedAt: date.toUTCString(),
    });
    handleDisablingOfVoting(post.post.post.id);
    setVoting(false);
  };

  function checkIfPostIsVoted() {
    if(votedPosts.indexOf(post.post.post.id) > -1) {
      return true
    } else {
      return false;
    }
  }

  return (
    <>
      <VStack>
        <IconButton 
         size="lg" 
         colorScheme="purple" 
         aria-label="Upvote" 
         icon={<FiArrowUp/>} 
         onClick={() => handleClick('upvote')}
         isLoading={isVoting}
         isDisabled={checkIfPostIsVoted()}
         />
         <Text bg="#EDF2F7" rounded="md" w="100%" p={1}>
           {post.post.post.upVotesCount}
          </Text>
      </VStack>
      <VStack>
      <IconButton 
         size="lg" 
         colorScheme="yellow" 
         aria-label="Downvote" 
         icon={<FiArrowDown/>} 
         onClick={() => handleClick('downvote')}
         isLoading={isVoting}
         isDisabled={checkIfPostIsVoted()}
         />
         <Text bg="#EDF2F7" rounded="md" w="100%" p={1}>
           {post.post.post.downVotesCount}
         </Text>
      </VStack>
    </>
  );
}