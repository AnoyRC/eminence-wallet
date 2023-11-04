import Form from '../../Form';
import SetPasswordInput from '../SetPasswordInput';

const SetPassword = () => {
  return (
    <Form
      heading={'Create Password and Confirm Password'}
      paragraph={
        'Establish your access credentials by setting up your password for your wallet.'
      }
    >
      <SetPasswordInput />
    </Form>
  );
};

export default SetPassword;
