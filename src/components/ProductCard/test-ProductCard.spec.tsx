import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { ProductCard } from '.';

describe('<ProductCard />', () => {
  it('should render correctly', () => {
    render(<ProductCard />);

    expect(screen.getByRole('heading', { name: /ProductCard/i })).toBeInTheDocument();
  });
});
