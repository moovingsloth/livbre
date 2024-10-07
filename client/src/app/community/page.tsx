"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Community() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Community
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-2xl text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Welcome to the community page! Here you can share your thoughts, connect with others, and grow together.
        </motion.p>

        <Link href="/">
          <a className="text-blue-500 hover:underline">Go back to home</a>
        </Link>
      </main>
    </div>
  )
}