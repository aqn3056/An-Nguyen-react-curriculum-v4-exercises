const FILTERS = ['all', 'completed', 'pending'];

export default function TaskFilter({ filter, onChange }) {
  return (
    <div>
      {FILTERS.map((option) => (
        <button key={option} onClick={() => onChange(option)}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
      <p>Current filter: {filter}</p>
    </div>
  );
}
