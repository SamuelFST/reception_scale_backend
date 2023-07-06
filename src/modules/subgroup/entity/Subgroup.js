import mongoose, { Schema } from 'mongoose';

const subgroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    scales: [{
      type: Schema.Types.ObjectId,
      ref: 'Scale',
    }],
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Subgroup', subgroupSchema);
