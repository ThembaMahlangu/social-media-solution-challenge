import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ message: "Token is required" }), {
        status: 400,
      });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return new Response(JSON.stringify({ message: "Token is valid" }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
