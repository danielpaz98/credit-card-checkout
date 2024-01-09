import { Input } from "@/components/ui/input";
import { fireEvent, render, screen } from "@testing-library/react";

type TestElement = Document | Element | Window | Node;

function hasInputValue(e: TestElement, inputValue: string) {
	return screen.getByDisplayValue(inputValue) === e;
}

test("should change the value when typing", () => {
	const { getByTestId } = render(<Input readOnly data-testid="input" />);
	const input = getByTestId("input");

	fireEvent.change(input, { target: { value: "123" } });
	expect(hasInputValue(input, "123")).toBe(true);
});

test("has the proper type attribute", () => {
	const { getByTestId, rerender } = render(<Input data-testid="input" type="text" />);

	expect(getByTestId("input")).toHaveAttribute("type", "text");

	rerender(<Input data-testid="input" type="number" />);

	expect(getByTestId("input")).toHaveAttribute("type", "number");

	rerender(<Input data-testid="input" type="email" />);

	expect(getByTestId("input")).toHaveAttribute("type", "email");

	rerender(<Input data-testid="input" type="submit" />);

	expect(getByTestId("input")).toHaveAttribute("type", "submit");
});

test("should be disabled", () => {
	const { getByTestId } = render(<Input disabled data-testid="input" />);

	const input = getByTestId("input");
	expect(input).toBeDisabled();
});

test("placeholder input renders correctly", () => {
	const { getByTestId } = render(<Input data-testid="input" placeholder="Placeholder" />);

	expect(getByTestId("input")).toHaveAttribute("placeholder", "Placeholder");
});

test("disabled input renders correctly", () => {
	const { getByTestId } = render(<Input disabled data-testid="input" />);

	expect(getByTestId("input")).toHaveAttribute("disabled");
});

test("readonly input renders correctly", () => {
	const { getByTestId } = render(<Input readOnly data-testid="input" />);

	expect(getByTestId("input")).toHaveAttribute("readonly");
});
