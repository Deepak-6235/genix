import { useState } from 'react';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  confirmButtonClass?: string;
}

export function useConfirmModal() {
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const openConfirmModal = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText?: string,
    confirmButtonClass?: string
  ) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText,
      confirmButtonClass,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  return { confirmModal, openConfirmModal, closeConfirmModal };
}
