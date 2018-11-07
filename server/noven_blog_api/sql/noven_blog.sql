/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : noven_blog

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-11-07 22:08:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for nb_appcode
-- ----------------------------
DROP TABLE IF EXISTS `nb_appcode`;
CREATE TABLE `nb_appcode` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '平台id',
  `AppCode` tinyint(3) unsigned NOT NULL COMMENT '平台类型码 1 - PC  2 - h5  3 - 小程序  4 - admin ',
  `PlatForm` char(20) NOT NULL COMMENT '平台类型appCode的注解 1 - PC  2 - h5  3 - 小程序  4 - admin ',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_appcode
-- ----------------------------
INSERT INTO `nb_appcode` VALUES ('0000000001', '1', 'PC');
INSERT INTO `nb_appcode` VALUES ('0000000002', '2', 'h5');
INSERT INTO `nb_appcode` VALUES ('0000000003', '3', 'weixinMini');
INSERT INTO `nb_appcode` VALUES ('0000000004', '4', 'admin');

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
  `Url` varchar(255) DEFAULT NULL COMMENT '文章原图',
  `AuthorId` int(10) unsigned NOT NULL COMMENT '所属用户ID',
  `CollectCount` int(10) unsigned zerofill DEFAULT NULL COMMENT '收藏量',
  `IsUpShelf` tinyint(3) NOT NULL DEFAULT '1' COMMENT '是否上下架  -1  - 下架   1 - 上架',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_arcticles
-- ----------------------------
INSERT INTO `nb_arcticles` VALUES ('0000000018', '标题标题标题标题标题标题标题图', 'sdsads', '简介', '这是一个段落。', '2018-11-01 08:45:48', '24', null, null, '15', '0000000000', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000009', '3', '2', '3', '3', '2018-04-22 11:22:30', '22', 'http://pic.90sjimg.com/design/00/01/07/87/55f29aaa9052b.jpg', 'http://pic.90sjimg.com/design/00/01/07/87/55f29aaa9052b.jpg', '3', '0000000002', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000008', '4', '2', '3', '3', '2018-04-22 11:22:30', '4', 'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/02/90/2729aba7c1a9d8e67dc247e38a5b11a5.jpg', 'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/02/90/2729aba7c1a9d8e67dc247e38a5b11a5.jpg', '4', '0000000003', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000003', '5', '2', '3', '3', '2018-04-22 11:22:30', '7', 'http://pic.qiantucdn.com/58pic/12/47/52/49n58PICjba.jpg', 'http://pic.qiantucdn.com/58pic/12/47/52/49n58PICjba.jpg', '2', '0000000004', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000005', '6', '2', '3', '3', '2018-04-22 11:22:30', '5', 'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/02/47/87d2611fca422b97135de017f009d72a.jpg', 'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/02/47/87d2611fca422b97135de017f009d72a.jpg', '2', '0000000004', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000010', '2016', '2', '2', '3', '2016-05-22 15:59:40', '61', 'http://pic.qiantucdn.com/58pic/19/56/46/64458PICZaU_1024.jpg', 'http://pic.qiantucdn.com/58pic/19/56/46/64458PICZaU_1024.jpg', '1', '0000000006', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000013', '标题标题标题', '作者姓名', '', '文章内容', '2018-10-30 16:18:40', '1', null, null, '100', '0000000000', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000014', '2212', '作者姓名', '12231', '111111', '2018-10-30 16:20:06', '6', null, null, '100', '0000000001', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000012', '标题标题', '作者姓名', '', '文章内容', '2018-10-30 16:17:43', '3', null, null, '100', '0000000001', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000022', '单人照', 'sdsads', '这是一张单人照啊！', '单人照文章的段落。', '2018-11-02 14:49:08', '5', null, 'http://novenblog_api.com/images/ZaiPHskQa0z697rE_photo_1541141292.jpeg', '15', '0000000002', '-1');
INSERT INTO `nb_arcticles` VALUES ('0000000011', '测试文章1', 'sdsads', null, '[{\"type\":\"text\",\"value\":\"这是一段文本\"},{\"type\":\"text\",\"value\":\"这是另外xxx一段文本\"},{\"type\":\"img\",\"value\":\"http://img.php.cn/upload/article/000/000/003/5bc825b5a58de149.jpg\",\"desc\":\"这是一张图片\"}]', '2018-10-29 22:45:16', '62', null, null, '15', '0000000000', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000021', '1212', 'sdsads', '1111111111111111111', '222222222222222222222', '2018-11-02 14:46:12', '4', null, 'http://novenblog_api.com/images/AVQGEezcUup_62RB_photo_1541141152.jpeg', '15', '0000000001', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000020', '我修改了文章的标题', 'sdsads', '简介', '这是一个段落。', '2018-11-01 12:55:35', '27', null, null, '15', '0000000002', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000023', '单人照222', 'sdsads', '这是一张单人照2222啊！', '[{\"type\":\"text\",\"value\":\"单人照文章的段落22222。\"},{\"type\":\"img\",\"value\":\"http://novenblog_api.com/images/oGR_zMTUPaVpSdoQ_photo_1541141484.jpeg\",\"desc\":\"单人照2222的照片描述。\"}]', '2018-11-02 14:51:50', '6', null, 'http://novenblog_api.com/images/ZaiPHskQa0z697rE_photo_1541141292.jpeg', '15', '0000000002', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000024', '双认照', 'sdsads', '双人照简介。', '[{\"type\":\"text\",\"value\":\"双人照段落。\"},{\"type\":\"img\",\"value\":\"http://novenblog_api.com/images/_1H9FqEvUhcNxVS6_photo_1541142198.jpeg\",\"desc\":\"双人照图片描述。\"}]', '2018-11-02 15:03:25', '11', null, 'http://novenblog_api.com/images/adgn6mp3Pzie7ap5_photo_1541142124.jpeg', '15', '0000000002', '1');
INSERT INTO `nb_arcticles` VALUES ('0000000025', '2222', '1111', null, '1233', '2018-11-06 22:13:36', '3', null, null, '15', '0000000000', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_banners
-- ----------------------------
INSERT INTO `nb_banners` VALUES ('0000000001', '第一个banner', '1', null, null, '2018-04-28 15:24:15', '1', null);
INSERT INTO `nb_banners` VALUES ('0000000002', '第二个banner', '1', null, null, '2018-04-28 15:28:53', '0', null);
INSERT INTO `nb_banners` VALUES ('0000000003', '第三个banner', '2', null, null, '2018-04-28 15:28:58', '1', '1');
INSERT INTO `nb_banners` VALUES ('0000000005', '111', '1', null, null, '2018-05-04 21:00:12', '1', null);
INSERT INTO `nb_banners` VALUES ('0000000006', '12', '1', '33333333', '111111111111111111111111111', '2018-05-04 21:02:16', '1', '0');
INSERT INTO `nb_banners` VALUES ('0000000007', '12', '2', '', '', '2018-05-04 21:04:11', '0', '0');
INSERT INTO `nb_banners` VALUES ('0000000008', '1', '1', '', '', '2018-05-04 21:07:58', '1', '0');
INSERT INTO `nb_banners` VALUES ('0000000009', '2', '1', null, null, '2018-05-04 21:08:21', '0', null);
INSERT INTO `nb_banners` VALUES ('0000000010', '3', '1', null, null, '2018-05-04 21:08:30', '1', null);
INSERT INTO `nb_banners` VALUES ('0000000011', '4', '1', null, null, '2018-05-04 21:09:01', '1', null);
INSERT INTO `nb_banners` VALUES ('0000000012', '5', '1', null, null, '2018-05-04 21:09:09', '1', null);

-- ----------------------------
-- Table structure for nb_collections
-- ----------------------------
DROP TABLE IF EXISTS `nb_collections`;
CREATE TABLE `nb_collections` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '收藏表id',
  `CollectionId` int(10) unsigned NOT NULL COMMENT '被收藏的资源id',
  `UserId` int(10) unsigned NOT NULL COMMENT '收藏用户id',
  `CollectionType` tinyint(3) unsigned NOT NULL COMMENT '1 - 文章      2 - 心情',
  `CreateTime` datetime NOT NULL COMMENT '收藏时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_collections
-- ----------------------------
INSERT INTO `nb_collections` VALUES ('0000000083', '23', '15', '1', '2018-11-05 23:32:28');
INSERT INTO `nb_collections` VALUES ('0000000076', '21', '15', '1', '2018-11-05 23:02:52');
INSERT INTO `nb_collections` VALUES ('0000000082', '24', '15', '1', '2018-11-05 23:32:20');
INSERT INTO `nb_collections` VALUES ('0000000079', '8', '15', '1', '2018-11-05 23:03:25');
INSERT INTO `nb_collections` VALUES ('0000000087', '9', '15', '1', '2018-11-06 12:47:59');
INSERT INTO `nb_collections` VALUES ('0000000081', '3', '15', '1', '2018-11-05 23:05:25');
INSERT INTO `nb_collections` VALUES ('0000000085', '20', '15', '1', '2018-11-05 23:32:48');
INSERT INTO `nb_collections` VALUES ('0000000086', '12', '15', '1', '2018-11-05 23:32:56');

-- ----------------------------
-- Table structure for nb_feedbacks
-- ----------------------------
DROP TABLE IF EXISTS `nb_feedbacks`;
CREATE TABLE `nb_feedbacks` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '意见反馈id',
  `UserId` int(10) unsigned NOT NULL COMMENT '反馈用户的id',
  `Text` text NOT NULL COMMENT '反馈的文本',
  `ImgUrls` text COMMENT '附加图片',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_feedbacks
-- ----------------------------
INSERT INTO `nb_feedbacks` VALUES ('0000000001', '0', 'ssadsd', null);
INSERT INTO `nb_feedbacks` VALUES ('0000000002', '0', 'ssadsd', null);
INSERT INTO `nb_feedbacks` VALUES ('0000000003', '0', 'ssadsd', null);
INSERT INTO `nb_feedbacks` VALUES ('0000000004', '15', 'ssadsd', null);
INSERT INTO `nb_feedbacks` VALUES ('0000000005', '15', '12', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_files
-- ----------------------------
INSERT INTO `nb_files` VALUES ('0000000001', 'P0vY1Du1ejnLCf0c_photo_1540909031.png', 'png', null, 'novenblog_api.com\\images\\P0vY1Du1ejnLCf0c_photo_1540909031.png', '2018-10-30 22:17:11');
INSERT INTO `nb_files` VALUES ('0000000002', 'HbIOBkkwWneRKzfJ_photo_1540909076.png', 'png', null, 'novenblog_api.com\\images\\HbIOBkkwWneRKzfJ_photo_1540909076.png', '2018-10-30 22:17:56');
INSERT INTO `nb_files` VALUES ('0000000003', 'GDKCNLwwHGXUtBSH_photo_1540909196.png', 'png', null, 'novenblog_api.com\\images\\GDKCNLwwHGXUtBSH_photo_1540909196.png', '2018-10-30 22:19:56');
INSERT INTO `nb_files` VALUES ('0000000004', '5xpwmCrTJ9ECKQnc_photo_1540909712.png', 'png', null, 'novenblog_api.com\\images\\5xpwmCrTJ9ECKQnc_photo_1540909712.png', '2018-10-30 22:28:32');
INSERT INTO `nb_files` VALUES ('0000000005', 'wVtBE7hfdCEaQaUP_photo_1540909720.png', 'png', null, 'novenblog_api.com\\images\\wVtBE7hfdCEaQaUP_photo_1540909720.png', '2018-10-30 22:28:40');
INSERT INTO `nb_files` VALUES ('0000000006', 'z1U93PZCjPZc1Lfo_photo_1540909726.png', 'png', null, 'novenblog_api.com\\images\\z1U93PZCjPZc1Lfo_photo_1540909726.png', '2018-10-30 22:28:46');
INSERT INTO `nb_files` VALUES ('0000000007', 'cPF_vKvW1KFIgxsX_photo_1540909905.jpeg', 'png', null, 'novenblog_api.com\\images\\cPF_vKvW1KFIgxsX_photo_1540909905.jpeg', '2018-10-30 22:31:45');
INSERT INTO `nb_files` VALUES ('0000000008', 'rlLD5UTcgnHFEyws_photo_1540909950.jpeg', 'png', null, 'novenblog_api.com\\images\\rlLD5UTcgnHFEyws_photo_1540909950.jpeg', '2018-10-30 22:32:30');
INSERT INTO `nb_files` VALUES ('0000000009', 'BdNkI8RXFMiVqMTA_photo_1540910038.jpeg', 'png', null, 'novenblog_api.com\\images\\BdNkI8RXFMiVqMTA_photo_1540910038.jpeg', '2018-10-30 22:33:58');
INSERT INTO `nb_files` VALUES ('0000000010', 'tcMPMHIYMjUPtE6N_photo_1540910087.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\tcMPMHIYMjUPtE6N_photo_1540910087.jpeg', '2018-10-30 22:34:47');
INSERT INTO `nb_files` VALUES ('0000000011', 'jOtFhnMPSrc60DwP_photo_1540910102.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\jOtFhnMPSrc60DwP_photo_1540910102.jpeg', '2018-10-30 22:35:02');
INSERT INTO `nb_files` VALUES ('0000000012', '90URh_5wVaeHYH-H_photo_1540910218.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\90URh_5wVaeHYH-H_photo_1540910218.jpeg', '2018-10-30 22:36:58');
INSERT INTO `nb_files` VALUES ('0000000013', 'WM3mL1z5Wv0DpR3p_photo_1540910351.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\WM3mL1z5Wv0DpR3p_photo_1540910351.jpeg', '2018-10-30 22:39:11');
INSERT INTO `nb_files` VALUES ('0000000014', 'G_UeHZisVqsWk88Z_photo_1540911020.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\G_UeHZisVqsWk88Z_photo_1540911020.jpeg', '2018-10-30 22:50:20');
INSERT INTO `nb_files` VALUES ('0000000015', 'VCfHfqQB1aG7g4D-_photo_1540911290.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\VCfHfqQB1aG7g4D-_photo_1540911290.jpeg', '2018-10-30 22:54:50');
INSERT INTO `nb_files` VALUES ('0000000016', 'NH6rYlbxJmg-aZ_h_photo_1540911443.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\NH6rYlbxJmg-aZ_h_photo_1540911443.jpeg', '2018-10-30 22:57:23');
INSERT INTO `nb_files` VALUES ('0000000017', 'WR-n5fao-UwPkZ4D_photo_1540911550.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\WR-n5fao-UwPkZ4D_photo_1540911550.jpeg', '2018-10-30 22:59:10');
INSERT INTO `nb_files` VALUES ('0000000018', 'ae6gLTvJIDCs6Ihq_photo_1540911864.jpeg', 'jpeg', null, 'novenblog_api.com\\images\\ae6gLTvJIDCs6Ihq_photo_1540911864.jpeg', '2018-10-30 23:04:24');
INSERT INTO `nb_files` VALUES ('0000000019', 'RCBgi-YzOB30zNN9_photo_1540912765.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\RCBgi-YzOB30zNN9_photo_1540912765.jpeg', '2018-10-30 23:19:25');
INSERT INTO `nb_files` VALUES ('0000000020', 'DN3fbBLlxc9ULQZU_photo_1540912942.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\DN3fbBLlxc9ULQZU_photo_1540912942.jpeg', '2018-10-30 23:22:22');
INSERT INTO `nb_files` VALUES ('0000000021', 'sbFNJu3z_tqGQkG7_photo_1540913243.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\sbFNJu3z_tqGQkG7_photo_1540913243.jpeg', '2018-10-30 23:27:23');
INSERT INTO `nb_files` VALUES ('0000000022', 'i4H7feKu8Imn9hym_photo_1540913261.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\i4H7feKu8Imn9hym_photo_1540913261.jpeg', '2018-10-30 23:27:41');
INSERT INTO `nb_files` VALUES ('0000000023', 'mO_iQ7FeRXzpvyJL_photo_1540913368.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\mO_iQ7FeRXzpvyJL_photo_1540913368.jpeg', '2018-10-30 23:29:28');
INSERT INTO `nb_files` VALUES ('0000000024', 'o8tr62eHSXEyIspn_photo_1540913377.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\o8tr62eHSXEyIspn_photo_1540913377.jpeg', '2018-10-30 23:29:37');
INSERT INTO `nb_files` VALUES ('0000000025', 'SAzzAatIcUOL8dCX_photo_1541126446.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\SAzzAatIcUOL8dCX_photo_1541126446.jpeg', '2018-11-02 10:40:46');
INSERT INTO `nb_files` VALUES ('0000000026', 'SO6TmFz1b6ha5oKt_photo_1541126565.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\SO6TmFz1b6ha5oKt_photo_1541126565.jpeg', '2018-11-02 10:42:45');
INSERT INTO `nb_files` VALUES ('0000000027', '97y1C0F9oUz4PglZ_photo_1541126882.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\97y1C0F9oUz4PglZ_photo_1541126882.jpeg', '2018-11-02 10:48:02');
INSERT INTO `nb_files` VALUES ('0000000028', 'csTvkB-lEGzBU2zm_photo_1541126899.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\csTvkB-lEGzBU2zm_photo_1541126899.jpeg', '2018-11-02 10:48:19');
INSERT INTO `nb_files` VALUES ('0000000029', 'K5CEuNrgVmqymhGJ_photo_1541126958.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\K5CEuNrgVmqymhGJ_photo_1541126958.jpeg', '2018-11-02 10:49:18');
INSERT INTO `nb_files` VALUES ('0000000030', 'GwMwcxP9NiohLgBb_photo_1541127078.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\GwMwcxP9NiohLgBb_photo_1541127078.jpeg', '2018-11-02 10:51:18');
INSERT INTO `nb_files` VALUES ('0000000031', 'Zr3BMfNI0Hrd0d8n_photo_1541131207.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\Zr3BMfNI0Hrd0d8n_photo_1541131207.jpeg', '2018-11-02 12:00:07');
INSERT INTO `nb_files` VALUES ('0000000032', 'gt9dvnJhPBj9WtmR_photo_1541131339.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\gt9dvnJhPBj9WtmR_photo_1541131339.jpeg', '2018-11-02 12:02:19');
INSERT INTO `nb_files` VALUES ('0000000033', 'BPnUaXk1yzAn5-dh_photo_1541131480.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\BPnUaXk1yzAn5-dh_photo_1541131480.jpeg', '2018-11-02 12:04:40');
INSERT INTO `nb_files` VALUES ('0000000034', '4PS4V1fPITxKbM_W_photo_1541131606.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\4PS4V1fPITxKbM_W_photo_1541131606.jpeg', '2018-11-02 12:06:46');
INSERT INTO `nb_files` VALUES ('0000000035', 'AGPqqBu1sVQM04VV_photo_1541131731.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\AGPqqBu1sVQM04VV_photo_1541131731.jpeg', '2018-11-02 12:08:51');
INSERT INTO `nb_files` VALUES ('0000000036', 'yw5YwuMWjvcrFVTB_photo_1541131859.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\yw5YwuMWjvcrFVTB_photo_1541131859.jpeg', '2018-11-02 12:10:59');
INSERT INTO `nb_files` VALUES ('0000000037', 'MzJYmOeEEsmfmUAS_photo_1541133690.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\MzJYmOeEEsmfmUAS_photo_1541133690.jpeg', '2018-11-02 12:41:30');
INSERT INTO `nb_files` VALUES ('0000000038', 'IXS5pYGYHM0_gJfI_photo_1541135165.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\IXS5pYGYHM0_gJfI_photo_1541135165.jpeg', '2018-11-02 13:06:05');
INSERT INTO `nb_files` VALUES ('0000000039', 'mGtfHY6Ssp59poV-_photo_1541135182.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\mGtfHY6Ssp59poV-_photo_1541135182.jpeg', '2018-11-02 13:06:22');
INSERT INTO `nb_files` VALUES ('0000000040', 'KKyxaOsmXpDdLVwc_photo_1541135315.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\KKyxaOsmXpDdLVwc_photo_1541135315.jpeg', '2018-11-02 13:08:35');
INSERT INTO `nb_files` VALUES ('0000000041', 'Q-6WUuPs_KFokg7R_photo_1541135330.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\Q-6WUuPs_KFokg7R_photo_1541135330.jpeg', '2018-11-02 13:08:50');
INSERT INTO `nb_files` VALUES ('0000000042', 'V1m-weeKHI-mLVcf_photo_1541135407.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\V1m-weeKHI-mLVcf_photo_1541135407.jpeg', '2018-11-02 13:10:07');
INSERT INTO `nb_files` VALUES ('0000000043', 'zO09sQAbh0AbnK7j_photo_1541135418.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\zO09sQAbh0AbnK7j_photo_1541135418.jpeg', '2018-11-02 13:10:18');
INSERT INTO `nb_files` VALUES ('0000000044', 'EW7oP29_5q-F8tE6_photo_1541135472.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\EW7oP29_5q-F8tE6_photo_1541135472.jpeg', '2018-11-02 13:11:12');
INSERT INTO `nb_files` VALUES ('0000000045', 'a2AYZoppIs839x-V_photo_1541140370.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\a2AYZoppIs839x-V_photo_1541140370.jpeg', '2018-11-02 14:32:50');
INSERT INTO `nb_files` VALUES ('0000000046', 'qtwDkCFh5PyulqFj_photo_1541140419.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\qtwDkCFh5PyulqFj_photo_1541140419.jpeg', '2018-11-02 14:33:39');
INSERT INTO `nb_files` VALUES ('0000000047', 'A4IieowmcK8dQxA7_photo_1541140655.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\A4IieowmcK8dQxA7_photo_1541140655.jpeg', '2018-11-02 14:37:35');
INSERT INTO `nb_files` VALUES ('0000000048', 'WNxISW4fuYJu9jFB_photo_1541140686.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\WNxISW4fuYJu9jFB_photo_1541140686.jpeg', '2018-11-02 14:38:06');
INSERT INTO `nb_files` VALUES ('0000000049', 'D0rjlr-S8DqYg4kP_photo_1541140833.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\D0rjlr-S8DqYg4kP_photo_1541140833.jpeg', '2018-11-02 14:40:33');
INSERT INTO `nb_files` VALUES ('0000000050', 'AVQGEezcUup_62RB_photo_1541141152.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\AVQGEezcUup_62RB_photo_1541141152.jpeg', '2018-11-02 14:45:52');
INSERT INTO `nb_files` VALUES ('0000000051', 'ZaiPHskQa0z697rE_photo_1541141292.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\ZaiPHskQa0z697rE_photo_1541141292.jpeg', '2018-11-02 14:48:12');
INSERT INTO `nb_files` VALUES ('0000000052', 'oGR_zMTUPaVpSdoQ_photo_1541141484.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\oGR_zMTUPaVpSdoQ_photo_1541141484.jpeg', '2018-11-02 14:51:24');
INSERT INTO `nb_files` VALUES ('0000000053', 'WMkIJ_--scSNThVF_photo_1541142038.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\WMkIJ_--scSNThVF_photo_1541142038.jpeg', '2018-11-02 15:00:38');
INSERT INTO `nb_files` VALUES ('0000000054', 'adgn6mp3Pzie7ap5_photo_1541142124.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\adgn6mp3Pzie7ap5_photo_1541142124.jpeg', '2018-11-02 15:02:04');
INSERT INTO `nb_files` VALUES ('0000000055', '_1H9FqEvUhcNxVS6_photo_1541142198.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\_1H9FqEvUhcNxVS6_photo_1541142198.jpeg', '2018-11-02 15:03:18');
INSERT INTO `nb_files` VALUES ('0000000056', '_oaIpvR5JveyifiM_photo_1541498363.jpeg', 'jpeg', null, 'http:\\\\novenblog_api.com\\images\\_oaIpvR5JveyifiM_photo_1541498363.jpeg', '2018-11-06 17:59:23');

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
INSERT INTO `nb_tags` VALUES ('0000000001', '感性', '2018-04-28 14:50:09', null, '10', '1');
INSERT INTO `nb_tags` VALUES ('0000000002', '听风', '2018-04-28 14:50:47', null, '10', '2');

-- ----------------------------
-- Table structure for nb_tokens
-- ----------------------------
DROP TABLE IF EXISTS `nb_tokens`;
CREATE TABLE `nb_tokens` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'token表id',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `token` varchar(255) NOT NULL COMMENT 'token字符串',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_tokens
-- ----------------------------
INSERT INTO `nb_tokens` VALUES ('0000000009', '11', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTM5OTU5OTQ5LCJleHBpcmVUaW1lIjoxNTM5OTY3MTQ5LCJ1aWQiOjExfQ.zSRTWRumftHru0H-d3of6RfYrqwNJ_oOBduMlxOGAe0');
INSERT INTO `nb_tokens` VALUES ('0000000010', '12', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTM5OTU5OTc1LCJleHBpcmVUaW1lIjoxNTM5OTY3MTc1LCJ1aWQiOiIxMiJ9.Tjf6vnCtf_CFPB4QBTKk_yiQKYeX1-C5DKPo24Lf1v0');
INSERT INTO `nb_tokens` VALUES ('0000000011', '13', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTM5OTYxODg4LCJleHBpcmVUaW1lIjoxNTM5OTY5MDg4LCJ1aWQiOjEzfQ.aV9L3Ck8j4574o3eNEykuLFuDw013Al7Mk9_eVpFwU0');
INSERT INTO `nb_tokens` VALUES ('0000000012', '14', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTM5OTYxOTMxLCJleHBpcmVUaW1lIjoxNTM5OTY5MTMxLCJ1aWQiOiIxNCJ9.e40F4Ang3tTnrlgF6WXb0ugyO6jdqqQwVKXt9JibMFo');
INSERT INTO `nb_tokens` VALUES ('0000000016', '15', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTQxNTk1NjMwLCJleHBpcmVUaW1lIjoxNTQxNjAyODMwLCJ1aWQiOjE1fQ.T54irVOFMQX4PDEIPULOIbn9YsQB0E1WZgz1IeJ_zks');
INSERT INTO `nb_tokens` VALUES ('0000000014', '1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTQxNTk3NDMwLCJleHBpcmVUaW1lIjoxNTQxNjA0NjMwLCJ1aWQiOjF9.iozYLbFTXXk5Y9AuOEfQphjJyiIosU5hiEB6zJBnpUQ');
INSERT INTO `nb_tokens` VALUES ('0000000015', '3', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTQxNTk4MDI1LCJleHBpcmVUaW1lIjoxNTQxNjA1MjI1LCJ1aWQiOjN9.dSnNadRaVeHHfKAGA4NNk9DdAW7uoO-zz5Lz10B2TIw');
INSERT INTO `nb_tokens` VALUES ('0000000017', '2', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNTQxNTk3MzAwLCJleHBpcmVUaW1lIjoxNTQxNjA0NTAwLCJ1aWQiOjJ9.T4vQzPoeJb0_VfZbI_t4zOuFOEuibNl1BDLsQI8jxrk');

-- ----------------------------
-- Table structure for nb_users
-- ----------------------------
DROP TABLE IF EXISTS `nb_users`;
CREATE TABLE `nb_users` (
  `Id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `NickName` char(20) DEFAULT '' COMMENT '用户昵称',
  `Account` char(20) DEFAULT '' COMMENT '用户的账号，可以是手机号、邮箱、个性化账号',
  `CreateTime` datetime DEFAULT NULL COMMENT '创建时间',
  `Status` tinyint(10) DEFAULT '1' COMMENT '1 - 正常 2 - 锁定',
  `UserType` tinyint(10) DEFAULT '1' COMMENT '1 - 普通用户  2 - 管理员  3 - 超级管理员',
  `Password` char(64) DEFAULT '' COMMENT '用户密码',
  `LastTime` datetime DEFAULT NULL COMMENT '上次登录时间',
  `LastIp` varchar(255) DEFAULT NULL COMMENT '上次登录IP',
  `ThisTime` datetime DEFAULT NULL COMMENT '本次登录时间',
  `ThisIp` varchar(255) DEFAULT NULL COMMENT '本次登录IP',
  `Sex` char(4) DEFAULT NULL COMMENT '值有 男-女-不详',
  `Age` tinyint(3) unsigned DEFAULT '0' COMMENT '年龄，限制3位数以内',
  `Introduction` varchar(255) DEFAULT NULL COMMENT '个人简介',
  `CoverUrl` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `OpenId` varchar(255) DEFAULT NULL COMMENT '第三方登录的openId',
  `Province` varchar(50) DEFAULT NULL COMMENT '用户所在省份',
  `City` varchar(50) DEFAULT NULL COMMENT '用户所在城市',
  `Address` varchar(255) NOT NULL COMMENT '用户详细地址',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nb_users
-- ----------------------------
INSERT INTO `nb_users` VALUES ('0000000001', '站长noven', 'admin', '2018-04-09 22:48:33', '1', '3', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-11-06 22:01:01', '127.0.0.1', '2018-11-07 21:30:30', '127.0.0.1', null, '0', null, null, null, null, null, '');
INSERT INTO `nb_users` VALUES ('0000000002', '雨之辰', '15181617073', '2018-04-10 21:24:58', '1', '2', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-11-07 21:28:21', '192.168.1.7', '2018-11-07 21:30:23', '192.168.1.7', null, '0', null, null, null, null, null, '');
INSERT INTO `nb_users` VALUES ('0000000003', 'aaa111', 'user', '2018-04-09 21:26:09', '1', '1', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-10-22 23:03:25', '127.0.0.1', '2018-11-07 21:40:25', '127.0.0.1', null, '20', null, null, null, null, null, '');
INSERT INTO `nb_users` VALUES ('0000000015', 'sdsads', 'iaHIZ0VmRSr2uxC_', '2018-11-07 22:07:18', '1', '1', '7C4A8D09CA3762AF61E59520943DC26494F8941B', '2018-11-07 21:00:46', '192.168.1.7', '2018-11-07 21:32:05', '127.0.0.1', '0', '18', '我的简介，啦啦啦，哈哈哈！', 'http://novenblog_api.com/images/o8tr62eHSXEyIspn_photo_1540913377.jpeg', 'ohi0v5aKQjVghOxe8_jkf333SmlI', '四川省', '成都市', '高新西区');
