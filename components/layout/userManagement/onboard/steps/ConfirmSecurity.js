import Form from '../../Form';
import SecurityInput from '../SecurityInput';

const ConfirmSecurity = () => {
  return (
    <Form
      heading={'Confirm Security Phrase'}
      paragraph={
        "Please re-enter the security phrase provided by Eminence. This step confirms that the phrase you've saved matches."
      }
    >
      <SecurityInput />
    </Form>
  );
};

export default ConfirmSecurity;
