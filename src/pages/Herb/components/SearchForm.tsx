import { FormEventHandler } from "react";
import Submit from "../../../components/button/Submit";
import { herbCategories, monthCategories } from "../../../config/categories";
import { IoCalendarOutline, IoFolderOpenOutline, IoRefresh, IoSearch } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SearchFormProps {
  onSubmit: FormEventHandler;
  isLoading?: boolean; // 로딩 상태를 props로 받음
}

export default function SearchForm({ onSubmit, isLoading = false }: SearchFormProps) {
  if (isLoading) {
    return (
      <div className="md:flex-row md:gap-2 md:mt-0 mt-8 gap-3 flex-col flex items-center justify-center w-full">
        <div className="flex items-center relative min-w-[150px] h-15 justify-center w-full">
          <div className="md:block hidden mr-2">
            <Skeleton circle width={24} height={24} />
          </div>
          <Skeleton className="w-full h-12 rounded-xl" />
        </div>

        <div className="md:ml-5 md:mt-0 mt-3 flex items-center relative min-w-[150px] h-10 justify-center w-full">
          <div className="md:block hidden mr-2">
            <Skeleton circle width={24} height={24} />
          </div>
          <Skeleton className="w-full h-12 rounded-xl" />
        </div>

        <div className="md:ml-5 md:mt-0 mt-3 flex items-center relative min-w-[150px] h-10 justify-center w-full">
          <Skeleton className="w-full h-12 rounded-md" />
        </div>

        <div className="md:max-w-[200px] md:ml-5 md:mt-0 mt-3 ml-0 max-w-full w-full">
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
      </div>
    );
  }
  return (
    <form className="bg-white rounded-xl border border-gray-100 px-6 py-8 flex md:flex-row md:gap-4 gap-6 flex-col items-center justify-center w-full h-auto shadow-md" onSubmit={onSubmit}>
      {/* 개화시기 */}
      <div className="flex gap-2 items-center relative min-w-[150px] h-15 justify-center md:w-1/4 w-full">
        <label htmlFor="herb-month" className="md:flex hidden items-center gap-2">
          <IoCalendarOutline className="text-3xl text-gray-500" />
        </label>
        <select
          id="herb-month"
          name="month"
          className="outline-[#05d182] inline-block w-full p-3 border border-gray-200 rounded-xl bg-white">
          <option value="" className="text-center">개화시기</option>
          {monthCategories.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* 카테고리 */}
      <div className="md:ml-5 md:mt-0 flex items-center relative min-w-[150px] h-10 justify-center md:w-1/4 w-full gap-2">
        <label htmlFor="herb-category" className="md:flex hidden items-center gap-2">
          <IoFolderOpenOutline className="text-3xl text-gray-500" />
        </label>
        <select
          id="herb-category"
          name="bneNm"
          className="outline-[#05d182] inline-block min-w-[150px] w-full p-3 border border-gray-200 rounded-xl bg-white">
          <option className="text-center" value="">카테고리</option>
          {herbCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 텍스트 검색 인풋 */}
      <div className="md:ml-5 md:mt-0 mt-3 flex items-center relative min-w-[150px] h-10 justify-center md:w-2/5 w-full">
        <div className="relative w-full">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-3xl" />
          <input
            id="herb-keyword"
            type="text"
            name="keyword"
            placeholder="약초명 검색..."
            className="outline-[#05d182] w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#05D182]/30 focus:border-[#05D182] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex md:ml-5 ml-0 items-center justify-end md:justify-start md:w-auto w-full gap-3">

        {/* 제출 버튼 */}
        <Submit
          text="검색"
          className="md:w-auto min-w-[58px] w-3/4 cursor-pointer text-white bg-gradient-to-r from-[#05D182] to-[#03A77F] px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
          disabled={false}
        />
        <button
          title="필터 초기화"
          type="reset"
          className="md:w-auto w-1/4 border border-gray-200 p-2.5 rounded-xl hover:bg-gray-50 transition-colors hover:border-gray-300"
        >
          <IoRefresh className="text-gray-500 mx-auto" />
        </button>
      </div>
    </form>
  )
}