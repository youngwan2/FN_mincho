// interface HerdItemProps { }

export default function HerbItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="w-full h-auto transition mt-8">
            {children}
        </li>
    )
}