// src/components/ToolBadge.jsx
export default function ToolBadge({ tool }) {
  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2 mb-2">
      {tool}
    </span>
  );
}
