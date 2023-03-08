import React, { isValidElement } from 'react'
import { List, Avatar } from 'antd'
import { isPlainObject, isString, isFunction } from 'lodash'
import { renderButton } from '../Table/Render'

const defaultActionConfig = {
  visible: true // 显示|隐藏
}

const defaultRenderItem = item => {
  if (!isValidElement(item) && isPlainObject(item)) {
    return <List.Item>{JSON.stringify(item)}</List.Item>
  }
  return <List.Item>{item}</List.Item>
}

const getActionsNode = actions => {
  return (actions || []).map(v => {
    if (!isValidElement(v) && isPlainObject(v)) {
      return renderButton({ ...defaultActionConfig, ...v })
    }
    return v
  })
}

const getAvatarNode = avatar => {
  if (!avatar) {
    return null
  }
  if (isValidElement(avatar)) {
    return avatar
  }
  if (isString(avatar)) {
    return <Avatar src={avatar} />
  }
  if (isPlainObject(avatar)) {
    return <Avatar {...avatar} />
  }
  return avatar
}

const getMetaNode = meta => {
  if (meta) {
    const { avatar, ...metaProps } = meta
    metaProps.avatar = getAvatarNode(avatar)
    return <List.Item.Meta {...metaProps} />
  }
  return null
}

export const getRenderItem = renderItem => {
  return (item, index) => {
    if (!isFunction(renderItem)) {
      return defaultRenderItem(item)
    }
    const { actions, extra, content, meta } = renderItem(item, index)
    return (
      <List.Item actions={getActionsNode(actions)} extra={extra}>
        {getMetaNode(meta)}
        {content}
      </List.Item>
    )
  }
}
