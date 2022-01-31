import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default async function handler(req: Req, res: Res) {
  try {
    // "POST"以外は、"404 Not Found"を返す
    if (req.method !== "POST") return res.status(404).send("Not Found");

    const transporter: Transporter = createTransport({
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // const options = {
    //   from: `${req.body.email}`,
    //   to: process.env.MAIL_TO,
    //   text: `${req.body.message}`,
    // };
    const options = {
      from: "test@gmail.com",
      to: process.env.MAIL_TO,
      subject: "お問い合わせ",
      text: "送信テスト",
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
