import mongoose, { Schema } from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    scales: [{
      type: Schema.Types.ObjectId,
      ref: 'Scale',
    }],
    subgroups: [{
      type: Schema.Types.ObjectId,
      ref: 'Subgroup',
    }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Group', groupSchema);
