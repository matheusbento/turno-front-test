import React from "react";

import { render } from "@testing-library/react";

import BentroxTitle from "./BentroxTitle";

describe("BentroxTitle component", () => {
  it("should display a Title.", () => {
    const { queryByText } = render(<BentroxTitle title="Test Title" />);

    const textElement = queryByText("Test Title");

    expect(textElement).toBeTruthy();
  });

  it("should display children.", () => {
    const { queryByText } = render(<BentroxTitle>Test Children</BentroxTitle>);

    const textElement = queryByText("Test Children");

    expect(textElement).toBeTruthy();
  });
});
