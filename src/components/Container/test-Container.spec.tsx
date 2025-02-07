import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { Container } from '.';

describe('<Container />', () => {
  it('should render correctly', () => {
    render(<Container />);

    expect(screen.getByRole('heading', { name: /Container/i })).toBeInTheDocument();
  });
});
