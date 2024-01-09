// UTILS
import { cn } from "@/utils";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function ProductCard({ children, className }: Props) {
	const classNames = cn("max-w-[340px]", className);

	return <div className={classNames}>{children}</div>;
}
