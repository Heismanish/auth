import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    // check password
    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json(
        { error: "User password not valid" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    console.log(token);

    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
