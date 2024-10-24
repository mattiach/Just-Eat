"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => { router.replace('/'); }, [router]);

  return null;
};

export default Custom404;
