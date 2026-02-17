import { useSearch } from "../context/SearchContext";

export default function SearchDebug() {
  const { filters } = useSearch();

  return (
    <div className="p-4 bg-gray-100 rounded mt-4">
      <h3 className="font-semibold mb-2">DEBUG: Estat del SearchContext</h3>
      <pre className="text-sm">
        {JSON.stringify(filters, null, 2)}
      </pre>
    </div>
  );
}
