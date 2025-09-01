export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  isbn?: string;
  pageCount?: number;
  categories?: string[];
  thumbnail?: string;
  language?: string;
  averageRating?: number;
  ratingsCount?: number;
}
