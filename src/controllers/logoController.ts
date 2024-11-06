import { Request, Response } from 'express';
import { LogoService } from '../services/logoService';

const logoService = new LogoService();

export class LogoController {
  async uploadLogo(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const { companyName } = req.body;
      if (!companyName) {
        res.status(400).json({ error: 'Company name is required' });
        return;
      }

      const logo = await logoService.uploadLogo(req.file, companyName);
      res.status(201).json(logo);
    } catch (error) {
      console.error('Error uploading logo:', error);
      res.status(500).json({ error: 'Error uploading logo' });
    }
  }

  async getLogo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const logo = await logoService.getLogo(id);
      
      if (!logo) {
        res.status(404).json({ error: 'Logo not found' });
        return;
      }

      res.json(logo);
    } catch (error) {
      console.error('Error retrieving logo:', error);
      res.status(500).json({ error: 'Error retrieving logo' });
    }
  }

  async getAllLogos(req: Request, res: Response): Promise<void> {
    try {
      const logos = await logoService.getAllLogos();
      res.json(logos);
    } catch (error) {
      console.error('Error retrieving logos:', error);
      res.status(500).json({ error: 'Error retrieving logos' });
    }
  }

  async getLogosByCompany(req: Request, res: Response): Promise<void> {
    try {
      const { companyName } = req.params;
      const logos = await logoService.getLogosByCompany(companyName);
      res.json(logos);
    } catch (error) {
      console.error('Error retrieving company logos:', error);
      res.status(500).json({ error: 'Error retrieving company logos' });
    }
  }

  async deleteLogo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await logoService.deleteLogo(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Logo not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting logo:', error);
      res.status(500).json({ error: 'Error deleting logo' });
    }
  }
}