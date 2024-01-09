import { forwardRef, useRef, useState, useMemo, useEffect, cloneElement } from "react";
// UTILS
import { cn } from "@/utils";

export interface StepperProps extends React.ComponentProps<"div"> {
	children?: React.ReactNode;
	className?: string;
	lineClassName?: string;
	activeLineClassName?: string;
	activeStep?: number;
	isFirstStep?: (arg: boolean) => void;
	isLastStep?: (arg: boolean) => void;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
	(
		{ activeStep = 0, isFirstStep, isLastStep, className, lineClassName, activeLineClassName, children, ...rest },
		externalRef,
	) => {
		const innerRef = useRef<HTMLDivElement>(null);
		const ref = (externalRef as React.RefObject<HTMLDivElement>) ?? innerRef;

		const [widthPerStep, setWidthPerStep] = useState(0);
		const isFirstStepValue = activeStep === 0;
		const isLastStepValue = Array.isArray(children) && activeStep === children.length - 1;
		const isReachEnd = Array.isArray(children) && activeStep > children.length - 1;

		useEffect(() => {
			if (ref.current) {
				const childrenInstance = children as React.ReactNode[];
				const { width } = ref.current.getBoundingClientRect();
				const widthPerStepCalc = children ? width / (childrenInstance.length - 1) : 0;

				setWidthPerStep(widthPerStepCalc);
			}
		}, [children, ref]);

		const width = useMemo(() => {
			if (!isReachEnd) {
				return widthPerStep * activeStep;
			}
		}, [activeStep, isReachEnd, widthPerStep]);

		const classNames = cn("w-full relative flex items-center justify-between", className);
		const lineClasses = cn("absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300", lineClassName);
		const activeLineClasses = cn(lineClasses, "bg-gray-900 transition-all duration-500", activeLineClassName);
		const activeStepClasses = "bg-gray-900";
		const completedStepClasses = "bg-gray-900";

		useEffect(() => {
			isLastStep && typeof isLastStep === "function" && isLastStep(isLastStepValue);
			isFirstStep && typeof isFirstStep === "function" && isFirstStep(isFirstStepValue);
		}, [isFirstStep, isFirstStepValue, isLastStep, isLastStepValue]);

		return (
			<div {...rest} ref={ref} className={classNames}>
				<div className={lineClasses} />
				<div
					className={activeLineClasses}
					style={{
						width: `${width}px`,
					}}
				/>
				{Array.isArray(children)
					? children.map((child, index) => {
							return cloneElement(child, {
								key: index,
								...child.props,
								className: cn(
									child.props.className,
									index === activeStep
										? cn(activeStepClasses, child.props?.activeClassName)
										: index < activeStep
											? cn(completedStepClasses, child.props?.completedClassName)
											: "",
								),
							});
						})
					: children}
			</div>
		);
	},
);

Stepper.displayName = "Stepper";

export default Stepper;
