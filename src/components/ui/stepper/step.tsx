import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";

export interface StepProps extends React.ComponentProps<"div"> {
	children?: React.ReactNode;
	className?: string;
	activeClassName?: string;
	completedClassName?: string;
}

export const Step = forwardRef<HTMLDivElement, StepProps>((props, ref) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { className, children, activeClassName, completedClassName, ...restProps } = props;

	const classNames = cn(
		"relative z-10 grid place-items-center w-10 h-10 rounded-full bg-gray-300 text-gray-900 font-bold transition-all duration-300",
		className,
	);

	return (
		<div {...restProps} ref={ref} className={classNames}>
			{children}
		</div>
	);
});

Step.displayName = "Step";

export default Step;
