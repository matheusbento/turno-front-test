import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
