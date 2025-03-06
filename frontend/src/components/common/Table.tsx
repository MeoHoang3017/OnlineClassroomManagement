// Table Component
interface TableProps {
    columns: string[];
    data: string[][];
}

export const Table = ({ columns, data }: TableProps) => {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    {columns.map((col, index) => (
                        <th key={index} className="border p-2 text-left">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border p-2">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};