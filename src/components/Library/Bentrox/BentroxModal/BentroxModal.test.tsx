import React from "react";

import { render } from "@testing-library/react";

import BentroxModal from "./BentroxModal";

const mockedCloseHandler = vi.fn();

describe("BentroxModal component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should display children.", () => {
    const { queryByText } = render(
      <BentroxModal
        open
        isClosable={false}
        closeByClickingOutside
        closeHandler={mockedCloseHandler}
      >
        <div>Test Children</div>
      </BentroxModal>
    );

    const textElement1 = queryByText("Test Children");

    expect(textElement1).toBeTruthy();
  });

  it("should display nothing if not opened.", () => {
    const { queryByText } = render(
      <BentroxModal closeHandler={mockedCloseHandler}>
        <div>Test Children</div>
      </BentroxModal>
    );

    const textElement1 = queryByText("Test Children");

    expect(textElement1).toBeFalsy();
  });

  it("should display title.", () => {
    const { queryByText } = render(
      <BentroxModal
        open
        isClosable={false}
        closeOnEscape
        title="test title"
        closeHandler={mockedCloseHandler}
      >
        <div>Test Children</div>
      </BentroxModal>
    );

    const textElement1 = queryByText("test title");

    expect(textElement1).toBeTruthy();
  });
});
