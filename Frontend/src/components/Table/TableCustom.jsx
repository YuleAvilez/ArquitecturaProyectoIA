
export const TableCustom = ({
    columns,
    data = [],
    emptyMessage = "No hay datos para mostrar.",
    page,
    totalPages,
    onPageChange
}) => {
    return (
        <div>
            <table className="min-w-full rounded-md shadow">
                <thead className="bg-purple-700 text-left dark:bg-purple-900">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 text-white">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-500 bg-gray-400 dark:bg-slate-900">
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-4 py-2 border border-white text-black dark:text-white dark:border-purple-900"
                                    >
                                        {col.render ? col.render(item) : item[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4 text-black dark:text-white bg-gray-400 dark:bg-slate-900">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación opcional */}
            {onPageChange && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4 text-black dark:text-white">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 enabled:hover:text-blue-500 transition enabled:hover:cursor-pointer dark:bg-transparent"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Anterior
                    </button>
                    <span className="font-semibold text-purple-700 dark:text-white">
                        Página {page} de {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 enabled:hover:text-blue-500 transition enabled:hover:cursor-pointer dark:bg-transparent"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}