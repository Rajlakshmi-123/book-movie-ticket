import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movie: { type: String, ref: 'movie', required: true }, // Links to the Movie model
  showDateTime: { type: Date, required: true },
  showPrice: { type: Number, required: true },
  occupiedSeats: { 
    type: Object, 
    default: {} 
  }
}, { minimize: false }); // Ensure empty objects are still stored in the database

const Show = mongoose.models.show || mongoose.model('show', showSchema);

export default Show;