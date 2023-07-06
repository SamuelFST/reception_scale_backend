import mongoose, { Schema } from 'mongoose';

const scaleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    observation: {
      type: String,
    },
    worship: {
      type: Schema.Types.ObjectId,
      ref: 'Worship',
    },
    people: [{
      type: Schema.Types.ObjectId,
      ref: 'Person',
    }],
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    subgroup: {
      type: Schema.Types.ObjectId,
      ref: 'Subgroup',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Scale', scaleSchema);
