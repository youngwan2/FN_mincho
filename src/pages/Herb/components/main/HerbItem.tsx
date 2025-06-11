// interface HerdItemProps { }

interface HerbItemProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
}

export default function HerbItem({ children, className = '', style, id }: HerbItemProps) {
    return (
        <li
            className={`w-full h-auto mt-3 hover:bg-primary-light-gray transition-colors duration-700 p-1 rounded-xl animate-fade ${className}`}
            style={style}
            id={id}
        >
            {children}
        </li>
    )
}