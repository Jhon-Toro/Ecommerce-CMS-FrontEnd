export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export type PageElement = {
    key: string | number;
    content: string | number;
    isActive?: boolean;
    isEllipsis?: boolean;
    onClick?: () => void;
};