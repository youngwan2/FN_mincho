

import { FormEvent } from "react";
import Submit from "../../../components/button/Submit";
import { herbCategories, monthCategories } from "../../../config/categories";
import { IoCalendarOutline, IoFolderOpenOutline } from "react-icons/io5";

export default function SearchForm() {


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

    }

    return (
        <form className="md:flex-row md:gap-2 md:mt-0 mt-8 gap-3 flex-col flex items-center justify-center w-full  " onSubmit={handleSubmit}>
            <div className="flex items-center relative min-w-[150px] h-15 justify-center w-full">
                <label htmlFor="herb-month">
                    <IoCalendarOutline className="md:block hidden mr-2 text-4xl" />
                </label>
                <select
                    id="herb-month"
                    className="outline-[#05d182] inline-block w-full p-3 border rounded-xl">
                    <option value="" className="text-center">개화시기</option>
                    {monthCategories.map(month => {
                        return (
                            <option key={month} value={month}>{month}</option>
                        )
                    })}
                </select>
            </div>


            <div className="md:ml-5 md:mt-0 mt-3 flex items-center relative min-w-[150px]  h-10 justify-center w-full">
                <label htmlFor="herb-category" >
                    <IoFolderOpenOutline className="md:block hidden mr-2 text-4xl" />
                </label>
                <select
                    id="herb-category"
                    className="outline-[#05d182] inline-block min-w-[150px] w-full p-3 border rounded-xl">
                    <option className="text-center" value="">카테고리</option>
                    {herbCategories.map(category => {
                        return (
                            <option  key={category} value={category}>{category}</option>
                        )

                    })}
                </select>
            </div>
            <Submit text="검색" className="md:max-w-[200px] md:ml-5 md:mt-0 mt-3 ml-0 max-w-full cursor-pointer text-white bg-[#05D182] hover:bg-[#07BD77]  w-full p-2 rounded-[5px]"
                disabled={false} />
        </form>
    )
}

