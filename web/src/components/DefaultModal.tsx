import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type DefaultModalProps = {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  onOk?: () => void;
  children?: React.ReactNode;
};

export default function DefaultModal({
  title,
  isOpen,
  onClose,
  onOk,
  children,
}: DefaultModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {onClose && (
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-transparent text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <FontAwesomeIcon icon="xmark" size="2x" />
            </button>
          </div>
        )}
        {/* Contenu du modal */}
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-2 px-7 py-3">
            {children ? children : <p>Contenu du modal</p>}
          </div>
          {onOk && (
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={onOk}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
