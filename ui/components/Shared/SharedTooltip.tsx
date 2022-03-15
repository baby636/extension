import React, { ReactElement, useState } from "react"

type VeriticalPosition = "top" | "bottom"

interface Props {
  verticalPosition?: VeriticalPosition
  width: number
  children: React.ReactNode
}

function getHorizontalPosition(width: number) {
  return `right: -${width / 2 + 4}px;`
}

function getVerticalPosition(vertical: VeriticalPosition) {
  switch (vertical) {
    case "bottom":
      return "top: 25px;"
    case "top":
      return "bottom: 25px;"
    default:
      return ""
  }
}

export default function SharedTooltip(props: Props): ReactElement {
  const { children, verticalPosition = "bottom", width } = props
  const [isShowingTooltip, setIsShowingTooltip] = useState(false)

  return (
    <div
      className="tooltip_wrap"
      onMouseEnter={() => {
        setIsShowingTooltip(true)
      }}
      onMouseLeave={() => {
        setIsShowingTooltip(false)
      }}
    >
      <div className="info_icon" />
      {isShowingTooltip ? <div className="tooltip">{children}</div> : null}
      <style jsx>
        {`
          .tooltip_wrap {
            width: fit-content;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            margin-left: 8px;
            padding 5px 0;
            z-index: 20;
          }
          .info_icon {
            background: url("./images/info@2x.png");
            background-size: cover;
            width: 16px;
            height: 16px;
            display: block;
          }
          .tooltip {
            width: ${width}px;
            position: absolute;
            box-shadow: 0 2px 4px rgba(0, 20, 19, 0.24),
              0 6px 8px rgba(0, 20, 19, 0.14), 0 16px 16px rgba(0, 20, 19, 0.04);
            background-color: var(--green-20);
            color: var(--green-95);
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            border-radius: 3px;
            padding: 12px;
            ${getVerticalPosition(verticalPosition)}
            ${getHorizontalPosition(width)}
          }
        `}
      </style>
    </div>
  )
}
