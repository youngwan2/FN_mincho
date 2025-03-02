
interface HerbDetailBodyProps {
  children: React.ReactNode
}

export default function HerbDetailBody({children }: HerbDetailBodyProps) {
  return (
    <div className="min-h-[768px] relative">
      {children}
    </div>
  )
}