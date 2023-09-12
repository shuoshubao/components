import { Avatar, List } from 'antd'
import { isFunction, isPlainObject, isString } from 'lodash'
import { isValidElement } from 'react'
import { renderButton } from '../Table/Render'

const { Item } = List
const { Meta } = Item

const defaultActionConfig = {
  visible: true // 显示|隐藏
}

const defaultRenderItem = item => {
  if (!isValidElement(item) && isPlainObject(item)) {
    return <Item>{JSON.stringify(item)}</Item>
  }
  return <Item>{item}</Item>
}

const getActionsNode = actions => {
  return [].concat(actions).map(v => {
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
    return <Meta {...metaProps} />
  }
  return null
}

export const getRenderItem = renderItem => {
  return (item, index) => {
    if (!isFunction(renderItem)) {
      return defaultRenderItem(item)
    }
    const result = renderItem(item, index, Item)
    if (isValidElement(result)) {
      if (result.type === Item) {
        return result
      }
      return <Item>{result}</Item>
    }
    const { actions, extra, content, meta } = result
    return (
      <Item actions={getActionsNode(actions)} extra={extra}>
        {getMetaNode(meta)}
        {content}
      </Item>
    )
  }
}
