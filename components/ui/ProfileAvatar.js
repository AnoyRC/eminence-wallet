'use client';

import Avatar, { genConfig } from 'react-nice-avatar';

const ProfileAvatar = ({ id, style, classname }) => {
  return <Avatar style={style} {...genConfig(id)} className={classname} />;
};

export default ProfileAvatar;
