import Form from '../../Form';
import FaqQuestion from '../FaqQuestion';
import { FaqBtn } from '../FormBtn';

const Faq = () => {
  return (
    <Form
      heading={'Frequently Asked Questions'}
      paragraph={
        "Find answers to common questions and concerns about Eminence Wallet's security and functionality in this section."
      }
    >
      <FaqQuestion />

      <FaqBtn />
    </Form>
  );
};

export default Faq;
