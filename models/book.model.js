import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    publishedYear: { type: Number },
  },
  { timestamps: true }
);

const Books = mongoose.model("Book", bookSchema);
export default Books;
