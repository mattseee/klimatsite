// components/Container.tsx
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1440px] px-8">
        {children}
      </div>
    </div>
  );
}
