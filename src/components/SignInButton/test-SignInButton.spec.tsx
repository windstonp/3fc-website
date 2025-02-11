import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { SignInButton } from '.';

describe('<SignInButton />', () => {
  it('should render correctly', () => {
    render(<SignInButton />);

    expect(screen.getByRole('heading', { name: /SignInButton/i })).toBeInTheDocument();
  });
});
