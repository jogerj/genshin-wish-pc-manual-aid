import { render, fireEvent, screen } from "@testing-library/react";
import MainPage from "./MainPage";

describe("MainPage", () => {
  test("renders the component without crashing", () => {
    render(<MainPage />);
    expect(screen.getByText(/How to grab Genshin Wish URL manually/i)).toBeTruthy();
  });

  test("updates the server state when the server dropdown is changed", () => {
    render(<MainPage />);
    const dropdownToggle = screen.getByText(/Choose a server/i);
    fireEvent.click(dropdownToggle);
    const dropdownItem = screen.getByText(/China/i);
    fireEvent.click(dropdownItem);
    expect(screen.getByText(/Navigate to this folder in Genshin Impact's folder/i)).toBeTruthy();
  });

  test("updates the URL state when a file is uploaded", () => {
    render(<MainPage />);
    const fileInput = screen.getByLabelText(/Drag data_2 file to this drop zone below/i);
    const file = new File(["file contents"], "data_2.txt", { type: "text/plain" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText(/Here is your link/i)).toBeTruthy();
  });

  test("copies the URL to clipboard when the 'Click to copy link' button is clicked", () => {
    render(<MainPage />);
    const fileInput = screen.getByLabelText(/Drag data_2 file to this drop zone below/i);
    const file = new File(["file contents"], "data_2.txt", { type: "text/plain" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    const copyButton = screen.getByText(/Click to copy link/i);
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://example.com");
  });
});
