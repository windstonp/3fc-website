import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { WhatsappButton } from '.';

describe('<WhatsappButton />', () => {
  it('should render correctly', () => {
    render(<WhatsappButton />);

    expect(screen.getByRole('heading', { name: /WhatsappButton/i })).toBeInTheDocument();
  });
});
