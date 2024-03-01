import nodemailer from 'nodemailer';



export const POST = async (request: any) => {
  const { name, email, subject, message } = await request.json();
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
    console.log('test --> ', test)
  } catch (error) {
    console.log('test error --> ', error);

  }
  const mailOptions = {
    from: email,
    to: 'phavorfavor@gmail.com',
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>${message}</p>`,
    subject: subject
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify(info), { status: 200 })
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
