const mongoose = require('mongoose');
const BodyType = require('../models/BodyType');
const cloudinary = require('../config/cloudinary');

// Create a new body type
exports.addBodyType = async (req, res) => {
    try {
        const { name, description, outfits } = req.body;
        const image = req.files['image'][0];  // Get the uploaded image for the body type
        
        // Upload the main body type image to Cloudinary and get URL
        let imageUrl = '';
        if (image) {
            const result = await cloudinary.uploader.upload(image.path);
            imageUrl = result.secure_url;
            console.log('Body type image URL:', imageUrl);  // Log the body type image URL
        }

        const parsedOutfits = JSON.parse(outfits);
        console.log('Outfits passed from frontend:', parsedOutfits);  // Log the outfits passed from frontend

        for (let i = 0; i < parsedOutfits.length; i++) {
            parsedOutfits[i].images = []; // Initialize array to hold image URLs

            // Loop over the images for the outfit (assuming you allow multiple images per outfit)
            for (let j = 0; req.files[`outfitImages_${i}_${j}`]; j++) {
                console.log(`outfitImages_${i}_${j}:`, req.files[`outfitImages_${i}_${j}`]);  // Log the outfit images
                const result = await cloudinary.uploader.upload(req.files[`outfitImages_${i}_${j}`][0].path);
                parsedOutfits[i].images.push(result.secure_url); // Store the image URL
                console.log(`Outfit ${i} image ${j} URL:`, result.secure_url);  // Log the outfit image URL
            }
        }

        // Create the new body type document with outfits (including fitName, fitDescription, and images)
        const newBodyType = new BodyType({ 
            name, 
            description, 
            imageUrl, 
            outfits: parsedOutfits.map(outfit => ({
                fitName: outfit.fitName,
                fitDescription: outfit.fitDescription,
                images: outfit.images
            })) 
        });

        // Save the body type to MongoDB
        await newBodyType.save();

        res.status(201).json({ message: "Body Type added successfully", BodyType: newBodyType });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Read all body types
exports.getAllBodyTypes = async (req, res) => {
    try {
        const bodyTypes = await BodyType.find();
        res.status(200).json(bodyTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single body type by ID
exports.getBodyType = async (req, res) => {
    try {
        const bodyType = await BodyType.findById(req.params.id);
        if (!bodyType) return res.status(404).json({ message: 'Body type not found' });
        res.status(200).json(bodyType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a body type by name
exports.getBodyTypeByName = async (req, res) => {
    try {
        const { name } = req.params;  // Get the body type name from the request parameters
        const bodyType = await BodyType.findOne({ name: name });  // Find the body type by name
        
        if (!bodyType) return res.status(404).json({ message: 'Body type not found' });
        
        res.status(200).json(bodyType);  // Return the found body type
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a body type by ID
exports.updateBodyType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file;  // Get the uploaded image
        
        // Find the existing body type
        const bodyType = await BodyType.findById(req.params.id);
        if (!bodyType) {
            return res.status(404).json({ message: 'Body type not found' });
        }

        // Upload new image to Cloudinary if provided
        let imageUrl = bodyType.imageUrl;  // Retain the old image URL
        if (image) {
            const result = await cloudinary.uploader.upload(image.path);
            imageUrl = result.secure_url;  // Use the new uploaded image URL
        }

        // Update the body type fields
        bodyType.name = name || bodyType.name;
        bodyType.description = description || bodyType.description;
        bodyType.imageUrl = imageUrl;

        // Save the updated body type
        await bodyType.save();

        res.status(200).json({
            message: 'Body Type updated successfully',
            BodyType: bodyType,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// Delete a body type by ID
exports.deleteBodyType = async (req, res) => {
    try {
        const deletedBodyType = await BodyType.findByIdAndDelete(req.params.id);
        if (!deletedBodyType) return res.status(404).json({ message: 'Body type not found' });
        res.status(200).json({ message: 'Body type deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
