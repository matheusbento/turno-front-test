import React from "react";

import { render } from "@testing-library/react";

import BentroxSidebarIcon from "./BentroxSidebarIcon";

describe("BentroxSidebarIcon component", () => {
  it("should display an icon.", () => {
    const { container } = render(<BentroxSidebarIcon path="test-path" />);

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });

  it("should display an subItem.", () => {
    const { container } = render(
      <BentroxSidebarIcon subItem path="test-path" />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });
});
