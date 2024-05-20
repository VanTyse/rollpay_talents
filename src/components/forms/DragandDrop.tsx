import { Form, Input, UploadProps as AntdUploadProps, Upload } from "antd"
import { Dispatch, SetStateAction } from "react"
import Icon from "../Icons/Icon"

const Dragger = Upload.Dragger

interface UploadProps extends AntdUploadProps {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
}

const DragandDrop = ({ style, ...props }: UploadProps) => {
  return (
    <Dragger
      style={{
        border: "none",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: 12,
        ...style,
      }}
      className="!bg-white"
      {...props}
    >
      {props.file ? (
        <Preview file={props.file} setFile={props.setFile} />
      ) : (
        props.children
      )}
    </Dragger>
  )
}

const Preview = ({
  file,
  setFile,
}: {
  file: File
  setFile: Dispatch<SetStateAction<File | null>>
}) => {
  return (
    <div className="mb-3">
      <img
        className="mx-auto mb-3 block max-w-[50%] rounded-lg"
        src={URL.createObjectURL(file)}
        alt=""
      />
      {/* <div
        className="mx-auto flex w-fit cursor-pointer items-center gap-4"
        onClick={() => setFile(null)}
      >
        <p className="text-xs text-[#525C76]">Replace</p>
        <Icon name="RefreshRightSquare" />
      </div> */}
    </div>
  )
}

export default DragandDrop
