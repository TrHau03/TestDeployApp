"use client"
import ActionButtons from "./ActionButtons"

type Article = {
    id: number
    title: string
    status: string | null
    created_at?: string
}

type Props = {
    articles: Article[]
}

export default function ArticleTable({ articles }: Props) {
    return (
        <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
            <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800 text-left font-medium">
                    <tr>
                        <th className="px-4 py-3 border-r border-gray-300">Title</th>
                        <th className="px-4 py-3 border-r border-gray-300">Status</th>
                        <th className="px-4 py-3 border-r border-gray-300">Created At</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr
                            key={article.id}
                            className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td className="px-4 py-2 border-r border-gray-200">{article.title}</td>
                            <td className="px-4 py-2 border-r border-gray-200">{article.status ?? "—"}</td>
                            <td className="px-4 py-2 border-r border-gray-200">
                                {article.created_at ? new Date(article.created_at).toLocaleDateString() : "—"}
                            </td>
                            <td className="px-4 py-2 text-right">
                                <ActionButtons article={article} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
