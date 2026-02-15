import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
});

export default mongoose.model('User', UserSchema);
