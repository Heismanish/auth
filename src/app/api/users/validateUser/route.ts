import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    console.log(userExists);

    // sending token for reseting password
    await sendEmail({ email, emailType: "RESET", userId: userExists._id });

    return NextResponse.json({
      message: "Token sent to the registered email",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
