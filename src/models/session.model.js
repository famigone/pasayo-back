import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    id_experiencia: {
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
    estado_observacion: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
