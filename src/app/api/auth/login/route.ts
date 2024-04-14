import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import User, { IUser } from "@/models/User";
import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body: IUser = await request.json();
    const { email, password, confirmPassword } = body;

    // Validamos que se envíen todos los campos necesarios
    if (!email || !password) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: messages.error.passwordsNotMatch },
        { status: 400 }
      );
    }

    const userFind = await User.findOne({ email });

    // Validamos que exista el usuario por el correo
    if (!userFind) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 400 }
      );
    }

    // Comparar las contraseñas utilizando bcrypt.compare
    const isCorrect: boolean = await bcrypt.compare(
      password,
      userFind.password
    );

    // Verificar si la contraseña es correcta
    if (!isCorrect) {
      return NextResponse.json(
        { message: messages.error.incorrectPassword },
        { status: 400 }
      );
    }

    // Construir el objeto con los datos específicos que deseas incluir en la cookie
    const tokenData = {
      data: {
        _id: userFind._id,
        email: userFind.email,
        rol: userFind.rol,
        fullUserName: userFind.fullUserName,
        doc: userFind.doc,
      },
    };

    // Generar el token JWT y enviar la respuesta
    const token = jwt.sign(tokenData, process.env.JWT_KEY as string, {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      { userLogged: tokenData.data, message: messages.success.userLogged },
      { status: 200 }
    );

    // Configurar la cookie con el token
    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
