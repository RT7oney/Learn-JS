/**
 * 封装弹窗的方法
 * @example 
 * import layer from './services/layer'
 */

import layer from 'layer.mobile'
import layerStyle from '../css/layer.scss'

function extend (obj0, obj1) {
  for(var o in obj1) {
    obj0[o] = obj1[o];
  }
  return obj0;
}

export default {
  /**
   * loaing
   * @param {Bool|true} shadeClose 是否点击隐藏
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  loading(shadeClose) {
    return layer.open({
      type: 2,
      shadeClose: shadeClose != false,
    });
  },
  /**
   * 提示
   * @param {String} message 消息内容
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  tip(message) {
    return layer.open({
      content: message,
      time: 3,
    });
  },
  /**
   * 提示消息，带 title 和 按钮
   * @param {String} message 提示信息内容
   * @param {String} option 配置信息，可覆盖默认配置
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  message(message, option) {
    return layer.open(extend({
      title: '提示',
      content: message,
      btn: ['确定', '取消'],
    }, option));
  },
  /**
   * 打印警告消息
   * @param {String} message
   * @param {String} option 配置信息，可覆盖默认配置
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  warning(message, option) {
    return layer.open(extend({
      content: message,
      btn: ['确定'],
    }, option));
  },
  /**
   * 手动关闭弹窗
   * @param {Number} index 要被关闭的弹窗的序号，如果序号小于 0 则关闭全部弹窗
   */
  close(index) {
    index >= 0 ? layer.close(index) : layer.closeAll();
  },
}