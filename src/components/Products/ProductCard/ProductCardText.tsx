// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentProps<"span"> {}

export default function ProductCardDiscount({ children, className, ...restProps }: Props) {
	const classNames = cn("text-base text-white", className);

	return (
		<span className={classNames} {...restProps}>
			{children}
		</span>
	);
}
