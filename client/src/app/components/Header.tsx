"use client";

import React from 'react';
import { motion } from "framer-motion"
import Link from "next/link"
import { Book } from "lucide-react"
import Navigation from "./Navigation"

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-blue-50">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center text-blue-600">
        <Book className="mr-2" />
        livbre
      </Link>
    </motion.div>
    <Navigation />
  </header>
  );
};

export default Header;