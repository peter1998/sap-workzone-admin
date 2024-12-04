export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export const calculatePagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return {
    totalPages,
    start,
    end,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};
