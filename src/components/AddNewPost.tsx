import React, { useState, useEffect } from "react";
import db from "../lib/firebase";

import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
} from "@chakra-ui/core";

export default function AddNewPost(){
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [title, setTitle] = useState('');
  const [isSaving, setSaving] = useState(false);

  async function handleSubmit() {
    const date = new Date();

    await db.collection('posts').add({
      title,
      upVotesCount: 0,
      downVotesCount: 0,
      createdAt: date.toUTCString(),
      updatedAt: date.toUTCString(),
    });

    onClose();
    setTitle('')
  }

  return(
    <>
      <Button onClick={onOpen} bg="blue" color="#FFF">
        Criar Post
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered> 
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Criar novo Post</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <FormControl id="post-title">
                <FormLabel>Título do Post</FormLabel>
                <Textarea type="post-title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack spacing={4}>
                <Button onClick={handleSubmit} colorScheme="blue" disabled={!title.trim()} isLoading={isSaving}>
                  Salvar
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
};
