"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from "@/components/ui/calendar"
import StoreProvider from "../StoreProvider";
import { motion } from 'framer-motion';

export default function BooksPage() {
  const [query, setQuery] = useState('');
  const [showMotionDiv, setShowMotionDiv] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

  interface Book {
    id: number;
    image: string;
    title: string;
    author: string;
  }

  interface SearchResult {
    image: string;
    title: string;
    author: string;
  }
  const fetchBooks = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.get(`${baseURL}/api/books`);
      setBooks(response.data);
      console.log('Books:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.get(`${baseURL}/search/book`, {
        params: { query },
      });
      setShowMotionDiv(true);
      setSearchResults(response.data);

      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post('http://localhost:2000/api/books', searchResults, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsDialogOpen(false);
      await fetchBooks();
      console.log('Book added:', response);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleBorrow = async () => {
    setIsBorrowDialogOpen(false);
  };


  return (
    <StoreProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Available Books</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <CirclePlus className="mr-2 h-4 w-4" /> Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Books</DialogTitle>
                  <DialogDescription>
                    책 이름을 입력하고 가지고 있는 책을 추가해주세요!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="name" className="text-right">
                      책 이름
                    </Label>
                    <Input
                      id="name"
                      className="w-2/3"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button className="ml-2" onClick={handleSearch}>검색</Button>
                  </div>
                  {showMotionDiv && searchResults && ( 
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="border rounded-lg p-4 shadow-md mt-4"
                  >
                    <img src={searchResults.image} className="w-full h-48 object-contain mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{searchResults.title}</h2>
                    <p className="text-gray-600">{searchResults.author}</p>
                    <DialogFooter>
                      <Button onClick={handleAddBook} className="mt-4 w-full">책 추가하기</Button>
                    </DialogFooter>
                  </motion.div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
          <motion.div
            className="flex mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Input 
              type="search" 
              placeholder="Search books..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mr-2"
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="border rounded-lg p-4 shadow-md flex flex-col"
              >
                <img src={book.image} alt={`Cover of ${book.title}`} className="w-full h-48 object-contain mb-4" />
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <div className="flex-grow"></div>
                <p className="text-gray-600">{book.author.replace(/\^/g, ', ')}</p>
                <Dialog open={isBorrowDialogOpen} onOpenChange={setIsBorrowDialogOpen}>
                  <DialogTrigger asChild>
                  <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">대출하기</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>대출하기</DialogTitle>
                      <DialogDescription>
                        희망 대여 날짜를 입력해주세요
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleBorrow}>대출하기</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
            </div>
        </div>
      </motion.div>
    </StoreProvider>
  );
}