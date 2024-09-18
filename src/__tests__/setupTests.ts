import '@testing-library/jest-dom/vitest';
import { afterEach } from 'node:test';
import { afterAll, beforeAll, vi } from 'vitest';
import { server } from './mocks/server';


beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
});