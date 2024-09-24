import localFont from "next/font/local";

const nuckleRegular = localFont({
  src: "../app/fonts/Nuckle-Regular.woff",
  weight: "100 900",
});

const nuckleMedium = localFont({
  src: "../app/fonts/Nuckle-Medium.woff",
  weight: "700",
});

export { nuckleRegular, nuckleMedium };