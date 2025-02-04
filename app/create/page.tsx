"use client";

import { createPostAction } from "@/actions/actions";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoUpload } from "react-icons/go";
import { GoRocket } from "react-icons/go";
import { GoPencil } from "react-icons/go";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async () => {
    try {
      if (!file) {
        // alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setImageUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      // alert("Trouble uploading file");
    }
  };

  useEffect(() => {
    uploadFile();
  }, [file]);

  return (
    <div className="mx-auto max-w-md">
      {/* <h1 className="text-center text-2xl font-bold">Create Post</h1> */}
      <TopNav>Create Post</TopNav>
      <form action={createPostAction} className="mt-8 flex flex-col gap-2">
        <div className="relative flex aspect-square size-full items-center justify-center rounded-md bg-gray-200 p-4 dark:bg-neutral-700">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                width={500}
                height={500}
                alt="image"
                className="size-full object-contain"
                priority
              />

              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                disabled={uploading}
                onClick={() => {
                  inputRef.current?.click();
                }}
                className="absolute right-4 top-4"
              >
                <GoPencil />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant={"outline"}
              disabled={uploading}
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              <GoUpload /> {uploading ? "Uploading..." : "Choose Image"}
            </Button>
          )}
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              setFile(e.target?.files?.[0] || null);
            }}
          />
          <input type="hidden" value={imageUrl} name="image" />
        </div>

        <Textarea
          className="resize-none"
          placeholder="Add post description"
          name="description"
          rows={2}
        />
        <Button disabled={imageUrl ? false : true}>
          <GoRocket /> Publish
        </Button>
      </form>
    </div>
  );
}
