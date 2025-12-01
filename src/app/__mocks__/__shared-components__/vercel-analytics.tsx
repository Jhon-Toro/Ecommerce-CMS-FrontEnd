jest.mock("@vercel/analytics/next", () => ({
    Analytics: () => <div data-testid="analytics" />,
}));