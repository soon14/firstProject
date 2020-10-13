/* 基于extend.js的jquery扩展js */
;(function(window, $) {
	"use strict";

	/**
	 * 获取去除前后空格后的value
	 */
	$.fn.trimVal = function() {
		return $.trim(this.val());
	};

	/**
	 * 判断是否为空
	 */
	$.fn.isBlank = function() {
		return this.trimVal().isBlank();
	};

	/**
	 * 判断是否为空
	 */
	$.fn.isNotBlank = function() {
		return !this.isBlank();
	};

	/**
	 * 判断是否是数字
	 */
	$.fn.isNumeric = function() {
		return this.trimVal().isNumeric();
	};

	/**
	 * 判断是否是数字
	 */
	$.fn.isNotNumeric = function() {
		return !this.isNumeric();
	};

	/**
	 * 判断是否是浮点数
	 */
	$.fn.isFloat = function() {
		return this.trimVal().isFloat();
	};

	/**
	 * 判断是否是浮点数
	 */
	$.fn.isNotFloat = function() {
		return !this.isFloat();
	};

	/**
	 * 判断是否是金额
	 */
	$.fn.isMoney = function() {
		return this.trimVal().isMoney();
	};

	/**
	 * 判断是否是金额
	 */
	$.fn.isNotMoney = function() {
		return !this.isMoney();
	};

	/**
	 * 判断是否是手机
	 */
	$.fn.isMobile = function() {
		return this.trimVal().isMobile();
	};

	/**
	 * 判断是否是手机
	 */
	$.fn.isNotMobile = function() {
		return !this.isMobile();
	};

	/**
	 * 判断是否是电话
	 */
	$.fn.isPhone = function() {
		return this.trimVal().isPhone();
	};

	/**
	 * 判断是否是电话
	 */
	$.fn.isNotPhone = function() {
		return !this.isPhone();
	};

	/**
	 * 判断是否是邮箱
	 */
	$.fn.isEmail = function() {
		return this.trimVal().isEmail();
	};

	/**
	 * 判断是否是邮箱
	 */
	$.fn.isNotEmail = function() {
		return !this.isEmail();
	};

	/**
	 * 判断是否是身份证号
	 */
	$.fn.isIdCard = function() {
		return this.trimVal().isIdCard();
	};

	/**
	 * 判断是否是身份证号
	 */
	$.fn.isNotIdCard = function() {
		return !this.isIdCard();
	};

	/**
	 * 判断是否超过最小长度限制
	 * 如果长度不是正确的数字，则返回false
	 */
	$.fn.overMinLength = function(min) {
		if ((min + "").isNotNumeric()) {
			return false;
		}
		return this.trimVal().length < min;
	};

	/**
	 * 判断是否超过最大长度限制
	 * 如果长度不是正确的数字，则返回false
	 */
	$.fn.overMaxLength = function(max) {
		if ((max + "").isNotNumeric()) {
			return false;
		}
		return this.trimVal().length > max;
	};

	/**
	 * 判断是否介于两个长度之间
	 * 如果长度不是正确的数字，则返回false
	 */
	$.fn.lengthBetween = function(min, max) {
		return !(this.overMinLength(min) || this.overMaxLength(max));
	};

})(window, window.jQuery);