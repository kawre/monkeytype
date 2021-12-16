import { Document, model, Schema } from "mongoose";

export interface QuoteDocument extends Document {
  quote: string;
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema(
  {
    quote: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Quote = model<QuoteDocument>("Quote", quoteSchema);

export default Quote;
