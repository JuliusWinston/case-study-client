// export interface Article {
//   id: number,
//   source: Source;
//   author: string;
//   title: string;
//   category: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   publishedAt: string;
//   content: string | null;
// }

export interface Article {
  id: number;
  title: string;
  source: string;
  author: string;
  category: string;
  thumbnail: string;
  content: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  name: string;
  email: string;
  token: string;
  preferences: {
    sources: string[];
    categories: string[];
    authors: string[];
  }
}

export interface QueryProps { 
  author?: string;
  category?: string;
  source?: string;
  published_at?: string;
  per_page?: number,
  page?: number
}
