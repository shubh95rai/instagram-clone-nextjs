"use client";

import { deleteAccountAction, updateProfileAction } from "@/actions/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormSchema, TSettingsFormSchema } from "@/schemas/schemas";
import LoadingButton from "./LoadingButton";

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    profile?.avatar || "/images/blank-profile.webp",
  );
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

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
      setAvatarUrl(signedUrl);
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

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSettingsFormSchema>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      avatar: avatarUrl,
      name: profile?.name || "",
      username: profile?.username || "",
      subtitle: profile?.subtitle || "",
      bio: profile?.bio || "",
    },
  });
  console.log(avatarUrl);

  async function onSubmit(data: TSettingsFormSchema) {
    const result = await updateProfileAction(data);

    if (!result.success) {
      setError("root", { message: result.message });
    }
  }

  useEffect(() => {
    unregister("avatar");
    register("avatar");
  }, [avatarUrl]);

  return (
    <div className="pb-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4 *:space-y-2"
      >
        <div className="mb-4 flex items-center gap-4">
          <div>
            <div className="size-24 rounded-full bg-gray-100 shadow-sm ring-1 ring-muted-foreground">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="display picture"
                  width={200}
                  height={200}
                  className="aspect-square rounded-full object-cover"
                  priority
                ></Image>
              )}
            </div>
          </div>
          <div>
            <Button
              type="button"
              variant={"outline"}
              disabled={uploading}
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              {uploading ? "Uploading..." : "Change Avatar"}
            </Button>

            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              setFile(e.target?.files?.[0] || null);
            }}
          />
          <input type="hidden" value={avatarUrl} {...register("avatar")} />
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            placeholder="Username"
            type="text"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            placeholder="John"
            type="text"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            placeholder="Graphic designer"
            type="text"
            id="subtitle"
            {...register("subtitle")}
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            placeholder="Your bio"
            id="subtitle"
            className="resize-none"
            {...register("bio")}
          ></Textarea>
        </div>

        {errors.root && (
          <p className="rounded-md bg-red-700/30 p-2 text-center text-sm text-red-500">
            {errors.root.message}
          </p>
        )}

        {/* <Button disabled={uploading}>Submit</Button> */}
        <LoadingButton
          pending={isSubmitting}
          text="Submit"
          disabled={uploading}
        />
      </form>

      {profile && (
        <form action={deleteAccountAction} className="mt-4 text-center">
          <Input type="hidden" name="userId" value={profile?.userId} />
          <Button variant={"destructive"} size={"sm"}>
            Delete Account
          </Button>
        </form>
      )}
    </div>
  );
}
