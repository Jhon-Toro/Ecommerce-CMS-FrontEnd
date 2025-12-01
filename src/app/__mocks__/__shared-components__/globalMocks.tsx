jest.mock("@/app/components/navbar/Navbar", () => {
  const MockNavbar = () => <nav data-testid="navbar">Navbar</nav>;
  MockNavbar.displayName = "MockNavbar";
  return MockNavbar;
});

jest.mock("@/app/components/footer/Footer", () => {
  const MockFooter = () => <footer data-testid="footer">Footer</footer>;
  MockFooter.displayName = "MockFooter";
  return MockFooter;
});

jest.mock("@/app/components/Banner/Banner", () => {
  const MockBanner = () => <footer data-testid="banner">Banner</footer>;
  MockBanner.displayName = "MockBanner";
  return MockBanner;
});

jest.mock("next/font/google", () => ({
  Poppins: () => ({ className: "mocked-poppins-font" }),
}));
