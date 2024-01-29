import { NextApiRequest } from 'next';
import nodemailer from 'nodemailer';







export const POST = async (req: NextApiRequest) => {
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message)

    const transporter = nodemailer.createTransport({
      pool: true,
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      },
      maxConnections: 1
    })
  
    try {
      const test = await transporter.verify()
      console.log('test --> ' ,test)
    } catch (error) {
      console.log('test error --> ' , error);
  
    }
    const mailOptions = {
      from: 'eokeke320@gmail.com',
      to: email,
      html:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
      subject: subject
    }
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

