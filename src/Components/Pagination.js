
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const generatePages = () => {
        const pages = []
        const start = Math.max(1, currentPage - 2)
        const end = Math.min(totalPages, currentPage + 2)

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    return totalPages > 1 ? (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {generatePages()}
            {/* <p className="pageDisplay">Page {currentPage} </p> */}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    ) : null
}