const mongoose = require('mongoose');
const keys = require('../config/keys');
const axios = require('axios');

const Book = mongoose.model('books');

module.exports = app => {
    // Function to search books using Naver Open API
    async function searchBooks(query) {
        const clientId = keys.naverClientID; // Your Naver API Client ID
        const clientSecret = keys.naverClientSecret; // Your Naver API Client Secret

        try {
            const response = await axios.get('https://openapi.naver.com/v1/search/book.json', {
                params: { query },
                headers: {
                    'X-Naver-Client-Id': clientId,
                    'X-Naver-Client-Secret': clientSecret,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching data from Naver Open API:', error);
            throw error;
        }
    }

    app.get('/search/book', async (req, res) => {
        const query = req.query.query || 'Err'; // Default query if none provided
    
        try {
            const data = await searchBooks(query);
            console.log('Search results:', data);
    
            // Transform the data to include only the first item's title, author, and image
            if (data.items && data.items.length > 0) {
                const firstItem = data.items[0];
                const transformedData = {
                    title: firstItem.title,
                    author: firstItem.author,
                    image: firstItem.image
                };
                res.status(200).json(transformedData);
            } else {
                res.status(200).json({ message: 'No items found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching data from Naver Open API' });
        }
    });

    app.post('/api/books', async (req, res) => {
        const { title, author, image } = req.body;
        const book =  new Book({
            title,
            author,
            image
    });
    
        try {
            await book.save();
            res.status(201).json({ message: 'Book added successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding book' });
        }
    });

    app.get('/api/books', async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books' });
        }
    }
    );
};

