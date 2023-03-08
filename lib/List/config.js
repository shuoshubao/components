import React, { isValidElement } from 'react'
import { List, Avatar } from 'antd'
import { isPlainObject, isString } from 'lodash'
import { renderButton } from '../Table/Render'

const defaultActionConfig = {
  visible: true // 显示|隐藏
}

export const defaultRenderItem = item => {
  if (!isValidElement(item) && isPlainObject(item)) {
    return <List.Item>{JSON.stringify(item)}</List.Item>
  }
  return <List.Item>{item}</List.Item>
}

export const getActionsNode = actions => {
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

export const getMetaNode = meta => {
  if (meta) {
    const { avatar, ...metaProps } = meta
    metaProps.avatar = getAvatarNode(avatar)
    return <List.Item.Meta {...metaProps} />
  }
  return null
}
