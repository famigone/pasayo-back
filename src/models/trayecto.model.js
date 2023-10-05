import mongoose from 'mongoose';

const trayectoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    narrativa: {
      type: String,
      required: true,
    },
    tema: {
      type: String,
      required: true,
    },
    objetivo: {
      type: String,
      required: true,
    },
    activo: {
      type: Boolean,
      required: true,
    }, //borrado lógico
    user: {
      type: String,
      required: true,
    },
    experiencias: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Experiencia',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Trayecto', trayectoSchema);
