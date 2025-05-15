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
    <form className="md:flex-row md:gap-2 mt-0  gap-6 flex-col flex items-center justify-center w-full h-auto" onSubmit={onSubmit}>
      {/* 개화시기 */}
      <div className="flex items-center relative min-w-[150px] h-15 justify-center w-full">
        <label htmlFor="herb-month">
          <IoCalendarOutline className="md:block hidden mr-2 text-4xl text-gray-600" />
        </label>
        <select
          id="herb-month"
          name="month"
          className="outline-[#05d182] inline-block w-full p-3 border border-gray-200 rounded-xl">
          <option value="" className="text-center">개화시기</option>
          {monthCategories.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* 카테고리 */}
      <div className="md:ml-5 md:mt-0 flex items-center relative min-w-[150px] h-10 justify-center w-full">
        <label htmlFor="herb-category">
          <IoFolderOpenOutline className="md:block hidden mr-2 text-4xl text-gray-600" />
        </label>
        <select
          id="herb-category"
          name="bneNm"
          className="outline-[#05d182] inline-block min-w-[150px] w-full p-3 border border-gray-200 rounded-xl">
          <option className="text-center" value="">카테고리</option>
          {herbCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 텍스트 검색 인풋 */}
      <div className="md:ml-5 md:mt-0 mt-3 flex items-center relative min-w-[150px] h-10 justify-center w-full">
        <label htmlFor="herb-keyword"><IoSearch className="md:block hidden mr-2 text-4xl text-gray-600" /> </label>
        <input
          id="herb-keyword"
          type="text"
          name="keyword"
          placeholder="약초명 키워드"
          className="outline-[#05d182] w-full p-2.5 border border-gray-200 rounded-xl"
        />
      </div>
      <div className="flex  md:ml-5 ml-0 items-center justify-center w-full gap-3">

        {/* 제출 버튼 */}
        <Submit
          text="검색"
          className="md:max-w-[200px] md:mt-0 ml-0 max-w-full cursor-pointer text-white bg-[#05D182] hover:bg-[#07BD77] w-full p-2.5 rounded-[5px]"
          disabled={false}
        />
        <button title="필터 초기화" type="reset" className="border border-gray-200 p-4.5 rounded-md hover:bg-gray-100"><IoRefresh /></button>
      </div>
    </form>
  )
}