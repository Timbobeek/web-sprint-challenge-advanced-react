import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

test("renders without errors", () => {
  render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/first name:/i);
  userEvent.type(firstName, "Tim");
  //console.log(firstName);

  const lastName = screen.getByLabelText(/last name:/i);
  userEvent.type(lastName, "Goloshchapov");

  const address = screen.getByLabelText(/address:/i);
  userEvent.type(address, "111 Best St.");

  const city = screen.getByLabelText(/city:/i);
  userEvent.type(city, "Timsburg");

  const state = screen.getByLabelText(/state:/i);
  userEvent.type(state, "Narnia");

  const zip = screen.getByLabelText(/zip:/i);
  userEvent.type(zip, "78889");

  const checkoutButton = screen.getByRole("button");
  userEvent.click(checkoutButton);

  await waitFor(() => {
    const success = screen.queryByTestId("successMessage");

    expect(success).toBeInTheDocument();
    expect(success.innerHTML).toContain("You have ordered some plants!");
    expect(success.innerHTML).toContain("Tim Goloshchapov");
    expect(success.innerHTML).toContain("111 Best St.");
    expect(success.innerHTML).toContain("Timsburg, Narnia 78889");
  });
});
