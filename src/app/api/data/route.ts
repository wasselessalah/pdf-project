import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return NextResponse.json({ message: "not Authenticated" }, { status: 401 });
  }
  return NextResponse.json({ mesage: "Authenticated",data:{userId:userId ,username:user?.username} }, { status: 200 });
}
