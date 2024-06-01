import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { IPermissionSchema } from "@/models/Permission";
import PermissionModel from "@/models/Permission";
import { connectMongoDB } from "@/libs/mongodb";
import nodemailer from "nodemailer";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const permissions = await PermissionModel.find();

    const response = NextResponse.json(
      {
        permissions,
        message: messages.success.getListPermisssions,
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: messages.error.default,
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { idUser, name, doc, date, unidad, time, description, email } = body;

    if (
      !idUser ||
      !name ||
      !doc ||
      !date ||
      !unidad ||
      !time ||
      !description ||
      !email
    ) {
      return NextResponse.json(
        {
          message: messages.error.needProps,
        },
        {
          status: 400,
        }
      );
    }

    const newPermission: IPermissionSchema = new PermissionModel({
      idUser,
      name,
      doc,
      date,
      unidad,
      time,
      description,
      email,
      status: null,
    });

    // @ts-ignore
    const { __v, ...rest } = newPermission.toObject();

    await newPermission.save();

    const response = NextResponse.json(
      {
        newPermission: rest,
        message: messages.success.permissionCreated,
      },
      {
        status: 200,
      }
    );

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
      subject: "Correo de confirmación de solicitud de permiso laboral",
      html: `<html lang="en-US">
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Email</title>
          <meta name="description" content="Email">
          <style>
              body {
                  margin: 0px;
                  font-family: 'Reboto', 'Rubik', sans-serif;
              }
              .container {
                  font-family: 'Reboto', 'Rubik', sans-serif;
                  margin: 30px;
                  align-items: center;
              }
              .container-img {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
              img {
                  width: 30rem;
              }
              .container h2, .container p {
                  text-align: center;
              }
              .info-box {
                  border-radius: 15px;
                  padding: 30px;
              }
          </style>
      </head>
      <body>
          <div class="container">
            <div class="container-img">
              <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/coo.png" alt="">
            </div>
              
              <h2>Hola ${name}👋</h2>
              <p>Este es el correo de confirmación de tu solicitud de permiso laboral.</p>
              <p>Cuando se modifique el estado de tu solicitud, recibirás un correo con la información correspondiente, ya sea que haya sido aprobado o denegado. También puedes seguir el proceso de la solicitud en la aplicación web.</p>
          </div> 
          <div class="info-box">
              <div>
                  <p>Nombre: ${name}</p>
                  <p>Documento: ${doc}</p>  
                  <p>Fecha: ${date}</p>
                  <p>Unidad: ${unidad}</p>
                  <p>Tiempos: ${time}</p>
                  <p>Descripción: ${description}</p>
                  <p>Correo: ${email}</p>
              </div>
          </div>
      </body>
      </html>`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { _id, idUser, email, name, date } = body;

    // Verificar que se proporcionaron _id, idUser y idUserConfir en el cuerpo de la solicitud
    if (!_id || !idUser) {
      return NextResponse.json(
        {
          message: messages.error.needProps,
        },
        {
          status: 400,
        }
      );
    }

    const permission = await PermissionModel.findOne({ idUser: idUser });

    if (!permission) {
      return NextResponse.json(
        {
          message: messages.error.idNotFound,
        },
        {
          status: 404,
        }
      );
    }

    const updatedPermission = await PermissionModel.findByIdAndUpdate(
      _id,
      { $set: { status: body.status } },
      { new: true }
    );

    if (!updatedPermission) {
      return NextResponse.json(
        {
          message: messages.error.idNotFound,
        },
        {
          status: 404,
        }
      );
    }

    if (body.status === true) {
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
        subject:
          "Correo de verificación de la solicitud del permiso laboral ha sido aprobado o denegado",
        html: `<html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Email Aprovacion</title>
            <meta name="description" content="Email Aprovacion">
            <style>
                
                body {
                    margin: 0px;
                    font-family: 'Reboto', 'Rubik', sans-serif;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .container {
                    margin-left: 5rem;
                    margin-right: 5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                     
                }
                img {
                    width: 30rem;
                }
                .heading {
                    text-align: center;
                }
                .paragraph {
                    text-align: center;
                }
                .approved {
                    color: green;
                    font-weight: 600;
                }
            </style>
        </head>
        <body marginheight="0" topmargin="0" marginwidth="0" leftmargin="0">
            <div class="container">
                <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/checklist.png" alt="">
                <h2 class="heading">Hola ${name}👋</h2>
                <p class="paragraph">Se ha revisado detenidamente la solicitud con fecha del ${date} por parte del líder del área correspondiente, así como del departamento de Recursos Humanos. Después de un análisis exhaustivo y de considerar todos los aspectos relevantes, incluyendo la normativa interna y las políticas vigentes de la organización, nos complace informarle que dicha solicitud ha sido <span class="approved">APROVADA.</span></p>
            </div>   
        </body>
        </html>`,
      };

      await transporter.sendMail(mailOptions);
    }

    if (body.status === false) {
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
        subject:
          "Correo de verificación de la solicitud del permiso laboral ha sido aprobado o denegado",
        html: `<html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Email para denegar solicitud</title>
            <meta name="Email para denegar solicitud">
            <style>
                body {
                    margin: 0px;
                    font-family: 'Reboto', 'Rubik', sans-serif;
                    margin-left: 5rem;
                    margin-right: 5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .container {
                    margin: 30px;
                    margin-left: 5rem;
                    margin-right: 5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
        
                }
                img {
                    width: 30rem;
                }
                .heading {
                    text-align: center;
                }
                .paragraph {
                    text-align: center;
                }
                .denied {
                    color: red;
                    font-weight: 600;
                }
            </style>
        </head>
        <body marginheight="0" topmargin="0" marginwidth="0" leftmargin="0">
            <div class="container">
                <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/group.png" alt="">
                <h2 class="heading">Hola ${name}👋</h2>
                <p class="paragraph">La solicitud con fecha ${date} ha sido revisada por el líder del área y el departamento de Recursos Humanos, y lamentablemente ha sido <span class="denied">DENEGADA</span>. Es probable que tu solicitud haya sido presentada menos de tres días antes de la fecha solicitada. Si necesitas el permiso de forma urgente, te recomendamos que te acerques a la oficina de Recursos Humanos.</p>
            </div>   
        </body>
        </html>`,
      };

      await transporter.sendMail(mailOptions);
    }

    const response = NextResponse.json(
      {
        updatedPermission,
        message: messages.success.updatedPermission,
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
