import { render, screen } from '@/utils/tests';
import "@testing-library/jest-dom";

import { CompanyForm } from '.';

describe('<CompanyForm />', () => {
  it('should render correctly', () => {
    render(<CompanyForm />);

    expect(screen.getByRole('heading', { name: /CompanyForm/i })).toBeInTheDocument();
  });
});
