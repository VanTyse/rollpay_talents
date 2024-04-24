import { IconPropTypes } from "../../lib/types";
import Icons from "./Icons";
import { cloneElement } from "react";

export default function ({
  name,
  ...props
}: IconPropTypes & { name: keyof typeof Icons }) {
  const Icon = Icons[name];
  const exportedIcon = <Icon {...props} />;
  return exportedIcon;
}
