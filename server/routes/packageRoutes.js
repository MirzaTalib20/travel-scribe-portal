import express from 'express';
import mongoose from 'mongoose';
import Package from '../models/Package.js'; // 👈 make sure to use .js
const router = express.Router();


// GET all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// GET a specific package
router.get('/:id', async (req, res) => {
  try {
    const packages = await Package.findById(req.params.id);
    if (!packages) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST a new package
router.post('/', async (req, res) => {
  const newPackage = new Package(req.body);
  console.log(newPackage);
  try {
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a package
router.put('/:id', async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a package
router.delete('/:id', async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
