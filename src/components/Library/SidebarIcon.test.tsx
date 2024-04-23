import React from "react";

import { render } from "@testing-library/react";

import SidebarIcon from "./SidebarIcon";

describe("SidebarIcon component", () => {
  it("should display an icon.", () => {
    const { container } = render(<SidebarIcon path="test-path" />);

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });

  it("should display an subItem.", () => {
    const { container } = render(
      <SidebarIcon subItem path="test-path" />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });
});
