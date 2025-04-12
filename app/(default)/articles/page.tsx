'use client';

import { cn } from '@/app/_internal/utils/style';
import http from '@/client/integration/http';
import { GetPublishedArticlesResponse } from '@/server/article/_internal/type';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaFilter, FaSearch, FaTable, FaThLarge, FaTimes } from 'react-icons/fa';
import useSWR from 'swr';

const CATEGORIES = ['Pulse Reports', 'Quarterly Reports', 'DeFi', 'Blockchain Technology', 'NFTs', 'Ethereum', 'AI'];

const AUTHORS = [
  { name: 'AJ Scolaro', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'AJC', avatar: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Ainsley To', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Alex Nardi', avatar: 'https://i.pravatar.cc/40?img=4' },
  { name: 'John Doe', avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/40?img=6' },
  { name: 'Samuel L. Jackson', avatar: 'https://i.pravatar.cc/40?img=7' },
  { name: 'Dwayne Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
  { name: 'Will Smith', avatar: 'https://i.pravatar.cc/40?img=9' },
  { name: 'Robert Downey Jr.', avatar: 'https://i.pravatar.cc/40?img=10' },
  { name: 'Chris Hemsworth', avatar: 'https://i.pravatar.cc/40?img=11' },
  { name: 'Tom Holland', avatar: 'https://i.pravatar.cc/40?img=12' },
  { name: 'Scarlett Johansson', avatar: 'https://i.pravatar.cc/40?img=13' },
  { name: 'Mark Ruffalo', avatar: 'https://i.pravatar.cc/40?img=14' },
  { name: 'Chris Evans', avatar: 'https://i.pravatar.cc/40?img=15' },
  { name: 'Tom Hiddleston', avatar: 'https://i.pravatar.cc/40?img=16' },
  { name: 'Jeremy Renner', avatar: 'https://i.pravatar.cc/40?img=17' },
];

const RESEARCH_TIERS = ['Basic', 'Free', 'Pro', 'Enterprise'];

function ArticlesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Effect to handle screen size changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 768) {
          setIsFilterVisible(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const { data } = useSWR<GetPublishedArticlesResponse>(
    '/api/public/articles',
    async (url: string): Promise<GetPublishedArticlesResponse> => {
      const response = await http.get(url);
      return response.json();
    },
  );

  const articles = data?.result?.articles || [];

  const handleCheckboxChange = (authorName: string) => {
    setSelectedAuthors((prev) => {
      if (prev.includes(authorName)) {
        return prev.filter((name) => name !== authorName);
      }
      return [...prev, authorName];
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Function to close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (windowWidth < 768) {
      setIsFilterVisible(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Overlay for mobile when filter is open */}
      {isFilterVisible && windowWidth < 768 && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={handleOverlayClick} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Header for Mobile */}
        <div className="sticky top-0 z-20 flex w-full items-center justify-between bg-gray-900 p-4 shadow-md md:hidden">
          <h2 className="text-xl font-bold">Articles</h2>
          <button
            className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition hover:bg-gray-700"
            onClick={toggleFilter}
          >
            <FaFilter size={14} />
            <span>Filter</span>
          </button>
        </div>

        {/* Sidebar Filter */}
        <aside
          className={cn(
            'fixed left-0 top-0 z-40 h-full w-full max-w-xs transform overflow-hidden bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out md:static md:z-auto md:col-span-4 md:h-screen md:w-auto md:max-w-none md:translate-x-0 md:border-r md:border-gray-700 md:shadow-none lg:col-span-3',
            isFilterVisible ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {/* Filter Header with Close button for mobile */}
          <div className="flex items-center justify-between border-b border-gray-700 p-4 md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setIsFilterVisible(false)}
              className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
              aria-label="Close filter"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Filter Header for desktop */}
          <div className="hidden border-b border-gray-700 px-6 py-4 md:block">
            <h2 className="text-lg font-semibold">Filter by</h2>
          </div>

          {/* Filter Content - Scrollable */}
          <div className="h-[calc(100%-64px)] overflow-y-auto px-4 py-4 md:h-[calc(100vh-64px)] md:px-6">
            {/* Search Box */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search article"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-gray-800 py-2 pl-10 pr-3 text-white outline-none ring-1 ring-gray-700 transition focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Categories */}
            <Listbox>
              <div className="relative mt-4">
                <ListboxButton className="flex w-full items-center justify-between rounded-md bg-gray-800 px-4 py-2 text-white">
                  Categories
                  <FaChevronDown />
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-2 max-h-[320px] w-full overflow-auto rounded-md border border-gray-400 bg-gray-800 p-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="w-full rounded-md bg-gray-700 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="whitespace-nowrap text-primary">Select All</button>
                  </div>
                  <div className="mt-2">
                    {CATEGORIES.map((category) => (
                      <ListboxOption
                        key={category}
                        value={category}
                        as="div"
                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-700"
                      >
                        <input type="checkbox" />
                        <span className="text-sm text-white">{category}</span>
                      </ListboxOption>
                    ))}
                  </div>
                </ListboxOptions>
              </div>
            </Listbox>

            {/* Authors */}
            <Listbox>
              <div className="relative mt-4">
                <ListboxButton className="flex w-full items-center justify-between rounded-md bg-gray-800 px-4 py-2 text-white">
                  Authors
                  <FaChevronDown />
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-2 max-h-[320px] w-full overflow-auto rounded-md border border-gray-400 bg-gray-800 p-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="w-full rounded-md bg-gray-700 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="whitespace-nowrap text-primary">Select All</button>
                  </div>
                  <div className="mt-2">
                    {AUTHORS.map((author) => (
                      <ListboxOption
                        key={author.name}
                        value={author.name}
                        as="div"
                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-700"
                        onClick={() => handleCheckboxChange(author.name)}
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(author.name)}
                          checked={selectedAuthors.includes(author.name)}
                        />
                        <img src={author.avatar} alt={author.name} className="h-6 w-6 rounded-full" />
                        <span className="text-sm text-white">{author.name}</span>
                      </ListboxOption>
                    ))}
                  </div>
                </ListboxOptions>
              </div>
            </Listbox>

            {/* Research Tiers */}
            <Listbox>
              <div className="relative mt-4">
                <ListboxButton className="flex w-full items-center justify-between rounded-md bg-gray-800 px-4 py-2 text-white">
                  Research Tiers
                  <FaChevronDown />
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-2 max-h-[320px] w-full overflow-auto rounded-md border border-gray-400 bg-gray-800 p-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="w-full rounded-md bg-gray-700 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="whitespace-nowrap text-primary">Select All</button>
                  </div>
                  <div className="mt-2">
                    {RESEARCH_TIERS.map((tier) => (
                      <ListboxOption
                        key={tier}
                        value={tier}
                        as="div"
                        className="flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-700"
                      >
                        <input type="checkbox" className="mr-2" readOnly />
                        <span className="text-sm text-white">{tier}</span>
                      </ListboxOption>
                    ))}
                  </div>
                </ListboxOptions>
              </div>
            </Listbox>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {['AI', 'DeFi', 'Layer-1', 'Gaming'].map((tag) => (
                  <button key={tag} className="rounded-md border border-gray-600 px-3 py-1 text-xs">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-1 min-h-screen p-4 md:col-span-8 md:p-6 lg:col-span-9">
          {/* View Mode Controls */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="hidden text-xl font-bold md:block">Articles</h2>
            <div className="ml-auto flex items-center gap-2">
              <button
                className={cn('rounded-lg p-2 transition', {
                  'bg-primary text-white': viewMode === 'grid',
                  'bg-gray-800 text-gray-300 hover:bg-gray-700': viewMode !== 'grid',
                })}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <FaThLarge size={16} />
              </button>
              <button
                className={cn('rounded-lg p-2 transition', {
                  'bg-primary text-white': viewMode === 'table',
                  'bg-gray-800 text-gray-300 hover:bg-gray-700': viewMode !== 'table',
                })}
                onClick={() => setViewMode('table')}
                aria-label="Table view"
              >
                <FaTable size={16} />
              </button>
            </div>
          </div>

          {/* Content Display */}
          {viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`articles/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition hover:shadow-xl"
                >
                  {/* Article Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.thumbnail || 'https://www.mangobeds.com/images/image-fallback.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Article Content */}
                  <div className="flex flex-grow flex-col justify-between p-4">
                    <div>
                      {/* Category & Date */}
                      <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                        <span className="rounded-full bg-gray-700 px-2 py-1">{'Uncategorized'}</span>
                        <span>{article.created_at || 'N/A'}</span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white group-hover:text-blue-400">
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className="line-clamp-3 text-sm text-gray-400">
                        {article.abstract || 'No summary available.'}
                      </p>
                    </div>

                    {/* Author & Tier (if available) */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-700" />
                        <span className="ml-2 text-xs text-gray-400">{'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Table View
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              {/* Table Headers */}
              <div className="min-w-full">
                <div className="grid grid-cols-12 border-b border-gray-700 bg-gray-800">
                  <div className="col-span-5 p-4 text-sm font-semibold text-white">Article</div>
                  <div className="col-span-2 p-4 text-sm font-semibold text-white">Date</div>
                  <div className="col-span-2 p-4 text-sm font-semibold text-white">Category</div>
                  <div className="col-span-2 p-4 text-sm font-semibold text-white">Author</div>
                </div>

                {/* Table Rows */}
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="block transition hover:bg-gray-700"
                  >
                    <div className="grid grid-cols-12 items-center border-b border-gray-700 bg-gray-800">
                      <div className="col-span-5 flex items-center gap-4 p-4">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-700">
                          <Image
                            src={article.thumbnail || 'https://www.mangobeds.com/images/image-fallback.jpg'}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="line-clamp-2 text-sm font-medium text-white">{article.title}</h3>
                      </div>
                      <div className="col-span-2 p-4 text-sm text-gray-400">{article.updated_at || 'N/A'}</div>
                      <div className="col-span-2 p-4 text-sm text-gray-400">{'Uncategorized'}</div>
                      <div className="col-span-2 p-4 text-sm text-gray-400">{'Unknown'}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gray-800 p-6 text-center">
              <p className="mb-2 text-xl font-semibold text-white">No articles found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ArticlesPage;
