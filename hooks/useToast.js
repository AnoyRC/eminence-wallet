'use client';
import { useDispatch } from 'react-redux';
import { addToast } from '@/redux/toastSlice';

export default function useToast() {
  const dispatch = useDispatch();

  const Error = (msg) => {
    dispatch(addToast({ type: 'error', msg }));
  };

  const Success = (msg) => {
    dispatch(addToast({ type: 'success', msg }));
  };

  const Info = (msg) => {
    dispatch(addToast({ type: 'info', msg }));
  };

  return {
    Error,
    Success,
    Info,
  };
}
