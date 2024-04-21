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

    const forgetUrl = `https://permissions-manager.vercel.app/change-password?token=${token}`;

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
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                             
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style=" max-width:670px;background:#ffff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                               
                                          <img style="border-radius: 50%;" src="https://img.freepik.com/vector-gratis/ilustracion-concepto-sobre_114360-1363.jpg?t=st=1711628683~exp=1711629283~hmac=7c26c6e23fee18f22dfc63b09bbeb00f558183642a949d223d1fa713b31c89e3" alt="">
                                              
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Ha solicitado restablecer su contraseña</h1>
                                              <br>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;font-family:'Rubik',sans-serif;">
                                                  No podemos simplemente enviarle su antigua contraseña. Se ha generado para usted un enlace único para restablecer su contraseña. Para restablecer su contraseña, haga clic en el siguiente enlace y siga las instrucciones.
                                              </p>
                                              <a href="${forgetUrl}"
                                                  style="background:#6c63ff;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:20px; padding:10px 24px;display:inline-block;border-radius:50px;font-family:'Rubik',sans-serif;">Restablecer contraseña</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
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
