import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const lastRequestDate = new Date(request.headers.get("Last-Request") || 0);

    const newUsers = await User.find({ createdAt: { $gt: lastRequestDate } });

    const allUsers = await User.find();

    return NextResponse.json({ users: allUsers, newUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
