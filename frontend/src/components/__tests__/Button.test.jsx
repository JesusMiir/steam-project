import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import Button from "../Button.jsx";

describe("Button", () => {
    it("renders label", () => {
        renderWithProviders(<Button label="Buy" />);
        expect(screen.getByText("Buy")).toBeInTheDocument();
    });

    it("fires onClick", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        renderWithProviders(<Button label="Add to cart" onClick={onClick} />);
        await user.click(screen.getByRole("button", { name: /add to cart/i }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
