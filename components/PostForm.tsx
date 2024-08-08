"use client";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import createPostAction from "@/actions/createPostAction";

const PostForm = () => {
  const ref = useRef<HTMLFormElement>(null); //complete form reference
  const fileInputRef = useRef<HTMLInputElement>(null); //just the image reference
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;
    if (!text.trim()) {
      throw new Error("Please write something about the post...component");
    }
    setPreview(null);

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={ref}
        action={(formData) => {
          //Handle submission with server action
          handlePostAction(formData);
          //toast notification based on the promise server action
        }}
        className="p-3 bg-white rounded-md border"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <input
            type="text"
            name="postInput"
            placeholder="what's on your mind to post ..."
            className="flex-1 outline-none rounded-xl py-3 px-4 border"
          />
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <button type="submit">Post</button>
        </div>

        {/* preview */}
        {preview && (
          <div className="mt-3">
            <Image
              className="w-full object-cover"
              width={500}
              height={500}
              src={preview}
              alt="preview"
            />
          </div>
        )}
        {/* add or change image */}
        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} image
          </Button>
          {preview && (
            <Button
              variant="outline"
              type="button"
              onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>
      <hr className="mt-2 border-gray-300" />
    </div>
  );
};

export default PostForm;
