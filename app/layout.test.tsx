import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from './layout';
import {navLinks} from "./links";

describe("RootLayout", () => {
  it("renders the nav", () => {
    render(<RootLayout><p>child, please</p></RootLayout>);
 
    navLinks.forEach((link) => {
      const el = screen.getByText(link.text);
      expect(el).toBeInTheDocument();
    });
   
  });
});