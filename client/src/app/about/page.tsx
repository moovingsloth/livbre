import { Book } from "lucide-react";
import StoreProvider from "../StoreProvider";

export default function AboutPage() {
  return (
    <StoreProvider>
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-blue-600 flex items-center">
            <Book className="mr-2" />
            About Livbre
          </h1>
          <div className="space-y-6 text-gray-600">
            Livbre is more than just a book-sharing platform; it&apos;s a community of book lovers dedicated to spreading knowledge and fostering a love for reading.
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}