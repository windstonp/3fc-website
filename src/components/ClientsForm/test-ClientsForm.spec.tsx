import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { ClientsForm } from '.';

describe('<ClientsForm />', () => {
  it('should render correctly', () => {
    render(<ClientsForm />);

    expect(screen.getByRole('heading', { name: /ClientsForm/i })).toBeInTheDocument();
  });
});
