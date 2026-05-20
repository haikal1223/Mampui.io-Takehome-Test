import { paginate } from "@/lib/users/pagination";

describe("paginate", () => {
  it("slices items by page", () => {
    const items = Array.from({ length: 25 }, (_, i) => i + 1);
    const result = paginate(items, 2, 10);

    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(3);
    expect(result.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it("clamps page when out of range", () => {
    const result = paginate([1, 2, 3], 99, 10);
    expect(result.page).toBe(1);
    expect(result.items).toEqual([1, 2, 3]);
  });
});
