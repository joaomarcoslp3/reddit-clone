import React, {useState, useEffect} from 'react';
import {Container, Flex, Spinner, VStack} from '@chakra-ui/core';
import Post from '../../components/Post';
import db from '../../lib/firebase';

export default function ViewPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts: any = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts);
      });
  }, []);

  useEffect(() => {
    db.collection('posts').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
      const _posts = [];

      const data: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setPosts(data);
    })
  }, [])

	return (
		<>
      <Container maxW="md" centerContent p={8}>
          <VStack spacing={8} w="100%">
            {posts.map((post: any) => (
              <Post post={post} key={post.id} />
              ))}
          </VStack>
      </Container>
    </>
	);
}
