"use client";

import { Dialog, type DialogProps } from "./dialog";

export type ModalProps = DialogProps;

export function Modal(props: ModalProps) {
  return <Dialog {...props} />;
}
