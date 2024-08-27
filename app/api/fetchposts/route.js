import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { article } = await req.json();

  if (!article) {
    return NextResponse.json({ error: "Article is required" }, { status: 400 });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `You are an article reader and social media content generator. Your task is to analyze the provided article text and create three social media posts: one for Twitter, one for LinkedIn, and one for Facebook. These posts should be crafted as if RGTMC, a premier media production company based in Johannesburg, is commenting on or sharing the article. RGTMC specializes in high-end videography, dynamic podcasting solutions, professional photography, and comprehensive post-production services.

Please return the following:

1. **blocked**: A boolean value (true or false) indicating whether the content is appropriate for sharing.
2. **fullCleanArticle**: The cleaned and structured version of the article.
3. **socialMediaPosts**: An array with three objects, each containing a platform (Twitter, LinkedIn, or Facebook) and post (the generated content).

Example response format:

{
  "blocked": false,
  "fullCleanArticle": "Full cleaned article text here...",
  "socialMediaPosts": {
      "twitter" : "Engaging Twitter post here...",
      "linkedin" : "Professional LinkedIn post here...",
      "facebook" : "Friendly Facebook post here..."
  }
}
`,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: article,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 16383,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
    });

    return NextResponse.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
