import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UsersListSkeleton, UsersListWorkspace } from "@/components/users/UsersListWorkspace";
import { UsersTable } from "@/components/users/UsersTable";
import { mockUsersWithActivity } from "@/test/fixtures";
import {
  mockReplace,
  resetNavigationMocks,
  setMockSearchParams,
} from "@/test/mocks/next-navigation";
import { renderWithProviders } from "@/test/test-utils";

jest.mock("../hooks/useUsersWithActivity", () => ({
  useUsersWithActivity: jest.fn(),
}));

import { useUsersWithActivity } from "../hooks/useUsersWithActivity";

const mockedUseUsersWithActivity = jest.mocked(useUsersWithActivity);

function mockListSuccess() {
  mockedUseUsersWithActivity.mockReturnValue({
    data: mockUsersWithActivity,
    isPending: false,
    isError: false,
    error: null,
    isFetching: false,
    refetch: jest.fn(),
  });
}

describe("Users list", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setMockSearchParams("");
    mockListSuccess();
  });

  it("renders users with activity columns in the table", () => {
    renderWithProviders(
      <UsersTable users={mockUsersWithActivity} returnTo="/users" />,
    );

    expect(screen.getByRole("columnheader", { name: "Posts" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Pending" })).toBeInTheDocument();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "View" })).toHaveLength(3);
  });

  it("shows loading skeleton", () => {
    mockedUseUsersWithActivity.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      isFetching: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<UsersListSkeleton />);
    expect(screen.getByLabelText("Loading users")).toBeInTheDocument();
  });

  it("shows error state with retry", () => {
    mockedUseUsersWithActivity.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error("Network failed"),
      isFetching: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<UsersListWorkspace />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load users");
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("filters users by search query from URL params", () => {
    setMockSearchParams("q=aaron");
    renderWithProviders(<UsersListWorkspace />);

    expect(screen.getAllByText("Aaron Dill").length).toBeGreaterThan(0);
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
  });

  it("submits search and updates the route", async () => {
    const user = userEvent.setup();
    renderWithProviders(<UsersListWorkspace />);

    await user.type(screen.getByRole("searchbox"), "chelsey");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(mockReplace).toHaveBeenCalledWith("/users?q=chelsey", {
      scroll: false,
    });
  });

  it("filters users with pending todos", () => {
    setMockSearchParams("filter=pending");
    renderWithProviders(<UsersListWorkspace />);

    expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Chelsey Dietrich").length).toBeGreaterThan(0);
    expect(screen.queryByText("Aaron Dill")).not.toBeInTheDocument();
  });

  it("sorts by most pending todos when sort=pending", () => {
    setMockSearchParams("sort=pending&order=desc");
    renderWithProviders(<UsersListWorkspace />);

    const nameLinks = screen.getAllByRole("link", {
      name: /Graham|Dill|Dietrich/,
    });
    expect(nameLinks[0]).toHaveTextContent("Leanne Graham");
  });

  it("shows empty state when filters match no users", () => {
    setMockSearchParams("q=zzzznotfound");
    renderWithProviders(<UsersListWorkspace />);

    expect(screen.getByText("No users match your filters")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear all filters" }),
    ).toBeInTheDocument();
  });
});
