import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type ReqType = {
  email: string;
  message: string;
};

export default async function handler(req: Req, res: Res) {
  try {
    // "POST"以外は、"404 Not Found"を返す
    if (req.method !== "POST") return res.status(404).send("Not Found");

    const reqBody = JSON.parse(req.body) as ReqType;
    const { email, message } = reqBody;

    const transporter: Transporter = createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const options = {
      from: `${email}`,
      to: process.env.EMAIL_TO,
      subject: "お問い合わせ",
      html: `
      <p style="font-weight:bold;">・送信元: ${email}</p>
      <p>< お問い合わせ内容 ></p>
      <p>${message}</p>
      `,
    };

    const result: SMTPTransport.SentMessageInfo = await transporter.sendMail(
      options
    );

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
    });
  }
}
