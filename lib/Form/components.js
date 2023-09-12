import { DatePicker, InputNumber, Radio, Rate, Segmented, TimePicker } from 'antd'
import AutoComplete from './AutoComplete'
import Cascader from './Cascader'
import Checkbox from './Checkbox'
import ColorPicker from './ColorPicker'
import Input from './Input'
import NumberRange from './NumberRange'
import Select from './Select'
import Slider from './Slider'
import Switch from './Switch'
import Tabs from './Tabs'
import TreeSelect from './TreeSelect'
import Upload from './Upload'

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
  segmented: Segmented,
  slider: Slider,
  upload: Upload,
  'color-picker': ColorPicker
}
