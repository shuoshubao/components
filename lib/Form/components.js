import { InputNumber, DatePicker, TimePicker, Radio, Rate } from 'antd'
import Input from './Input'
import NumberRange from './NumberRange'
import Select from './Select'
import Checkbox from './Checkbox'
import Tabs from './Tabs'
import Cascader from './Cascader'
import TreeSelect from './TreeSelect'
import AutoComplete from './AutoComplete'
import Switch from './Switch'
import Slider from './Slider'
import Upload from './Upload'
import ColorPicker from './ColorPicker'

// 内置组件
export default {
  input: Input,
  number: InputNumber,
  'number-range': NumberRange,
  radio: Radio.Group,
  checkbox: Checkbox,
  tabs: Tabs,
  select: Select,
  cascader: Cascader,
  'tree-select': TreeSelect,
  'date-picker': DatePicker,
  'date-range-picker': DatePicker.RangePicker,
  'time-picker': TimePicker,
  'time-range-picker': TimePicker.RangePicker,
  'auto-complete': AutoComplete,
  switch: Switch,
  rate: Rate,
  slider: Slider,
  upload: Upload,
  'color-picker': ColorPicker
}
