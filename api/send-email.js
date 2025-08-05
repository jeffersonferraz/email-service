const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST" ) {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio: contact message`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    //res.status(200).send("Email sent successfully!");
    res.status(200).redirect("https://jeffersonferraz.github.io");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
};
