// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentProps<"h1"> {}

export default function ProductCardDiscount({ children, className, ...restProps }: Props) {
	const classNames = cn("line-clamp-2 text-white", className);

	return (
		<h2 className={classNames} {...restProps}>
			{children}
		</h2>
	);
}
