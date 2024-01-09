import { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { type RenderResult, cleanup, fireEvent, render } from "@testing-library/react";
import type { MockInstance, Mock } from "vitest";

const OPEN_TEXT = "Open";
const CLOSE_TEXT = "Close";
const TITLE_TEXT = "Title";

const testId = {
	dialogTrigger: "dialog-trigger",
	dialogOverlay: "dialog-overlay",
	dialogContent: "dialog-content",
	dialogTitle: "dialog-title",
	dialogClose: "dialog-close",
};

const NoLabelDialogTest = (props: React.ComponentProps<typeof Dialog>) => (
	<Dialog {...props}>
		<DialogTrigger data-testid={testId.dialogTrigger}>{OPEN_TEXT}</DialogTrigger>
		<DialogOverlay data-testid={testId.dialogOverlay} />
		<DialogContent>
			<DialogClose data-testid={testId.dialogClose}>{CLOSE_TEXT}</DialogClose>
		</DialogContent>
	</Dialog>
);

const UndefinedDescribedByDialog = (props: React.ComponentProps<typeof Dialog>) => (
	<Dialog {...props}>
		<DialogTrigger data-testid={testId.dialogTrigger}>{OPEN_TEXT}</DialogTrigger>
		<DialogOverlay data-testid={testId.dialogOverlay} />
		<DialogContent aria-describedby={undefined}>
			<DialogTitle data-testid={testId.dialogTitle}>{TITLE_TEXT}</DialogTitle>
			<DialogClose data-testid={testId.dialogClose}>{CLOSE_TEXT}</DialogClose>
		</DialogContent>
	</Dialog>
);

const DialogTest = (props: React.ComponentProps<typeof Dialog>) => (
	<Dialog {...props}>
		<DialogTrigger data-testid={testId.dialogTrigger}>{OPEN_TEXT}</DialogTrigger>
		<DialogOverlay data-testid={testId.dialogOverlay} />
		<DialogContent>
			<DialogTitle data-testid={testId.dialogTitle}>{TITLE_TEXT}</DialogTitle>
			<DialogClose data-testid={testId.dialogClose}>{CLOSE_TEXT}</DialogClose>
		</DialogContent>
	</Dialog>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderAndClickDialogTrigger(Dialog: any) {
	fireEvent.click(render(Dialog).getByText(OPEN_TEXT));
}

describe("given a Dialog component", () => {
	let rendered: RenderResult;
	let trigger: HTMLElement;
	let closeButton: HTMLElement;
	let consoleWarnMock: MockInstance;
	let consoleWarnMockFunction: Mock;

	beforeEach(() => {
		consoleWarnMockFunction = vi.fn();
		consoleWarnMock = vi.spyOn(console, "warn").mockImplementation(consoleWarnMockFunction);

		rendered = render(<DialogTest />);
		trigger = rendered.getByTestId(testId.dialogTrigger);
	});

	afterEach(() => {
		consoleWarnMock.mockRestore();
		consoleWarnMockFunction.mockClear();
	});

	describe("after clicking the trigger", () => {
		beforeEach(() => {
			fireEvent.click(trigger);
			closeButton = rendered.getByTestId(testId.dialogClose);
		});

		describe("when no title has been provided", () => {
			test("should throw an error", () =>
				expect(() => {
					renderAndClickDialogTrigger(<NoLabelDialogTest />);
				}).toThrow());
		});

		describe("when aria-describedby is set to undefined", () => {
			beforeEach(() => {
				cleanup();
			});
			test("should not warn to the console", () => {
				consoleWarnMockFunction.mockClear();

				renderAndClickDialogTrigger(<UndefinedDescribedByDialog />);
				expect(consoleWarnMockFunction).not.toHaveBeenCalled();
			});
		});

		test("should open the content", () => {
			expect(closeButton).toBeVisible();
		});

		test("should focus the close button", () => {
			expect(closeButton).toHaveFocus();
		});

		describe("when pressing escape", () => {
			beforeEach(() => {
				fireEvent.keyDown(document.activeElement!, { key: "Escape" });
			});

			test("should close the content", () => {
				expect(closeButton).not.toBeInTheDocument();
			});
		});
	});
});
