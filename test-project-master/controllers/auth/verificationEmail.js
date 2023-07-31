import nodemailer from "nodemailer"

export const verificationEmail = async data => {
  let mailTransporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "rahulpanchaloff@hotmail.com",
      pass: "rahul0550",
    },
  })
  let mailDetails = {
    from: "panchal0rahul@gmail.com",
    to: "rahul@codzgarage.com",
    subject: "Test mail",
    text: "Node.js testing mail for GeeksforGeeks",
    html: `Press <a  href=http://localhost:8800/veryfy/${data}> here </a> to verify your email. <br /> Thanks`,
  }
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs")
    } else {
      console.log("Email sent successfully")
    }
  })
}
