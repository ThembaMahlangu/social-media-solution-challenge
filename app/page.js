"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Repeat, Share2, BarChart2 } from "lucide-react";
import Authenticator from "@/components/background/authenticator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <Authenticator />
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-700">
            ArticleAI Pro
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-4">
            Transform Articles into Engaging Social Content
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Harness the power of AI to analyze articles and generate optimized
            social media posts in seconds.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link href="/register">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: Zap,
              title: "Instant Analysis",
              description: "Analyze articles and generate posts in seconds",
            },
            {
              icon: Repeat,
              title: "Multi-Platform",
              description:
                "Optimized content for Twitter, LinkedIn, and Facebook",
            },
            {
              icon: Share2,
              title: "Easy Sharing",
              description: "Share your posts directly from our platform",
            },
            {
              icon: BarChart2,
              title: "Performance Tracking",
              description: "Monitor the impact of your shared content",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-lg bg-white/40 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">
            Experience the Future of Content Sharing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of content creators who are revolutionizing their
            social media strategy with ArticleAI Pro.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link href="/register">
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        <div className="bg-indigo-900 text-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-12">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Supercharge Your Content Strategy?
              </h3>
              <p className="mb-6">
                Sign up now and experience the power of AI-driven content
                analysis and social media post generation.
              </p>
              <Button
                asChild
                className="bg-white text-indigo-900 hover:bg-indigo-100"
              >
                <Link href="/register">Create Your Account</Link>
              </Button>
            </div>
            <div className="md:w-1/2 bg-indigo-800 p-12 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">100K+</p>
                <p className="text-xl">Articles Analyzed</p>
              </div>
              <div className="mx-8 h-16 w-px bg-indigo-700"></div>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">500K+</p>
                <p className="text-xl">Posts Generated</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © 2024 ArticleAI Pro || ReasonGTMC. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-gray-600 hover:text-indigo-600">
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-indigo-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-indigo-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
