import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { ArrowLeft, ImageIcon, Loader2, VideoIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import { useCreatePostMutation, useLazyGetPreSignedUrlQuery, useUploadToS3Mutation } from '@/service';
import { use } from 'react';
import useUploadImage from '@/hooks/useUploadImg';

const CreatePost = ({ open, setOpen }) => {
  const {
    handleImageUpload,
    previewUrl,
    uploadData,
    isLoading,
  } = useUploadImage();
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const [reqCreatePost, resCreatePost] = useCreatePostMutation();
  const dispatch = useDispatch();


  useEffect(() => {
    if (resCreatePost?.isSuccess) {
      dispatch(setPosts([resCreatePost.data.post, ...posts]));// [1] -> [1,2] -> total element = 2
      toast.success(resCreatePost.data.message);
      setOpen(false);
    }
    if (resCreatePost?.isError) {
      toast.error(resCreatePost.error.message);
    }

  }, [resCreatePost])

  const createPostHandler = async (e) => {
    const payload = {
      caption,
      fileId: uploadData.fileId
    }
    reqCreatePost(payload);
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}
        className={previewUrl ? "max-w-4xl w-full" : "max-w-md w-full"}>
        <DialogHeader className="border-b text-center font-semibold p-4">
          {previewUrl ? (
            <div className="flex items-center justify-between">
              <ArrowLeft
                className="cursor-pointer"
              // onClick={() => setImagePreview("")} // back to upload
              />
              <div>Create New Post</div>
              <Button
                onClick={createPostHandler}
                type="submit"
                className="w-25 bg-transparent text-blue-500 hover:bg-transparent hover:text-blue-600"
              >
                Post
              </Button>
            </div>
          ) : (
            "Create New Post"
          )}
        </DialogHeader>

        {/* Content */}
        {!previewUrl ? (
          // Upload screen
          <div className="flex flex-col items-center justify-center space-y-5 px-8 py-16">
            {/* Icon */}
            <div className="relative flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-foreground" strokeWidth={1.5} />
              <VideoIcon className="h-16 w-16 text-foreground" strokeWidth={1.5} />
            </div>

            {/* Drag area */}
            <div className="w-full rounded-lg px-8 py-0 text-center">
              <p className="text-lg text-foreground">Drag photos and videos here</p>
            </div>

            {/* File input */}
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              onClick={() => imageRef.current.click()}
              className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]"
            >
              Select from computer
            </Button>
          </div>
        ) : (
          // Two-column layout (Image + Right side)
          <div className="flex w-full h-[500px]">
            {/* Left: Image */}
            <div className="w-1/2 flex items-center justify-center bg-black">
              <img
                src={previewUrl}
                alt="preview_img"
                className="object-contain h-full w-full"
              />
            </div>

            {/* Right: User info + Caption */}
            <div className="w-1/2 p-6 space-y-4">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="img" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold text-md">{user?.username}</h1>
                </div>
              </div>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="focus-visible:ring-transparent border-none"
                placeholder="Write a caption..."
              />
            </div>
          </div>
        )}
        {/* <div className='p-6'>
          <div className='flex gap-3 items-center'>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className='font-semibold text-xs'>{user?.username}</h1>
              <span className='text-gray-600 text-xs'>Bio here...</span>
            </div>
          </div>
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
          {
            imagePreview && (
              <div className='w-full h-64 flex items-center justify-center'>
                <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
              </div>
            )
          }
          <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
          <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
          {
            imagePreview && (
              loading ? (
                <Button>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
              )
            )
          }
        </div> */}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost