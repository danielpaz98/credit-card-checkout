import { Label } from "@/components/ui/label";
import { render } from "@testing-library/react";

test("should have text", () => {
	const TEXT = "Label text";

	const { getByTestId } = render(<Label data-testid="label">{TEXT}</Label>);

	const label = getByTestId("label");
	expect(label).toHaveTextContent(TEXT);
});
