import React, { useMemo } from 'react'
import RcImage from 'rc-image'
import { classNames } from '@nbfe/tools'
import { getClassNames } from '../config'
import {
  EyeOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined
} from '../Icons'

const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />
}

const fallback =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9Imljb24iIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPgogIDxwYXRoIGQ9Ik01NTMuMSA1MDkuMWwtNzcuOCA5OS4yLTQxLjEtNTIuNGE4IDggMCAwIDAtMTIuNiAwbC05OS44IDEyNy4yYTcuOTggNy45OCAwIDAgMCA2LjMgMTIuOUg2OTZjNi43IDAgMTAuNC03LjcgNi4zLTEyLjlsLTEzNi41LTE3NGE4LjEgOC4xIDAgMCAwLTEyLjcgMHpNMzYwIDQ0MmE0MCA0MCAwIDEgMCA4MCAwIDQwIDQwIDAgMSAwLTgwIDB6bTQ5NC42LTE1My40TDYzOS40IDczLjRjLTYtNi0xNC4xLTkuNC0yMi42LTkuNEgxOTJjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjgzMmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NDBjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzExLjNjMC04LjUtMy40LTE2LjctOS40LTIyLjd6TTc5MC4yIDMyNkg2MDJWMTM3LjhMNzkwLjIgMzI2em0xLjggNTYySDIzMlYxMzZoMzAydjIxNmE0MiA0MiAwIDAgMCA0MiA0MmgyMTZ2NDk0eiIvPgo8L3N2Zz4K'

const Image = ({ preview, ...otherProps }) => {
  const mergedPreview = useMemo(() => {
    if (preview === false) {
      return preview
    }
    const _preview = typeof preview === 'object' ? preview : {}

    return {
      mask: <EyeOutlined />,
      icons,
      ..._preview
    }
  }, [preview])

  return (
    <RcImage
      previewPrefixCls={classNames(getClassNames('image'), 'rc-image-preview')}
      preview={mergedPreview}
      fallback={fallback}
      {...otherProps}
    />
  )
}

export default Image
