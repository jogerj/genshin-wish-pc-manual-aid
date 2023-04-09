import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";

describe("MainPage", () => {
  test('renders "How to grab Genshin Wish URL manually" text', () => {
    render(<MainPage />);
    const headingElement = screen.getByText(/How to grab Genshin Wish URL manually/i);
    expect(headingElement).toBeTruthy();
  });
});
