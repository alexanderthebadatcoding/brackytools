import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { sdk } from "@farcaster/miniapp-sdk";

// Link Tree Component
function LinkTree() {
  const links = [
    {
      title: "Bracky Tracky",
      description:
        "Track your Bracky transactions, balance and view account stats.",
      icon: "/tracky.png",
      url: "https://brackytracky.netlify.app",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      title: "Bracky Odds",
      description:
        "View pre-game Money line and ESPN odds and compare with Bracky.",
      icon: "/odds.png",
      url: "https://odds.bracky.tools",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Win Probabilities",
      description:
        "Live game analysis and probability tracking from ESPN Analytics",
      icon: "/win.png",
      url: "https://chart.bracky.tools",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Who's Playing Today",
      description: "View today's upcoming and games and how to watch them.",
      icon: "/live.png",
      url: "https://whosplaying.today",
      gradient: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
          onClick={(e) => {
            e.preventDefault();
            window.open(link.url, "_blank", "noopener,noreferrer");
          }}
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-900">
            {/* Header Image */}
            <div className="h-32 overflow-hidden">
              <img
                src={link.icon}
                alt={link.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 mt-1">{link.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

// Main App Component
export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        await sdk.actions.ready();
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error);
        setIsReady(true);
      }
    };
    initApp();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-slate-900 p-4 sm:p-6 text-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white bg-clip-text">
            Bracky Tools
          </h1>
          <p className="text-gray-100 mt-2">
            Prediction utilities for smarter decisions.
          </p>
        </div>

        <main>
          {isReady ? (
            <LinkTree />
          ) : (
            <div className="text-center text-indigo-600 py-8">Loading...</div>
          )}
        </main>
      </div>
    </div>
  );
}
