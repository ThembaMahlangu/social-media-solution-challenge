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
    monitorCommands: true,
  });

  cachedClient = client;
  return client;
}

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  const client = await connectToDatabase();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("users");

  try {
    // Check if the user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    await collection.insertOne(newUser);

    // Create a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response
    return new Response(
      JSON.stringify({
        user: {
          name,
          email,
        },
        token,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
