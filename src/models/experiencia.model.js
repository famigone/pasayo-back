import mongoose from 'mongoose';

const experienciaSchema = new mongoose.Schema(
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
    plantilla: {
      type: String,
      required: false,
    },
    solucion: {
      type: String,
      required: false,
    },
    id_trayecto: {
      type: mongoose.Types.ObjectId,
      ref: 'Trayecto',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Experiencia', experienciaSchema);
