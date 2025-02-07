import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { NavBar } from '.';

describe('<NavBar />', () => {
  it('should render correctly', () => {
    render(<NavBar />);

    expect(screen.getByRole('heading', { name: /NavBar/i })).toBeInTheDocument();
  });
});
