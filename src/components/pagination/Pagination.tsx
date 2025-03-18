import ReactPaginate from 'react-paginate';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface PaginationProps {
    totalPage: number
    onPageChange: any
    perPage: number
}

export default function Pagination({  totalPage, onPageChange, perPage }: PaginationProps) {
    return (
        <ReactPaginate
            previousLabel={<IoChevronBackOutline/>}
            nextLabel={<IoChevronForwardOutline/>}
            breakLabel="..."
            pageCount={totalPage} // 총페이지수
            onPageChange={onPageChange} // 변경된 페이지 핸들 함수
            pageRangeDisplayed={perPage} // 표시되는 페이지 범위
            containerClassName="flex justify-center gap-2 mt-4"
            activeClassName="text-white bg-[#05d182] px-3 py-1 rounded"
            pageClassName="px-4 py-1 border border-[#E4E4E7] rounded cursor-pointer"
            previousClassName="px-4 py-1 border border-[#E4E4E7] rounded-full cursor-pointer flex justify-center items-center"
            nextClassName="px-4 py-1 border rounded border-[#E4E4E7] cursor-pointer rounded-full  flex justify-center items-center"
            disabledClassName="opacity-50 cursor-not-allowed"
        >
        </ReactPaginate>
    )
}