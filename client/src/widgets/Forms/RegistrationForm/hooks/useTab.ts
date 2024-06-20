import { useRef } from 'react';

export const useTab = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const inputRefs = useRef([
    nameRef,
    emailRef,
    passwordRef,
    countryRef,
    cityRef,
    addressRef,
    companyRef,
  ]);

  return inputRefs;
};
