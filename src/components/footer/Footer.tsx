import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const [color, setColor] = useState("");

  return (
    <footer className="border-t border-white/30 py-6 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p className="font-semibold">Arjun</p>

        <p className="flex items-center gap-2">
          Made with
          <FaHeart
            onClick={() => setColor(color === "red" ? "" : "red")}
            className={`cursor-pointer transition ${
              color === "red" ? "text-red-500" : ""
            }`}
          />
          by Arjun
        </p>

        <p>Licensed under MIT</p>
      </div>
    </footer>
  );
}
