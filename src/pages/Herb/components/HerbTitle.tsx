import { ElementType, HTMLAttributes } from "react";

interface HerbTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    elementName: React.ElementType
    children: React.ReactNode
}

export default function HerbTitle({ elementName, children, ...props }: HerbTitleProps) {
    const Heading: ElementType = elementName
    return (
        <Heading {...props} >{children}</Heading>
    )
}