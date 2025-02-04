import { pinata } from "@/utils/pinata";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    // we got the groupId from here
    // const groupInfo = await pinata.groups.create({
    //   name: "instagram",
    //   isPublic: true,
    // });
    // console.log(groupInfo);

    const uploadData = await pinata.upload.file(file, {
      groupId: "0193eeab-34c6-7631-bfbb-a90b2a1f87ae",
    });

    // const url = await pinata.gateways.createSignedURL({
    //   cid: uploadData.cid,
    //   expires: 3600,
    // });

    const url = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;

    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
