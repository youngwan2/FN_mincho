

interface ErrorMessageCardProps {
  icon?: any;
  text: string
}

export default function ErrorMessageCard({ icon, text }: ErrorMessageCardProps) {
  return (
    <div className="mt-5">
      {icon}
      {text}
    </div>
  )
}