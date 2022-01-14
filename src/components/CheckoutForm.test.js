import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
  render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async () => {
  render(<CheckoutForm/>);

  const firstName = screen.getByLabelText(/first name:/i);
  userEvent.type(firstName, 'Tim');

  const lastName = screen.getByLabelText(/last name:/i);
  userEvent.type(lastName, 'Goloshchapov');

  const address = screen.getByLabelText(/address:/i);
  userEvent.type(address, '111 Best St.');

  const city = screen.getByLabelText(/city:/i);
  userEvent.type(city, 'Timsburg');

  const state = screen.getByLabelText(/state:/i);
  userEvent.type(state, 'Narnia');

  const zip = screen.getByLabelText(/zip:/i);
  userEvent.type(zip, '78889');

  const checkoutButton = screen.getByRole('button'); /// look at getbyrole!!!!!
  userEvent.click(checkoutButton);

  await waitFor(()=>{
    const a = screen.queryByText('Tim');
    const lastNameDisplay = screen.queryByText('Goloshchapov');
    const addressDisplay = screen.queryByText('111 Best St.');
    const cityDisplay = screen.queryByText('Timsburg');
    const stateDisplay = screen.queryByText('Narnia');
    const zipDisplay = screen.queryByText('78889');

    expect(a).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(addressDisplay).toBeInTheDocument();
    expect(cityDisplay).toBeInTheDocument();
    expect(stateDisplay).toBeInTheDocument();
    expect(zipDisplay).toBeInTheDocument();
  })


});
