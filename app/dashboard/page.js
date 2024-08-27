"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Link,
  Twitter,
  Linkedin,
  Facebook,
  Send,
  RefreshCw,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Component() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [article, setArticle] = useState("");
  const [socialPosts, setSocialPosts] = useState({
    twitter: "",
    linkedin: "",
    facebook: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setArticle(
        "This is a simulated article content. The AI has analyzed it and extracted key points."
      );
      setSocialPosts({
        twitter:
          "Check out this amazing article on AI advancements! #TechInnovation #AIFuture",
        linkedin:
          "I've just read a fascinating piece on the latest AI breakthroughs. It discusses how AI is reshaping industries and our daily lives. What's your take on these rapid advancements?",
        facebook:
          "Just came across an eye-opening article about AI's impact on society. It's incredible how fast technology is evolving! Have you noticed any AI-driven changes in your life recently?",
      });
      setStep(2);
      setIsLoading(false);
    }, 3000);
  };

  const generateSocialPosts = () => {
    setIsRefining(true);
    // Simulate post refinement
    setTimeout(() => {
      setStep(3);
      setIsRefining(false);
    }, 2000);
  };

  const simulatePosting = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Posts have been shared successfully!");
    }, 2000);
  };

  const restart = () => {
    setStep(1);
    setUrl("");
    setArticle("");
    setSocialPosts({ twitter: "", linkedin: "", facebook: "" });
  };

  const cronJobLink = `https://api.articleai.pro/analyze?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-700">
            ArticleAI Pro
          </div>
          <Button variant="destructive">
            <a href="/login">Log Off</a>
          </Button>
        </nav>
      </header>
      <div className="container mx-auto p-4 max-w-4xl">
        <header className="text-center mb-12">
          <p className="text-xl text-gray-600">
            Transform Articles into Engaging Social Media Content
          </p>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-lg bg-white/70 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-indigo-700">
                    Step 1: Enter Article URL
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Paste the link to the article you want to analyze and share
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Input
                        type="url"
                        placeholder="https://example.com/article"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="pr-24 bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <Button
                        type="submit"
                        className="absolute right-0 top-0 h-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-none"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Link className="mr-2 h-4 w-4" />
                        )}
                        {isLoading ? "Analyzing..." : "Analyze"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="text-center text-gray-500">
                  Our AI will analyze the article and generate optimized social
                  media posts for you.
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-lg bg-white/70 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-indigo-700">
                    Step 2: Article Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Review the AI-analyzed article content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={article}
                    readOnly
                    className="min-h-[200px] mb-4 bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Button
                    onClick={generateSocialPosts}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={isRefining}
                  >
                    {isRefining ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isRefining ? "Refining..." : "Refine Social Media Posts"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-lg bg-white/70 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-indigo-700">
                    Step 3: Social Media Posts
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Review and share the generated posts for each platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="twitter" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-indigo-100 mb-4">
                      <TabsTrigger
                        value="twitter"
                        className="data-[state=active]:bg-white"
                      >
                        Twitter/X
                      </TabsTrigger>
                      <TabsTrigger
                        value="linkedin"
                        className="data-[state=active]:bg-white"
                      >
                        LinkedIn
                      </TabsTrigger>
                      <TabsTrigger
                        value="facebook"
                        className="data-[state=active]:bg-white"
                      >
                        Facebook
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="twitter">
                      <div className="flex items-center space-x-2 mb-2">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <span className="font-semibold text-indigo-700">
                          Twitter/X Post
                        </span>
                      </div>
                      <Textarea
                        value={socialPosts.twitter}
                        readOnly
                        className="min-h-[100px] bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </TabsContent>
                    <TabsContent value="linkedin">
                      <div className="flex items-center space-x-2 mb-2">
                        <Linkedin className="h-5 w-5 text-blue-700" />
                        <span className="font-semibold text-indigo-700">
                          LinkedIn Post
                        </span>
                      </div>
                      <Textarea
                        value={socialPosts.linkedin}
                        readOnly
                        className="min-h-[100px] bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </TabsContent>
                    <TabsContent value="facebook">
                      <div className="flex items-center space-x-2 mb-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-indigo-700">
                          Facebook Post
                        </span>
                      </div>
                      <Textarea
                        value={socialPosts.facebook}
                        readOnly
                        className="min-h-[100px] bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex justify-between w-full">
                    <Button
                      onClick={restart}
                      variant="outline"
                      className="w-[48%] border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                    <Button
                      onClick={simulatePosting}
                      className="w-[48%] bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Share Posts
                    </Button>
                  </div>
                  <div className="w-full p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Set Up Recurring Analysis
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      To analyze this article on a recurring basis, set up a
                      cron job with your desired time interval using the
                      following URL:
                    </p>
                    <div className="flex items-center bg-white border border-indigo-200 rounded p-2">
                      <code className="text-sm text-indigo-600 flex-grow overflow-x-auto">
                        {cronJobLink}
                      </code>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() =>
                                navigator.clipboard.writeText(cronJobLink)
                              }
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                            >
                              Copy
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}