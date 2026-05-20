export const mockReplace = jest.fn();
export let mockSearchParams = new URLSearchParams();

export function setMockSearchParams(
  value: string | URLSearchParams = "",
) {
  mockSearchParams =
    typeof value === "string" ? new URLSearchParams(value) : value;
}

export function resetNavigationMocks() {
  mockReplace.mockReset();
  mockSearchParams = new URLSearchParams();
}

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: jest.fn(),
  }),
  usePathname: () => "/users",
  useSearchParams: () => mockSearchParams,
}));
