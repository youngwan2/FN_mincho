
interface HerbListProps {
    children: React.ReactNode;

}

export default function HerbList({ children }: HerbListProps) {
    return (
        <ul className="grid grid-cols-3  h-auto gap-5">
            {children}
        </ul>
    )
}