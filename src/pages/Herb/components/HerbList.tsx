
interface HerbListProps {
    children: React.ReactNode;

}

export default function HerbList({ children }: HerbListProps) {
    return (
        <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  h-auto gap-5">
            {children}
        </ul>
    )
}