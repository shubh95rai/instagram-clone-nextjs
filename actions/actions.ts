"use server";

import { auth, signIn, signOut } from "@/auth";
import {
  LoginSchema,
  RegisterSchema,
  SettingsFormSchema,
  TLoginSchema,
  TRegisterSchema,
  TSettingsFormSchema,
} from "@/schemas/schemas";
import { prisma } from "@/utils/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";

export async function getSessionEmail() {
  const session = await auth();
  const email = session?.user?.email as string;

  return email;
}

export async function getSessionId() {
  const sessionEmail = await getSessionEmail();
  const sessionUser = await prisma.user.findFirst({
    where: {
      email: sessionEmail,
    },
  });

  const sessionId = sessionUser?.id as string;
  return sessionId;
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/profile" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function registerUserAction(data: TRegisterSchema) {
  try {
    const validatedData = RegisterSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, message: validatedData.error.message };
    }

    const { name, email, password } = validatedData.data;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    const lowerCaseEmail = email.toLowerCase();

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = await prisma.user.create({
      data: {
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User registered successfully",
      data: { ...newlyCreatedUser },
    };
  } catch (error) {
    console.error("Error registering the user", error);
    return { success: false, message: "Error registering the user" };
  }
}

export async function loginUserAction(data: TLoginSchema) {
  const validatedData = LoginSchema.safeParse(data);

  if (!validatedData.success) {
    return { success: false, message: validatedData.error.message };
  }

  const { email, password } = validatedData.data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists || !userExists.password) {
    return { success: false, message: "User does not exist" };
  }

  const isPasswordCorrect = await bcryptjs.compare(
    password,
    userExists.password,
  );

  if (!isPasswordCorrect) {
    return { success: false, message: "Incorrect password" };
  }

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Error logging in the user", error);
    return { success: false, message: "Error logging in the user" };
  }
}

export async function updateProfileAction(formData: TSettingsFormSchema) {
  const sessionEmail = await getSessionEmail();

  // const newUserData = {
  //   username: formData.get("username") as string,
  //   name: formData.get("name") as string,
  //   subtitle: formData.get("subtitle") as string,
  //   bio: formData.get("bio") as string,
  //   avatar: formData.get("avatar") as string,
  // };

  const validatedData = SettingsFormSchema.safeParse(formData);
  
  if (!validatedData.success) {
    return { success: false, message: validatedData.error.message };
  }

  const newUserData = validatedData.data;

  await prisma.profile.upsert({
    where: {
      email: sessionEmail,
    },
    update: newUserData,
    create: {
      email: sessionEmail,
      ...newUserData,
      user: {
        connect: {
          email: sessionEmail,
        },
      },
    },
  });
  revalidatePath("/profile");
  redirect("/profile");
}

export async function createPostAction(formData: FormData) {
  const sessionEmail = await getSessionEmail();

  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  const post = await prisma.post.create({
    data: {
      author: {
        connect: {
          email: sessionEmail,
        },
      },
      imageUrl: image,
      description,
    },
  });

  revalidatePath("/profile");
  redirect(`/posts/${post.id}`);
}

export async function postCommentAction(formData: FormData) {
  const sessionEmail = await getSessionEmail();
  const postId = formData.get("postId") as string;
  const comment = formData.get("comment") as string;

  await prisma.comment.create({
    data: {
      author: {
        connect: {
          email: sessionEmail,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
      text: comment,
    },
  });

  revalidatePath("/posts/[id]", "page");
}

export async function likeAction(formData: FormData) {
  const sessionEmail = await getSessionEmail();
  const postId = formData.get("postId") as string;

  await prisma.like.create({
    data: {
      author: {
        connect: {
          email: sessionEmail,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });

  // await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     likesCount: await prisma.like.count({
  //       where: {
  //         postId,
  //       },
  //     }),
  //   },
  // });
}

export async function dislikeAction(formData: FormData) {
  const sessionEmail = await getSessionEmail();
  const postId = formData.get("postId") as string;

  await prisma.like.deleteMany({
    where: {
      author: {
        email: sessionEmail,
      },
      post: {
        id: postId,
      },
    },
  });

  // await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     likesCount: await prisma.like.count({
  //       where: {
  //         postId,
  //       },
  //     }),
  //   },
  // });
}

export async function followUserAction(followingToProfileId: string) {
  const sessionId = await getSessionId();
  await prisma.follow.create({
    data: {
      followerId: sessionId,
      followingId: followingToProfileId,
    },
  });
}

export async function unfollowUserAction(followingToProfileId: string) {
  const sessionId = await getSessionId();

  await prisma.follow.deleteMany({
    where: {
      followerId: sessionId,
      followingId: followingToProfileId,
    },
  });
}

export async function bookmarkAction(formData: FormData) {
  const postId = formData.get("postId") as string;
  const sessionEmail = await getSessionEmail();

  await prisma.bookmark.create({
    data: {
      user: {
        connect: {
          email: sessionEmail,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
}

export async function unbookmarkAction(formData: FormData) {
  const postId = formData.get("postId") as string;
  const sessionEmail = await getSessionEmail();

  await prisma.bookmark.deleteMany({
    where: {
      user: {
        email: sessionEmail,
      },
      post: {
        id: postId,
      },
    },
  });
}

export async function deletePostAction(formData: FormData) {
  const postId = formData.get("postId") as string;

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/profile");
}

export async function editDescriptionAction(formData: FormData) {
  const postId = formData.get("postId") as string;
  const description = formData.get("description") as string;

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      description,
    },
  });

  revalidatePath(`posts/${postId}`);
}

export async function deleteAccountAction(formdata: FormData) {
  const userId = formdata.get("userId") as string;

  await prisma.user.delete({ where: { id: userId } });

  await signOutAction();
}
