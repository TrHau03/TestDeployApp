import CreateArticleButton from "./components/CreateArticleButton"

export default async function ArticlesPage() {
    // const articles = await getAllArticles();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:text-xl">Article List</h3>
                <CreateArticleButton />
            </div>
            {/* <ArticleTable articles={articles} /> */}
        </div>
    )
}
