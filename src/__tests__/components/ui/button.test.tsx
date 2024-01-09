import { Button } from "@/components/ui/button";
import { render } from "@testing-library/react";

test("should have text", () => {
	const TEXT = "Button text";

	const { getByTestId } = render(
		<Button disabled data-testid="btn">
			{TEXT}
		</Button>,
	);

	const button = getByTestId("btn");
	expect(button).toHaveTextContent(TEXT);
});

test("has the proper type attribute", () => {
	const { getByTestId, rerender } = render(
		<Button data-testid="btn" type="button">
			Email
		</Button>,
	);

	expect(getByTestId("btn")).toHaveAttribute("type", "button");

	rerender(
		<Button data-testid="btn" type="submit">
			Email
		</Button>,
	);

	expect(getByTestId("btn")).toHaveAttribute("type", "submit");
});

test("should be disabled", () => {
	const { getByTestId } = render(
		<Button disabled data-testid="btn">
			Disabled button
		</Button>,
	);

	const button = getByTestId("btn");
	expect(button).toBeDisabled();
});
