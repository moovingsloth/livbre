"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, Book, Leaf, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  const navItems = ["About", "Books", "Community", "Contact"]

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center bg-green-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center text-green-600">
            <Book className="mr-2" />
            livbre
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-wider hover:text-green-500 transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
          >
            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </motion.div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white text-gray-800">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg uppercase tracking-wider hover:text-green-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          liv
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            bre
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-2xl text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Cultivating knowledge, growing communities through shared stories
        </motion.p>

        <motion.div
          className="relative w-64 h-64 mb-12"
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <motion.path
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              fill="none"
              stroke="url(#eco-gradient)"
              strokeWidth="8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="eco-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-500"
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <Leaf className="h-12 w-12" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          {["SHARE", "LEARN", "GROW"].map((text, index) => (
            <motion.div
              key={text}
              className="bg-green-50 p-6 rounded-lg text-center shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-green-600">{text}</h2>
              <p className="text-sm text-gray-600">
                {text === "SHARE" && "Contribute your books to our community library."}
                {text === "LEARN" && "Discover new worlds through shared literature."}
                {text === "GROW" && "Expand your knowledge and nurture your mind."}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}