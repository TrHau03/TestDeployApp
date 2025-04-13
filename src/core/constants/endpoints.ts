// ===============================================
// ✅ Next.js App Router - Client-side UI Routing
// ===============================================
export enum AppEndpoint {
  DASHBOARD = "/",
  SIGNIN = "/auth/signin",
  SIGNOUT = "/auth/signout",
  SIGNUP = "/auth/signup",

  // ✅ Static UI routes cho Articles
  PUBLIC_ARTICLES = "/public/articles",
  PUBLIC_ARTICLES_CREATE = "/public/articles/create",

  // ✅ Static UI routes cho Roles
  ROLES = "/api/roles", // GET all, POST create
  ROLE_BY_ID = "/api/roles/:id", // GET, PUT, DELETE theo id

  // ✅ Static UI routes cho Permissions
  PERMISSIONS = "/api/permissions", // GET all, POST create
  PERMISSION_BY_ID = "/api/permissions/:id", // GET, PUT, DELETE theo id
}

// ✅ Dynamic UI routes (enum không hỗ trợ function nên phải tách riêng)
export const AppEndpointDynamic = {
  PUBLIC_ARTICLES_EDIT: (id: number | string) => `/public/articles/${id}/edit`,
};

// ===============================================
// ✅ Next.js API Route - Route handler nội bộ
// ===============================================
export enum APIEndpoint {
  SIGNIN = "/api/auth/signin",
  SIGNOUT = "/api/auth/signout",
  SIGNUP = "/api/auth/signup",

  // ✅ Route API cho articles
  PUBLIC_ARTICLES = "/api/public/articles",

  // ✅ Route API cho permissions
  PERMISSIONS = "/api/permissions",
}

// ===============================================
// ✅ Backend API endpoint (Gọi đến real server)
// ===============================================
export enum HTTPEndpoint {
  SIGNIN = "auth/login",
  SIGNOUT = "auth/logout",
  SIGNUP = "auth/register",

  // ✅ Articles - static endpoint
  GET_ALL_ARTICLES = "public/articles",
  CREATE_ARTICLE = "public/articles",

  // ✅ Roles - static endpoint
  GET_ALL_ROLES = "roles",
  CREATE_ROLE = "roles",

  // ✅ Permissions - static endpoint
  GET_ALL_PERMISSIONS = "permissions",
  CREATE_PERMISSION = "permissions",
}

// ✅ Articles, Roles, Permissions - dynamic endpoint
export const HTTPEndpointDynamic = {
  GET_ARTICLE_BY_SLUG: (slug: string) => `public/articles/${slug}`,
  UPDATE_ARTICLE: (id: number | string) => `public/articles/${id}`,
  DELETE_ARTICLE: (id: number | string) => `public/articles/${id}`,
  PUBLISH_ARTICLE: (id: number | string) => `public/articles/${id}/publish`,

  GET_ROLE_BY_ID: (id: number | string) => `roles/${id}`,
  UPDATE_ROLE: (id: number | string) => `roles/${id}`,
  DELETE_ROLE: (id: number | string) => `roles/${id}`,

  GET_PERMISSION_BY_ID: (id: number | string) => `permissions/${id}`,
  UPDATE_PERMISSION: (id: number | string) => `permissions/${id}`,
  DELETE_PERMISSION: (id: number | string) => `permissions/${id}`,
};
