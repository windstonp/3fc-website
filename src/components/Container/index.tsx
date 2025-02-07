import { ReactNode } from "react";

interface IContainerProps {
  readonly children: ReactNode;
}

export function Container({ children }: IContainerProps) {
  return <div className="container mx-auto px-6">{children}</div>;
}
