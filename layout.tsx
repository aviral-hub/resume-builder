import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Layout from "@/components/Layout"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProResume Builder: The Easiest Online Resume Builder",
  description:
    "Build your professional resume fast with ProResume Builder! Use our online resume builder to create standout resumes with customizable templates, expert tips, and industry-specific examples. Land your dream job today!",
  openGraph: {
    title: "ProResume Builder: The Easiest Online Resume Builder",
    description:
      "Build your professional resume fast with ProResume Builder! Use our online resume builder to create standout resumes with customizable templates, expert tips, and industry-specific examples. Land your dream job today!",
    url: "https://proresumebuilder.com/",
    siteName: "ProResume Builder",
    images: [
      {
        url: "URL_TO_YOUR_IMAGE", // Replace with your actual image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProResume Builder: The Easiest Online Resume Builder",
    description:
      "Build your professional resume fast with ProResume Builder! Use our online resume builder to create standout resumes with customizable templates, expert tips, and industry-specific examples. Land your dream job today!",
    images: ["URL_TO_YOUR_IMAGE"], // Replace with your actual image URL
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}



import './globals.css'