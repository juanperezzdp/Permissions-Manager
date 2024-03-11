import { connectMongodb } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongodb();
  } catch (error) {}
}
