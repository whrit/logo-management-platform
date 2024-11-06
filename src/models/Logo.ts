import mongoose, { Document, Schema } from 'mongoose';

export interface ILogo extends Document {
  companyName: string;
  fileName: string;
  s3Key: string;
  s3Url: string;
  uploadedAt: Date;
  metadata?: {
    width?: number;
    height?: number;
    format?: string;
    size?: number;
  };
}

const LogoSchema: Schema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  s3Key: {
    type: String,
    required: true,
    unique: true,
  },
  s3Url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    width: Number,
    height: Number,
    format: String,
    size: Number,
  },
});

export default mongoose.model<ILogo>('Logo', LogoSchema);