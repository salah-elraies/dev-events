import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>child layout</div>
      {children}
    </>
  );
}
