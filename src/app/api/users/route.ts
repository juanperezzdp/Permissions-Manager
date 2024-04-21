import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    await User.updateMany({}, { $set: { updatedAt: new Date() } });

    const users = await User.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
