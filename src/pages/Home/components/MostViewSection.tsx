import { Link } from 'react-router';
import map from '../../../assets/home-map.png';
import { useHerbMostViewGetQuery } from '../../../hooks/queries/useQueryHerbs';
import CircleNumberIcon from './CircleNumberIcon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MostViewSection() {
    const { herbs, isError, isLoading } = useHerbMostViewGetQuery();

    return (
        <section className="md:p-10 md:flex-row flex-col flex mt-15">
            <div className="flex flex-col max-w-[30%]">
                <h2 className="text-4xl leading-13">
                    <strong>많은 <br /></strong>사람이 찾고 <br /> 있어요
                </h2>
                <img src={map} alt="placeholder" className="md:block hidden" />
            </div>

            <div className="md:max-w-[60%] w-full flex relative p-[40px] justify-around">
                {isError && <p className='text-red-500 p-3'>일시적인 문제로 데이터 조회 실패</p>}
                <ul className="flex flex-col max-w-[60%] flex-wrap">
                    {(isLoading ? Array.from({ length: 5 }) : herbs.slice(0, 5)).map((herb: any, index) => (
                        <li key={index} className="max-w-[150px] w-full flex items-center my-3 transition-all">
                            <CircleNumberIcon
                                number={index + 1}
                                className={`${index === 0
                                    ? 'bg-[#FFC44C]'
                                    : index === 1
                                        ? 'bg-[#D3D3D3]'
                                        : index === 2
                                            ? 'bg-[#E7986D]'
                                            : 'bg-[#F2F2F7]'
                                    } p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center`}
                            />
                            <Link to={"/herbs/" + herb?.id} className="ml-2">
                                {isLoading ? <Skeleton width={60} /> : herb.herbName}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="flex flex-col max-w-[60%] flex-wrap">
                    {(isLoading ? Array.from({ length: 5 }) : herbs.slice(5, 10)).map((herb: any, index) => (
                        <li key={index + 5} className="max-w-[150px] w-full flex items-center my-3  transition-all">
                            <CircleNumberIcon
                                number={index + 6}
                                className="bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center"
                            />
                            <Link to={"/herbs/" + herb?.id} className="ml-2">
                                {isLoading ? <Skeleton width={60} /> : herb.herbName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
