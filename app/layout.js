import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "ArticleAI Pro - By Themba Mahlangu",
  description:
    "Developed By Themba Mahlangu for an Interview Task requested by the recruiters of ReasonGTMC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
