import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LoginButton from './LoginButton';

const navItems = ["About", "Books", "Community", "Contact"];

const Navigation: React.FC = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link
              href={`/${item.toLowerCase()}`}
              className="text-sm uppercase tracking-wider hover:text-blue-500 transition-colors"
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
          <LoginButton />
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
                href={`/${item.toLowerCase()}`}
                className="text-lg uppercase tracking-wider hover:text-blue-500 transition-colors"
              >
                {item}
              </Link>
            ))}
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigation;