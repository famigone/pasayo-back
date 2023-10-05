import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sessionCodeSchema = new Schema(
  {
    experienciaid: {
      type: Schema.Types.ObjectId,
      ref: 'experiencia',
    },
    user: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: false,
    },
    observacion: {
      type: String,
      required: false,
    },
    estadoObservacion: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('SessionCode', sessionCodeSchema);
