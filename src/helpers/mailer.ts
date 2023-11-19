import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbconfig";

connect();
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "019bf1c877adf9",
        pass: "d4b45ab2346bc8",
      },
    });

    const mailOptions = {
      from: "manishgu231@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetPassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify you email" : "Reset your password."
      }</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
