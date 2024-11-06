import { v4 as uuidv4 } from 'uuid';
import s3 from '../config/s3';
import Logo, { ILogo } from '../models/Logo';

export class LogoService {
  async uploadLogo(file: Express.Multer.File, companyName: string): Promise<ILogo> {
    const fileExtension = file.originalname.split('.').pop();
    const s3Key = `logos/${uuidv4()}.${fileExtension}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(uploadParams).promise();

    const logo = new Logo({
      companyName,
      fileName: file.originalname,
      s3Key,
      s3Url: uploadResult.Location,
      metadata: {
        size: file.size,
        format: fileExtension,
      },
    });

    await logo.save();
    return logo;
  }

  async getLogo(logoId: string): Promise<ILogo | null> {
    return await Logo.findById(logoId);
  }

  async getAllLogos(): Promise<ILogo[]> {
    return await Logo.find().sort({ uploadedAt: -1 });
  }

  async getLogosByCompany(companyName: string): Promise<ILogo[]> {
    return await Logo.find({ companyName }).sort({ uploadedAt: -1 });
  }

  async deleteLogo(logoId: string): Promise<boolean> {
    const logo = await Logo.findById(logoId);
    if (!logo) return false;

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: logo.s3Key,
    };

    await s3.deleteObject(deleteParams).promise();
    await logo.deleteOne();
    return true;
  }
}