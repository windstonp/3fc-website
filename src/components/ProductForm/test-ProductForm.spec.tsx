import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { ProductForm } from '.';

describe('<ProductForm />', () => {
  it('should render correctly', () => {
    render(<ProductForm />);

    expect(screen.getByRole('heading', { name: /ProductForm/i })).toBeInTheDocument();
  });
});
