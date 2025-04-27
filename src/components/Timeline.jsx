// src/components/Timeline.jsx
export default function Timeline({ entries }) {
  if (!entries) return null;
  const steps = entries.split('\n').filter(Boolean);
  return (
    <ol className="border-l-2 border-gray-300 pl-4 mb-4">
      {steps.map((line, i) => (
        <li key={i} className="mb-2 relative">
          <span className="absolute -left-4 top-0 w-2 h-2 bg-blue-500 rounded-full" />
          <div className="ml-2">
            <span className="font-semibold">Step {i + 1}:</span> {line}
          </div>
        </li>
      ))}
    </ol>
  );
}
