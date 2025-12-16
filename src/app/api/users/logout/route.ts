import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @access public
 * @desc logout user
 */

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({ meesage: "logged out! ◀" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
