import { screen, waitFor } from "@testing-library/react";

import { UserDetailView } from "@/components/users/UserDetailView";
import { UserDetailSkeleton } from "@/components/users/UserDetailSkeleton";
import { fetchUser } from "@/lib/api/jsonplaceholder";
import { installJsonPlaceholderFetchMock } from "@/test/helpers/mock-fetch";
import { renderWithProviders } from "@/test/test-utils";

describe("User details", () => {
  it("renders profile, posts, and todos from the API", async () => {
    const fetchMock = installJsonPlaceholderFetchMock();

    renderWithProviders(
      <UserDetailView userId={1} backHref="/users" />,
    );

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Leanne Graham" })).toBeInTheDocument();
    });

    expect(screen.getByText("leanne@example.com")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Posts \(2\)/)).toBeInTheDocument();
    });
    expect(screen.getByText("Post A")).toBeInTheDocument();
    expect(screen.getByText(/Todos \(1\/3 completed\)/)).toBeInTheDocument();
    expect(screen.getByText("Todo open 1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to list/i })).toHaveAttribute(
      "href",
      "/users",
    );

    fetchMock.mockRestore();
  });

  it("shows loading skeleton while fetching", () => {
    renderWithProviders(<UserDetailSkeleton />);
    expect(screen.getByLabelText("Loading user details")).toBeInTheDocument();
  });

  it("shows error state when user fetch fails", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "fail" }),
    } as Response);

    renderWithProviders(
      <UserDetailView userId={1} backHref="/users?q=test" />,
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Failed to load user");
    });
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to list/i })).toHaveAttribute(
      "href",
      "/users?q=test",
    );

    fetchMock.mockRestore();
  });

  it("shows not found when user id is missing from API", async () => {
    const fetchMock = installJsonPlaceholderFetchMock();

    renderWithProviders(
      <UserDetailView userId={999} backHref="/users" />,
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("User not found");
    });
    expect(screen.queryByRole("button", { name: "Try again" })).not.toBeInTheDocument();

    fetchMock.mockRestore();
  });
});

describe("fetchUser (mocked fetch)", () => {
  it("returns a user for valid ids", async () => {
    const fetchMock = installJsonPlaceholderFetchMock();
    const user = await fetchUser(1);
    expect(user.name).toBe("Leanne Graham");
    fetchMock.mockRestore();
  });

  it("throws when user is missing", async () => {
    const fetchMock = installJsonPlaceholderFetchMock();
    await expect(fetchUser(999)).rejects.toThrow("User not found");
    fetchMock.mockRestore();
  });
});
