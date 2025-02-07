import { RenderOptions, render } from "@testing-library/react";
const customRender = (
  ui: React.ReactElement,
  { ...renderOptions }: Omit<RenderOptions, "wrapper"> = {}
) => render(ui, { ...renderOptions });

export * from "@testing-library/react";
export { customRender as render };
