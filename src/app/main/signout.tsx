'use client'

import Image from 'next/image';

import image1 from '@assets/icons/signout-btn.png';

type SignOutProps = {
  signOut: () => void
};

const SignOut: React.FC<SignOutProps> = ({ signOut }) => {

  return (
    <>
      <Image
        src={ image1.src }
        alt=""
        width="40"
        height="40"
        className="w-[40px] h-[40px] hover:cursor-pointer"
        onClick={ () => signOut() }
      ></Image>
    </>
  );
};

export default SignOut;