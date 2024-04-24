import { ThemeConfig } from "antd"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorTextPlaceholder: "#E5E7EB",
    fontFamily: inter.style.fontFamily,
    colorBorder: "#D0D5DD",
    borderRadius: 8,
    colorText: "#667085",
    colorPrimary: "#3E54D3",
    controlOutlineWidth: 2,
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
    lineWidth: 2,
  },
  components: {
    Select: {
      zIndexPopup: 9999,
      controlHeight: 40,
    },
    Checkbox: {
      colorPrimary: "#001F3F",
    },
    DatePicker: {
      controlHeight: 40,
    },
  },
}

export default theme
