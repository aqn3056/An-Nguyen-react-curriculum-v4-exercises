const snacks = [
  { name: 'Popcorn', rank: 5 },
  { name: 'Noodles', rank: 4 },
  { name: 'Chips', rank: 3 },
  { name: 'Cookies', rank: 2 },
  { name: 'Rice Cake', rank: 1 },
];

export default function SnackList() {
  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>
          #{snack.rank} - {snack.name}
        </li>
      ))}
    </ol>
  );
}
