/* js 扩展方法 */
;(function(window) {
	"use strict";

	// trim正则
	var trimReg = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	// 至少一个数字且只能是数字的正则
	var numericReg = /^\d+$/;

	// 浮点数正则
	var floatReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;

	// 金额正则
	var moneyReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;

	// 手机号正则
	var mobileReg = /^1[0-9]{10}$/;

	// 电话正则
	var phoneReg = /^((010|02\d|0[3-9]\d{2})-?)?\d{6,8}(-?\d{1,6})?$/;

	// email正则
	var emailReg = /^([0-9a-zA-Z]+[_.0-9a-zA-Z-]+)@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2,3})$/;

	// trim
	String.prototype.trim = function() {
		return this.replace(trimReg, "");
	}

	/**
	 * 判断是否为空
	 */
	String.prototype.isBlank = function() {
		return this.trim().length == 0;
	};

	/**
	 * 判断是否为空
	 */
	String.prototype.isNotBlank = function() {
		return !this.isBlank();
	};

	/**
	 * 判断是否是数字
	 */
	String.prototype.isNumeric = function() {
		return numericReg.test(this);
	};

	/**
	 * 判断是否是数字
	 */
	String.prototype.isNotNumeric = function() {
		return !this.isNumeric();
	};

	/**
	 * 判断是否是浮点数
	 */
	String.prototype.isFloat = function() {
		return floatReg.test(this);
	};

	/**
	 * 判断是否是浮点数
	 */
	String.prototype.isNotFloat = function() {
		return !this.isFloat();
	};

	/**
	 * 判断是否是金额
	 */
	String.prototype.isMoney = function() {
		return moneyReg.test(this);
	};

	/**
	 * 判断是否是金额
	 */
	String.prototype.isNotMoney = function() {
		return !this.isMoney();
	};

	/**
	 * 判断是否是手机
	 */
	String.prototype.isMobile = function() {
		return mobileReg.test(this);
	};

	/**
	 * 判断是否是手机
	 */
	String.prototype.isNotMobile = function() {
		return !this.isMobile();
	};

	/**
	 * 判断是否是电话
	 */
	String.prototype.isPhone = function() {
		return phoneReg.test(this);
	};

	/**
	 * 判断是否是电话
	 */
	String.prototype.isNotPhone = function() {
		return !this.isPhone();
	};

	/**
	 * 判断是否是邮箱
	 */
	String.prototype.isEmail = function() {
		return emailReg.test(this);
	};

	/**
	 * 判断是否是邮箱
	 */
	String.prototype.isNotEmail = function() {
		return !this.isEmail();
	};

	/**
	 * 判断是否是身份证号
	 */
	String.prototype.isIdCard = function() {
		var idCard = this;
		var city = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江 ",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北 ",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏 ",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外 "
		};
		var tip = "";
		var pass = true;
		if (!idCard || !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idCard)) {
			tip = "身份证号格式错误";
			pass = false;
		} else if (!city[idCard.substr(0, 2)]) {
			tip = "地址编码错误";
			pass = false;
		} else {
			//18位身份证需要验证最后一位校验位
			if (idCard.length == 18) {
				idCard = idCard.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				//校验位
				var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = idCard[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != idCard[17]) {
					tip = "校验位错误";
					pass = false;
				}
			}
		}
		console.log(tip);
		return pass;
	};

	/**
	 * 判断是否是身份证号
	 */
	String.prototype.isNotIdCard = function() {
		return !this.isIdCard();
	};

	// contains
	String.prototype.contains = function(value) {
		return this.indexOf(value) >= 0;
	};

	// indexOf
	Array.prototype.indexOf = function(item) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == item) {
				return i;
			}
		}
		return -1;
	};

	// contains
	Array.prototype.contains = function(item) {
		return this.indexOf(item) >= 0;
	};

	/**
	 * 获取文件url
	 */
	File.prototype.getURL = function() {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(this);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(this);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(this);
		}
		return url;
	};

	/**
	 * 计算文件大小
	 */
	File.prototype.getFormatSize = function() {
		return formatFileSize(this.size);
	};

	/**
	 * 获取文件扩展名
	 */
	File.prototype.getExtName = function() {
		return getFileExtName(this.name);
	};

	/**
	 * 获取文件扩展名带“.”
	 */
	File.prototype.getShortName = function() {
		var fileName = this.name;
		var lastIndex = fileName.lastIndexOf(".");
		if (lastIndex < 0 || lastIndex == fileName.length - 1) {
			return fileName;
		}
		return fileName.substring(0, lastIndex);
	};

	/**
	 * 格式化文件大小
	 */
	window.formatFileSize = function(size) {
		if (isNaN(Number(size))) {
			return size;
		}
		size = Number(size);
		if (size < 1024) {
			return size.toFixed(2) * 1.0 + "B";
		} else if (size < 1024 * 1024) {
			return (size / 1024).toFixed(2) * 1.0 + "KB";
		} else {
			return (size / 1024 / 1024).toFixed(2) * 1.0 + "MB";
		}
	};

	/**
	 * 获取文件扩展名
	 */
	window.getFileExtName = function(fileName) {
		var lastIndex = fileName.lastIndexOf(".");
		if (lastIndex < 0 || lastIndex == fileName.length - 1) {
			return null;
		}
		return fileName.substring(lastIndex + 1).toLowerCase();
	};

})(window);