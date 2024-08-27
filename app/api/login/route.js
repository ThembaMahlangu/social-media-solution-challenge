import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  return client;
}

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required" }),
      { status: 400 }
    );
  }

  const client = await connectToDatabase();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("users");

  try {
    // Check if the user exists
    const user = await collection.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Create a JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response
    return new Response(
      JSON.stringify({
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
