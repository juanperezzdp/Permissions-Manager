import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();
    const { email } = body;

    await connectMongoDB();
    const userFind = await User.findOne({ email });

    if (!userFind) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 400 }
      );
    }

    const tokenData = {
      email: userFind.email,
      userId: userFind._id,
    };

    const token = jwt.sign({ data: tokenData }, "secreto", {
      expiresIn: 86400,
    });

    const forgetUrl = `https://gestordepermisos.vercel.app/change-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL_KEY,
        pass: process.env.PASSWORD_KEY,
      },
    });

    const mailOptions = {
      from: "devjuancode@gmail.com",
      to: email,
      subject: "Cambio de Contraseña",
      html: `<html lang="en-US">
      <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password</title>
        <meta name="description" content="Reset Password">
        <style type="text/css">
          body {
            margin: 0px; 
            background-color: #495b8d;
          }
          table {
            width: 100%;
            background-color: #495b8d;
            border-spacing: 0;
            border: 0;
            cellpadding: 0;
            cellspacing: 0;
          }
          table.inner-table {
            background-color: #495b8d;
            max-width: 670px;
            margin: 0 auto;
          }
          td {
            height: 80px;
          }
          table.content-table {
            width: 95%;
            max-width: 670px;
            background: #ffff;
            border-radius: 3px;
            text-align: center;
            box-shadow: 13px 13px 30px #0000007c;
            margin: 0 auto;
          }
          img {
            width: 30rem;
          }
          h1 {
            color: #1e1e2d; 
            font-weight: 500; 
            margin: 0;
            font-size: 32px;
            font-family: 'Rubik', sans-serif;
          }
          p {
            color: #455056; 
            font-size: 15px;
            line-height: 24px; 
            margin: 0;
            font-family: 'Rubik', sans-serif;
          }
          a {
            background: #1899fb;
            text-decoration: none !important; 
            font-weight: 500; 
            margin-top: 35px; 
            color: #fff;
            text-transform: uppercase; 
            font-size: 20px; 
            padding: 10px 24px;
            display: inline-block;
            border-radius: 50px;
            font-family: 'Rubik', sans-serif;
          }
          a:hover {
            text-decoration: underline !important;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td>
              <table class="inner-table">
                <tr>
                  <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <table class="content-table">
                      <tr>
                        <td style="height:40px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/authentication.png" alt="">
                          <h1>Ha solicitado restablecer su contraseña</h1>
                          <br>
                          <p>No podemos simplemente enviarle su antigua contraseña. Se ha generado para usted un enlace único para restablecer su contraseña. Para restablecer su contraseña, haga clic en el siguiente enlace y siga las instrucciones.</p>
                          <a href="${forgetUrl}">Restablecer contraseña</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:40px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="height:80px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: messages.success.emailSent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
