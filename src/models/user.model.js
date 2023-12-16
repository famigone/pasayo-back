import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: false },
    password: { type: String, unique: false, required: false },
    mail: { type: String, unique: true, required: false },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
