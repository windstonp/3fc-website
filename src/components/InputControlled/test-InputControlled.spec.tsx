import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { InputControlled } from '.';

describe('<InputControlled />', () => {
  it('should render correctly', () => {
    render(<InputControlled />);

    expect(screen.getByRole('heading', { name: /InputControlled/i })).toBeInTheDocument();
  });
});
