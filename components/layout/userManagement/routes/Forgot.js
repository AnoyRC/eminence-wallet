import Form from '../Form';
import { ForgotBtn } from './FormBtn';

const Forgot = () => {
  return (
    <Form
      heading={'Reset Password with Security Phrase'}
      paragraph={
        'You can reset it by confirming your security phrase. A successful match will allow you to create a new password and regain access Eminence. Eminence cannot recover your password for you.'
      }
    >
      <ForgotBtn />
    </Form>
  );
};
export default Forgot;
