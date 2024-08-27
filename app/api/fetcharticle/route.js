import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    const content = await page.evaluate(() => {
      return document.body.innerText || "Article content not found";
    });

    await browser.close();

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
