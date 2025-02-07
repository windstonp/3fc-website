import { ReactNode } from "react";

interface IContainerProps {
  readonly children: ReactNode;
  readonly styles?: string;
}

export function Container({ children, styles = "" }: IContainerProps) {
  return <div className={`container mx-auto px-6 ${styles}`}>{children}</div>;
}
