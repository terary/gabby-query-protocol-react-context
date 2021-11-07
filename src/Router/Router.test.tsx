import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom";

import App from "../Router";

// import { LocationDisplay } from "../Router";

describe("Router", () => {
  it("Should full app rendering/navigating,", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(screen.getByText(/Blank Page/i)).toBeInTheDocument();

    // const leftClick = { button: 0 };
    // userEvent.click(screen.getByText(/workbench/i), leftClick);

    // // check that the content changed to the new page
    // expect(screen.getByText(/Work Bench/i)).toBeInTheDocument();
  });
  it.skip("Should redirect to home if page not found", () => {
    const history = createMemoryHistory();
    history.push("/some/bad/route");
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByText(/Gabby App 2/i)).toBeInTheDocument();
    expect(1).toBe(2);
  });
});

// test("rendering a component that uses useLocation", () => {
//   const history = createMemoryHistory();
//   const route = "/some-route";
//   history.push(route);
//   render(
//     <Router history={history}>
//       <LocationDisplay />
//     </Router>
//   );
//   expect(screen.getByTestId("location-display")).toHaveTextContent(route);
// });
