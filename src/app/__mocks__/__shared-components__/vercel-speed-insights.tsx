jest.mock("@vercel/speed-insights/next", () => ({
    SpeedInsights: () => <div data-testid="speed-insights" />,
}));