import express from 'express';
import { LogoController } from '../controllers/logoController';
import upload from '../middlewares/upload';

const router = express.Router();
const logoController = new LogoController();

// Upload a new logo
router.post('/', upload.single('logo'), (req, res) => logoController.uploadLogo(req, res));

// Get all logos
router.get('/', (req, res) => logoController.getAllLogos(req, res));

// Get a specific logo by ID
router.get('/:id', (req, res) => logoController.getLogo(req, res));

// Get logos by company name
router.get('/company/:companyName', (req, res) => logoController.getLogosByCompany(req, res));

// Delete a logo
router.delete('/:id', (req, res) => logoController.deleteLogo(req, res));

export default router;