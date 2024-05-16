"use client"

import Icon from "@/components/Icons/Icon"
import DatePicker from "@/components/forms/DatePicker"
import Select from "@/components/forms/Select"
import TextArea from "@/components/forms/TextArea"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Modal from "@/components/general/Modal"
import { Space_Grotesk } from "next/font/google"
import { useEffect, useState } from "react"

interface ModalProps {
  show: boolean
  closeModal: () => void
}

export function LogoutModal({ show, closeModal }: ModalProps) {
  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="fixed left-1/2 w-dvw max-w-[376px] -translate-x-1/2 overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[90dvh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-8">
        <h1 className="mb-4 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Log Out
        </h1>
        <h3 className="mb-10 text-center text-sm">
          Are you sure you want to log out?
        </h3>
        <div
          className="flex items-center gap-6"
          onClick={(e) => e.preventDefault()}
        >
          <Button
            variant="primary"
            className="text-rp-grey-1700 w-full basis-1/2 border-rp-grey-700 bg-rp-grey-700"
            onClick={closeModal}
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            className="bg-rp-red-100 border-rp-red-100s w-full basis-1/2"
          >
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  )
}
