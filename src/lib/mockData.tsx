import { FAQ } from "./types"

export const faqs: FAQ[] = [
  {
    question: "What is Request Payment?",
    answer:
      "You can easily request payment for your services on a project directly through Rollpay, and get paid.",
  },
  {
    question: "What does the “Create invoice” button do?",
    answer:
      "Allows you to create invoices for projects you are a part of on the platform, and outside Rollpay. ",
  },
  {
    question: "What is paperwork? ",
    answer: `You can access project-related documents like contracts in the "Paperwork" section. `,
  },
  {
    question: "Why do we ask for Tax Payer ID? ",
    answer:
      "You are required to provide your Tax Payer ID for tax withholding and remitting purposes. (if applicable)",
  },
  {
    question: " Is Rollpay A Savings Platform?",
    answer:
      "Rollpay is designed for project management and payments. Funds are seamlessly transferred to your linked bank account upon disbursement. Funds are not stored on the platform.",
  },
  {
    question: "Can I be On Multiple Projects simultaneously and get paid? ",
    answer:
      "Yes! You can simultaneously be a talent on multiple Rollpay projects and receive separate payments for each.",
  },
  {
    question: "Pricing and Fees",
    answer: (
      <span>
        For pricing information, please visit the Rollpay{" "}
        <a href="#" target="_blank" rel="noopener noreferrer">
          website
        </a>
        .
      </span>
    ),
  },
]
