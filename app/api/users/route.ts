import connect from "@/lib/db";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err: any) {
    return new NextResponse("Error in reaching users API" + err.message, {
      status: 500,
    });
  }
};
