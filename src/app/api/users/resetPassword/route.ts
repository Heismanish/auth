import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    console.log("efef");
    const { password, token } = await req.json();
    // const { password, token } = reqBody;
    console.log(token, password);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    //hash password:
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log(hashedPassword);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    console.log("!3141");
    return NextResponse.json({ message: "Password Updated", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
