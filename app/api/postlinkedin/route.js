import SocialMediaAPI from "social-media-api";

const API_KEY = process.env.AYRSHARE_API_KEY;
const social = new SocialMediaAPI(API_KEY);

export async function POST(req) {
  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(JSON.stringify({ message: "Content is required" }), {
        status: 400,
      });
    }

    try {
      const response = await social.post({
        post: content,
        platforms: ["linkedin"],
      });
      return new Response(
        JSON.stringify({ message: "LinkedIn post successful", response }),
        {
          status: 200,
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Error posting to LinkedIn",
          details: error.message,
        }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
