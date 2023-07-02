import mongoose from 'mongoose';

const personSchema = new mongoose.Schema(
  {
    name: {
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

export default mongoose.model('Person', personSchema);
