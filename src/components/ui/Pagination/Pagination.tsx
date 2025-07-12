import {
  PageSizeSelect,
  PaginationButton,
  PaginationControls,
  PaginationWrapper,
} from './Pagination.styles';

interface TablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  const pageCount = Math.ceil(total / pageSize) || 1;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < pageCount) onPageChange(page + 1);
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(pageCount);
  };

  const getPages = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(pageCount, page + 2);

    if (page <= 2) {
      end = Math.min(5, pageCount);
    }
    if (page >= pageCount - 1) {
      start = Math.max(1, pageCount - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <PaginationWrapper>
      <PageSizeSelect value={pageSize} onChange={(e) => onPageSizeChange?.(Number(e.target.value))}>
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </PageSizeSelect>
      <PaginationControls>
        <PaginationButton onClick={handleFirst} disabled={page === 1}>
          {'<<'}
        </PaginationButton>
        <PaginationButton onClick={handlePrev} disabled={page === 1}>
          {'<'}
        </PaginationButton>
        {getPages().map((p) => (
          <PaginationButton key={p} active={p === page} onClick={() => onPageChange(p)}>
            {p}
          </PaginationButton>
        ))}
        <PaginationButton onClick={handleNext} disabled={page === pageCount}>
          {'>'}
        </PaginationButton>
        <PaginationButton onClick={handleLast} disabled={page === pageCount}>
          {'>>'}
        </PaginationButton>
      </PaginationControls>
    </PaginationWrapper>
  );
};

export default TablePagination;
