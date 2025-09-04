import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodModel from './models/foodModel.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Data derived from the original repository's assets
const foodItems = [
    { name: "Greek Salad", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", image: "food_1.png" },
    { name: "Veg Salad", price: 180, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", image: "food_2.png" },
    { name: "Clover Salad", price: 160, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", image: "food_3.png" },
    { name: "Chicken Salad", price: 240, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", image: "food_4.png" },
    { name: "Lasagna Rolls", price: 140, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", image: "food_5.png" },
    { name: "Peri Peri Rolls", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", image: "food_6.png" },
    { name: "Chicken Rolls", price: 200, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", image: "food_7.png" },
    { name: "Veg Rolls", price: 150, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", image: "food_8.png" },
    { name: "Ripple Ice Cream", price: 140, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", image: "food_9.png" },
    { name: "Fruit Ice Cream", price: 220, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", image: "food_10.png" },
    { name: "Jar Ice Cream", price: 100, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", image: "food_11.png" },
    { name: "Vanilla Ice Cream", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", image: "food_12.png" },
    { name: "Chicken Sandwich", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", image: "food_13.png" },
    { name: "Vegan Sandwich", price: 180, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", image: "food_14.png" },
    { name: "Grilled Sandwich", price: 160, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", image: "food_15.png" },
    { name: "Bread Sandwich", price: 240, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", image: "food_16.png" },
    { name: "Cup Cake", price: 140, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", image: "food_17.png" },
    { name: "Vegan Cake", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", image: "food_18.png" },
    { name: "Butterscotch Cake", price: 200, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", image: "food_19.png" },
    { name: "Fruit Cake", price: 150, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", image: "food_20.png" },
    { name: "Garlic Mushroom", price: 140, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", image: "food_21.png" },
    { name: "Fried Cauliflower", price: 220, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", image: "food_22.png" },
    { name: "Mix Veg Pulao", price: 100, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", image: "food_23.png" },
    { name: "Rice Zucchini", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", image: "food_24.png" },
    { name: "Cheese Pasta", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", image: "food_25.png" },
    { name: "Tomato Pasta", price: 180, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", image: "food_26.png" },
    { name: "Creamy Pasta", price: 160, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", image: "food_27.png" },
    { name: "Chicken Pasta", price: 240, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", image: "food_28.png" },
    { name: "Buttter Noodles", price: 140, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", image: "food_29.png" },
    { name: "Veg Noodles", price: 120, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", image: "food_30.png" },
    { name: "Somen Noodles", price: 200, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", image: "food_31.png" },
    { name: "Cooked Noodles", price: 150, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", image: "food_32.png" }
];

// Function to import data
const importData = async () => {
    try {
        // Clear existing food items to prevent duplicates
        await foodModel.deleteMany();
        console.log('Old food data destroyed!');

        // Insert the new food items
        await foodModel.insertMany(foodItems);
        console.log('Data successfully imported!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error}`);
        process.exit(1);
    }
};

// Run the import function
importData();