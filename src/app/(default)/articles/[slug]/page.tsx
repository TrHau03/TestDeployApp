import http from "@/client/integration/http"
import { GetPublishedArticleResponse } from "@/server/article/_internal/type"

type Props = {
    params: Promise<{ slug: string }>
}

async function fetchData(slug: string) {
    const response = await http.get<GetPublishedArticleResponse>(
        `public/articles/${slug}`,
        { next: { revalidate: 60 } },
    )
    return response.json()
}

async function ArticleDetailPage({ params }: Props) {
    const { slug } = await params
    const data = await fetchData(slug)

    const article = data.result.article

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="p-6">
                    {/* Article Title */}
                    <h1 className="text-4xl font-bold">{article.title}</h1>

                    {/* Article Abstract */}
                    <p className="mt-4 text-sm text-gray-400">
                        {article.abstract}
                    </p>

                    {/* Article Content */}
                    <div
                        className="mt-6 text-white"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Displaying Tags */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Tags:</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {article.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-gray-700 px-3 py-1 text-xs text-white"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Displaying the creation and update times if available */}
                    <div className="mt-6 text-sm text-gray-400">
                        <p>Created on: {article.created_at || "N/A"}</p>
                        <p>Updated on: {article.updated_at || "N/A"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleDetailPage
