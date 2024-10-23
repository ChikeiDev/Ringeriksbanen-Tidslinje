import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Timeline from './components/Timeline';
import { parse } from 'yaml';
import { FaMoon, FaSun } from 'react-icons/fa';

interface TimelineEntry {
  date: string;
  content: string;
  source: string;
  image?: string;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('https://cdn.ljskatt.no/ringeriksbanen/long.md');

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(currentUrl);
        const markdown = response.data;

        const yamlRegex = /^---\n([\s\S]+?)\n---/;
        const match = markdown.match(yamlRegex);
        if (!match) {
          throw new Error('Invalid Markdown format: Missing YAML front matter.');
        }

        const yamlContent = match[1];
        const parsed = parse(yamlContent) as TimelineEntry[];

        if (!Array.isArray(parsed)) {
          throw new Error('Invalid data format: Expected an array of timeline entries.');
        }

        setEntries(parsed);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [currentUrl]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const toggleUrl = () => {
    setCurrentUrl(prevUrl =>
      prevUrl === 'https://cdn.ljskatt.no/ringeriksbanen/long.md'
        ? 'https://cdn.ljskatt.no/ringeriksbanen/short.md'
        : 'https://cdn.ljskatt.no/ringeriksbanen/long.md'
    );
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const filteredEntries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return entries.filter(entry =>
      entry.date.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.source.toLowerCase().includes(query)
    );
  }, [entries, searchQuery]);

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      {/* Header Section */}
      <header className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 focus:outline-none focus:none focus:none focus:ring-indigo-500"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Title Section */}
        <section className="flex flex-col items-center text-center pb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">Ringeriksbanen Tidslinje</h1>
          <p className="text-lg text-gray-500 mb-1">Vi som tror på ringeriksbanen</p>
          <span className="text-gray-600 dark:text-gray-400 font-mono italic font-semibold">#ringeriksbanereligionen</span>
          <button
            onClick={scrollToBottom}
            className="mt-4 text-blue-500 hover:underline focus:outline-none"
            aria-label="Scroll to Latest News"
          >
            Siste <span className="italic">nytt</span>
          </button>
        </section>

        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleUrl}
            className="w-32 px-10 py-2 bg-[#8ac1ff] text-white rounded-md shadow hover:bg-[#3b6494] transition"
          >
            {currentUrl.includes('long.md') ? 'Seriøs' : 'Tøys'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by date, content, or source"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            aria-label="Search Timeline Entries"
          />
        </div>

        {/* Timeline Section */}
        <section>
          {loading ? (
            <div className="flex justify-center">
              <p className="text-gray-700 dark:text-gray-300">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredEntries.length > 0 ? (
            <Timeline entries={filteredEntries} />
          ) : (
            <div className="flex justify-center">
              <p className="text-gray-700 dark:text-gray-300">No entries found.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 p-5 text-center text-gray-600 dark:text-gray-400">
        Made with <span className="text-red-500">&hearts;</span> by Ringeriksbanen Enjoyers
      </footer>
    </div>
  );
};

export default App;
