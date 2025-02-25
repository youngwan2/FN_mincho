// interface HerdItemProps { }

export default function HerbItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="w-full h-auto mt-3 hover:bg-primary-light-gray transition-colors duration-700 p-1 rounded-xl">
            {children}
        </li>
    )
}