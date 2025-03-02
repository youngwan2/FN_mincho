

interface ErrorMessageCardProps {
  icon?: any;
  text: string
}

export default function ErrorMessageCard({ icon, text }: ErrorMessageCardProps) {
  return (
    <div className="">
      {icon}
      {text}
    </div>
  )
}