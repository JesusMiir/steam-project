import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export function renderWithProviders(ui, { initialEntries = ["/"] } = {}) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);
}
