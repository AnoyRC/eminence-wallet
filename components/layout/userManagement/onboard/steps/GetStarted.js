import { GetStartedBtn } from '../FormBtn';
import Form from '../../Form';

const GetStarted = () => {
  return (
    <Form
      heading={'Getting Started'}
      paragraph={
        "Begin your journey by setting up your wallet, whether it's creating a new one or importing an existing wallet."
      }
    >
      <GetStartedBtn />
    </Form>
  );
};

export default GetStarted;
