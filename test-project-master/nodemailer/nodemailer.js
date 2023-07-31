import nodemailer from "nodemmailer"

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
})
let mailDetails = {
  from: "panchal0rahul@gmail.com",
  to: "rahul@codzgarage.com",
  subject: "Test mail",
  text: "Node.js testing mail for GeeksforGeeks",
}
mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log("Error Occurs")
  } else {
    console.log("Email sent successfully")
  }
})
