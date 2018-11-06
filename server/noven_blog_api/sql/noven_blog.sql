/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : noven_blog

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-04-22 16:14:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for nb_arcticles
-- ----------------------------
DROP TABLE IF EXISTS `nb_arcticles`;
CREATE TABLE `nb_arcticles` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `Title` varchar(255) NOT NULL COMMENT '文章标题',
  `Author` char(20) NOT NULL COMMENT '作者名',
  `Brief` text COMMENT '文章简介',
  `Content` text NOT NULL COMMENT '文章内容',
  `CreateTime` datetime NOT NULL COMMENT '创建时间',
  `ReadCount` int(10) unsigned DEFAULT NULL COMMENT '点击率',
  `ThumbUrl` varchar(255) DEFAULT NULL COMMENT '文章缩略图',
  `Url` varchar(255) DEFAULT NULL,
  `AuthorId` int(10) unsigned NOT NULL COMMENT '所属用户ID',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_arcticles
-- ----------------------------
INSERT INTO `nb_arcticles` VALUES ('0000000001', '天高任鸟飞', 'noven', '这是天高任鸟飞的简介', '这是天高任鸟飞的内容', '2018-04-27 13:53:03', '2', null, null, '1');
INSERT INTO `nb_arcticles` VALUES ('0000000002', '1', '2', '3', '3', '2018-04-22 11:22:30', '1', null, null, '2');
INSERT INTO `nb_arcticles` VALUES ('0000000009', '3', '2', '3', '3', '2018-04-22 11:22:30', '7', '', '', '3');
INSERT INTO `nb_arcticles` VALUES ('0000000008', '4', '2', '3', '3', '2018-04-22 11:22:30', '2', '', '', '4');
INSERT INTO `nb_arcticles` VALUES ('0000000003', '5', '2', '3', '3', '2018-04-22 11:22:30', '5', '', '', '2');
INSERT INTO `nb_arcticles` VALUES ('0000000005', '6', '2', '3', '3', '2018-04-22 11:22:30', '3', '', '', '2');
INSERT INTO `nb_arcticles` VALUES ('0000000004', '7', '2', '3', '3', '2018-04-22 11:22:30', '4', '', '', '2');
INSERT INTO `nb_arcticles` VALUES ('0000000010', '2016', '2', '2', '3', '2016-05-22 15:59:40', null, null, null, '1');

-- ----------------------------
-- Table structure for nb_banners
-- ----------------------------
DROP TABLE IF EXISTS `nb_banners`;
CREATE TABLE `nb_banners` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'banner图的ID',
  `Title` varchar(255) NOT NULL COMMENT 'banner的标题',
  `Type` tinyint(1) unsigned NOT NULL COMMENT '1 - 首页  2 - 用户',
  `Url` varchar(255) DEFAULT NULL COMMENT 'banner地址',
  `Link` varchar(255) DEFAULT NULL COMMENT 'banner对应的超链接',
  `CreateTime` datetime DEFAULT NULL COMMENT '创建时间',
  `IsShow` tinyint(1) unsigned NOT NULL COMMENT ' 0 - 前台不展示     1 - 前台展示',
  `UserId` int(10) unsigned DEFAULT NULL COMMENT '所属用户id，如果有该数据，则是用户的banner',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_banners
-- ----------------------------
INSERT INTO `nb_banners` VALUES ('0000000001', '第一个banner', '1', null, null, '2018-04-28 15:24:15', '0', null);
INSERT INTO `nb_banners` VALUES ('0000000002', '第二个banner', '1', null, null, '2018-04-28 15:28:53', '1', null);
INSERT INTO `nb_banners` VALUES ('0000000003', '第三个banner', '2', null, null, '2018-04-28 15:28:58', '0', '1');
INSERT INTO `nb_banners` VALUES ('0000000004', '第四个banner', '2', null, null, '2018-04-28 15:29:00', '1', '1');

-- ----------------------------
-- Table structure for nb_files
-- ----------------------------
DROP TABLE IF EXISTS `nb_files`;
CREATE TABLE `nb_files` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `FileName` varchar(255) NOT NULL COMMENT '文件名',
  `Extension` char(10) DEFAULT NULL COMMENT '文件拓展名',
  `FileSize` int(11) DEFAULT NULL COMMENT '文件大小',
  `Url` varchar(255) DEFAULT NULL COMMENT '文件在服务器上的绝对路径',
  `CreateTime` datetime NOT NULL COMMENT '上传时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_files
-- ----------------------------

-- ----------------------------
-- Table structure for nb_moods
-- ----------------------------
DROP TABLE IF EXISTS `nb_moods`;
CREATE TABLE `nb_moods` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '心情id',
  `Content` varchar(255) NOT NULL COMMENT '心情内容',
  `Author` char(20) NOT NULL COMMENT '作者名称',
  `AuthorId` int(10) unsigned NOT NULL COMMENT '作者ID',
  `CreateTime` datetime NOT NULL COMMENT '创建时间',
  `ReadCount` int(10) unsigned DEFAULT NULL COMMENT '点击率',
  `Url` varchar(255) DEFAULT NULL COMMENT '原图',
  `ThumbUrl` varchar(255) DEFAULT NULL COMMENT '缩略图',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_moods
-- ----------------------------
INSERT INTO `nb_moods` VALUES ('0000000001', '这是测试心情', '心情的作者', '1', '2018-04-22 10:54:14', '1', '', '');
INSERT INTO `nb_moods` VALUES ('0000000002', 'wrrrr', 'weee', '1', '2018-04-21 10:55:44', '2', null, null);
INSERT INTO `nb_moods` VALUES ('0000000003', '233', '44', '1', '2018-03-20 14:07:43', '1', null, null);
INSERT INTO `nb_moods` VALUES ('0000000004', '2017', '2', '1', '2017-04-14 15:42:43', '1', null, null);
INSERT INTO `nb_moods` VALUES ('0000000005', '2017', '3', '1', '2017-03-09 15:44:01', '2', null, null);

-- ----------------------------
-- Table structure for nb_tags
-- ----------------------------
DROP TABLE IF EXISTS `nb_tags`;
CREATE TABLE `nb_tags` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `Title` char(20) NOT NULL COMMENT '标签题目',
  `CreateTime` datetime NOT NULL COMMENT '创建日期',
  `UserId` int(10) unsigned DEFAULT NULL COMMENT '用户ID，如果有该数据，则表示是用户的标签，没有则是文章的标签',
  `ArcTicleId` int(10) unsigned DEFAULT NULL COMMENT '所属文章id',
  `Type` tinyint(1) unsigned NOT NULL COMMENT '1 - 用户标签   2 - 文章标签',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_tags
-- ----------------------------
INSERT INTO `nb_tags` VALUES ('0000000001', '感性', '2018-04-28 14:50:09', '1', null, '1');
INSERT INTO `nb_tags` VALUES ('0000000002', '听风', '2018-04-28 14:50:47', null, '1', '2');

-- ----------------------------
-- Table structure for nb_users
-- ----------------------------
DROP TABLE IF EXISTS `nb_users`;
CREATE TABLE `nb_users` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `NickName` char(20) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `Account` char(20) NOT NULL DEFAULT '' COMMENT '用户的账号，可以是手机号、邮箱、个性化账号',
  `CreateTime` datetime DEFAULT NULL COMMENT '创建时间',
  `Status` tinyint(10) NOT NULL DEFAULT '1' COMMENT '1 - 正常 2 - 锁定',
  `UserType` tinyint(10) DEFAULT '1' COMMENT '1 - 普通用户  2 - 管理员  3 - 超级管理员',
  `Password` char(64) NOT NULL DEFAULT '' COMMENT '用户密码',
  `LastTime` datetime DEFAULT NULL COMMENT '上次登录时间',
  `LastIp` varchar(255) DEFAULT NULL COMMENT '上次登录IP',
  `ThisTime` datetime DEFAULT NULL COMMENT '本次登录时间',
  `ThisIp` varchar(255) DEFAULT NULL COMMENT '本次登录IP',
  `Sex` char(4) DEFAULT NULL COMMENT '值有 男-女-不详',
  `Age` tinyint(3) unsigned DEFAULT '0' COMMENT '年龄，限制3位数以内',
  `Introduction` varchar(255) DEFAULT NULL COMMENT '个人简介',
  `CoverUrl` varchar(255) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_users
-- ----------------------------
INSERT INTO `nb_users` VALUES ('0000000001', '站长noven', 'admin', '2018-04-09 22:48:33', '1', '3', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-04-26 17:02:17', '127.0.0.1', '2018-04-28 17:02:42', '127.0.0.1', null, '0', null, null);
INSERT INTO `nb_users` VALUES ('0000000002', '雨之辰', '15181617073', '2018-04-10 21:24:58', '1', '2', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-04-10 21:29:08', '127.0.0.1', '2018-04-17 17:00:41', '127.0.0.1', null, '0', null, null);
INSERT INTO `nb_users` VALUES ('0000000003', '用户1', 'user', '2018-04-09 21:26:09', '1', '1', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-04-08 21:26:18', '127.0.0.1', '2018-04-09 21:25:38', '127.0.0.1', null, '0', null, null);
