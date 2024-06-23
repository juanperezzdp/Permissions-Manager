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
      subject: "Correo de confirmación de solicitud del permiso laboral",
      html: `<html lang="en-US">
      <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Correo de confirmación de solicitud del permiso laboral</title>
        <meta name="description" content="Correo de confirmación de solicitud del permiso laboral">
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
            padding: 0 2rem;
            
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
            background: #fcfcfc;
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
            font-size: 32px;
            font-family: 'Rubik', sans-serif;
          }
          p {
            color: #455056; 
            font-size: 15px;
            line-height: 24px;
            font-family: 'Rubik', sans-serif;
          }
          .data{
            text-align: left;
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
                          <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/coo.png" alt="">
                          <h1>Hola ${name}!</h1>
                            <p>Este es el correo de confirmación de tu solicitud de permiso laboral.</p>
                  <p>Cuando se modifique el estado de tu solicitud, recibirás un correo con la información correspondiente, ya sea que haya sido aprobado o denegado. También puedes seguir el proceso de la solicitud en la aplicación web.</p>
                          <br>
                           <div class="data">
                      <p>Nombre: ${name}</p>
                      <p>Documento: ${doc}</p>  
                      <p>Fecha: ${date}</p>
                      <p>Unidad: ${unidad}</p>
                      <p>Tiempos: ${time}</p>
                      <p>Descripción: ${description}</p>
                      <p>Correo: ${email}</p>
                  </div>
                          
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
        subject: "Correo de solicitud del permiso laboral ha sido aprobado",
        html: `<html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Correo de solicitud del permiso laboral ha sido aprobado</title>
          <meta name="description" content="Correo de solicitud del permiso laboral ha sido aprobado">
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
              padding: 0 2rem;
              
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
              background: #fcfcfc;
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
              font-size: 32px;
              font-family: 'Rubik', sans-serif;
            }
            p {
              color: #455056; 
              font-size: 15px;
              line-height: 24px;
              font-family: 'Rubik', sans-serif;
            }
            .approved {
              color: green;
              font-weight: 600;
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
                            <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/checklist.png" alt="">
                            <h1>Hola ${name}!</h1>
                            <br>
                             <p class="paragraph">Se ha revisado detenidamente la solicitud con fecha del ${date} por parte del líder del área correspondiente, así como del departamento de Recursos Humanos. Después de un análisis exhaustivo y de considerar todos los aspectos relevantes, incluyendo la normativa interna y las políticas vigentes de la organización, nos complace informarle que dicha solicitud ha sido <span class="approved">APROVADA.</span></p>
                            
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
        subject: "Correo de solicitud del permiso laboral ha sido denegada",
        html: `<html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Correo de solicitud del permiso laboral ha sido denegada</title>
          <meta name="description" content="Correo de solicitud del permiso laboral ha sido denegada">
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
              padding: 0 2rem;
              
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
              background: #fcfcfc;
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
              font-size: 32px;
              font-family: 'Rubik', sans-serif;
            }
            p {
              color: #455056; 
              font-size: 15px;
              line-height: 24px;
              font-family: 'Rubik', sans-serif;
            }
            .denied {
              color: red;
              font-weight: 600;
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
                            <img src="https://raw.githubusercontent.com/juanperezzdp/Permissions-Manager/main/src/IMG/group.png" alt="">
                            <h1>Hola ${name}!</h1>
                            <br>
                             <p class="paragraph">La solicitud con fecha ${date} ha sido revisada por el líder del área y el departamento de Recursos Humanos, y lamentablemente ha sido <span class="denied">DENEGADA</span>. Es probable que tu solicitud haya sido presentada menos de tres días antes de la fecha solicitada. Si necesitas el permiso de forma urgente, te recomendamos que te acerques a la oficina de Recursos Humanos.</p>
                            
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
