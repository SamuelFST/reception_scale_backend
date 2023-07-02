import mongoose from 'mongoose';

const worshipSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Worship', worshipSchema);
