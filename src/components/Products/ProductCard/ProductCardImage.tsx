// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentProps<"img"> {
	className?: string;
}

export default function ProductCardImage({ alt, src, className }: Props) {
	const classNames = cn("grid w-full bg-white rounded-md h-80 place-items-center", className);

	return (
		<picture className={classNames}>
			<img alt={alt} className="object-cover w-40 hw-40" src={src} />
		</picture>
	);
}
