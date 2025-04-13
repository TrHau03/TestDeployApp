// Kiểu đại diện cho 1 bài viết
export interface Article {
    id: number;
    title: string;
    slug: string;
    content?: string;
    abstract?: string | null;
    thumbnail?: string | null;
    category_id?: number | null;
    status: "draft" | "published" | "archived"| null ;
    tags?: string[];
    created_at: string;
    updated_at: string;
  }
  
  // Kiểu dùng để tạo mới bài viết
  export interface ArticleCreateRequest extends Omit<Article, "id" | "created_at" | "updated_at"> {}
  
  // Kiểu dùng để cập nhật bài viết
  export interface ArticleUpdateRequest extends ArticleCreateRequest {}
  
  // Kiểu response khi lấy 1 bài viết
  export interface GetPublishedArticleResponse {
    _metadata: {
      success: boolean;
    };
    result: {
      article: Article;
    };
  }
  
  // Kiểu response khi lấy danh sách
  export interface GetPublishedArticlesResponse {
    _metadata: {
      success: boolean;
    };
    result: {
      articles: Article[];
    };
  }
  