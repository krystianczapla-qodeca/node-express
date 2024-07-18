import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

type ArticleDocument = Document & {
  title: string;
  content: string;
  userId: ObjectId;
};

type ArticleInput = {
  title: ArticleDocument["title"];
  content: ArticleDocument["content"];
  // userId: ArticleDocument["userId"];
};

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
const Article: Model<ArticleDocument> = mongoose.model<ArticleDocument>(
  "Article",
  articleSchema
);
export { Article, ArticleInput, ArticleDocument };
