import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleToggle = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
  }, [theme]);

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 dark:bg-gray-400 dark:border-gray-600 dark:text-white flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-500 hover:shadow transition"
      aria-label="Cambiar tema"
    >
      {theme ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z"
          />
        </svg>
      )}
    </button>
  );
};
