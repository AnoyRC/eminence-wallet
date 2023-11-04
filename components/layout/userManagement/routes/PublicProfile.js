import { PublicProfileBtn } from './FormBtn';
import Form from '../Form';

const PublicProfile = () => {
  return (
    <Form
      heading={'Craft Your Public Profile'}
      paragraph={
        'Create an Eminence profile by choosing an avatar and entering your first and last name. This helps you connect with others in the crypto community.'
      }
    >
      <PublicProfileBtn />
    </Form>
  );
};

export default PublicProfile;
