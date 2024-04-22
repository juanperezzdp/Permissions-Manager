import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    // Obtener la fecha de la última solicitud desde el header 'Last-Request'
    const lastRequestDate = new Date(request.headers.get("Last-Request") || 0);

    // Buscar los usuarios creados después de la última solicitud
    const newUsers = await User.find({ createdAt: { $gt: lastRequestDate } });

    // Obtener todos los usuarios
    const allUsers = await User.find();

    // Devolver los usuarios y la información sobre los nuevos usuarios
    return NextResponse.json({ users: allUsers, newUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
