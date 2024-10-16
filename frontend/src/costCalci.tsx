
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CostCalci() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2 px-4 border-b">Dessert (100g serving)</th>
            <th className="py-2 px-4 border-b text-right">Calories</th>
            <th className="py-2 px-4 border-b text-right">Fat&nbsp;(g)</th>
            <th className="py-2 px-4 border-b text-right">Carbs&nbsp;(g)</th>
            <th className="py-2 px-4 border-b text-right">Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.name} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-2 px-4 border-b">{row.name}</td>
              <td className="py-2 px-4 border-b text-right">{row.calories}</td>
              <td className="py-2 px-4 border-b text-right">{row.fat}</td>
              <td className="py-2 px-4 border-b text-right">{row.carbs}</td>
              <td className="py-2 px-4 border-b text-right">{row.protein}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


