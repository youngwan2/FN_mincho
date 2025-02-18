import map from '../../../assets/home-map.png'
import CircleNumberIcon from './CircleNumberIcon'

export default function MostViewSection() {


    const tempIndex = 1;
    const tempIndex2 = 2;
    const tempIndex3 = 3;
    return (
        <section className='flex mt-15 p-10'>
            <div className='flex flex-col max-w-[30%]'>
                <h2 className="text-4xl leading-13">사람들이 <br /> <strong> 많이 찾은 <br /> 약초</strong></h2>
                <img src={map} alt="placeholder" />
            </div>
            <div className='w-full max-w-[60%] flex relative p-[40px] justify-around'>
                <ul className='flex flex-col max-w-[60%] flex-wrap'>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={1} className={`${tempIndex == 1 ? 'bg-[#FFC44C]' : ''}  p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center`} />
                        <p className='ml-2'>개나리</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={2} className={`${tempIndex2 == 2 ? 'bg-[#D3D3D3]' : ''} p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center`} />
                        <p className='ml-2'>시금치</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={3} className={`${tempIndex3 == 3 ? 'bg-[#E7986D]' : ''}  p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center`} />
                        <p className='ml-2'>양파</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={4} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>마</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={5} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>깻잎</p>
                    </li>
                </ul>
                <ul className='flex flex-col max-w-[60%] flex-wrap'>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={6} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>수련</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={7} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>우엉</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={8} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>고나리</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={9} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>뽕잎</p>
                    </li>
                    <li className='max-w-[150px] w-full flex items-center my-3'>
                        <CircleNumberIcon number={10} className='bg-[#F2F2F7] p-1 rounded-full w-[24px] h-[24px] flex items-center justify-center' />
                        <p className='ml-2'>양배추</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}