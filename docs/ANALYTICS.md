# DrawnKit 流量分析使用说明

## 查看每日访客

打开 Vercel 项目后台：

`https://vercel.com/401040990-qqcoms-projects/drawnkit/analytics`

面板可查看：

- Visitors：指定日期范围内的独立访客
- Page Views：页面浏览总次数
- 每日、每周和每月访问趋势
- Top Pages：访问量最高的页面
- Referrers：Google、X、Reddit 等流量来源
- Countries：访客国家和地区
- Devices：设备、系统和浏览器

新接入后只统计部署完成之后的访问，不会补录历史流量。数据可能需要几分钟才会显示。

## 查看真实用户性能

打开：

`https://vercel.com/401040990-qqcoms-projects/drawnkit/speed-insights`

重点关注：

- LCP：主要内容出现速度，目标小于 2.5 秒
- INP：点击后的响应速度，目标小于 200 毫秒
- CLS：页面布局跳动，目标小于 0.1

## 已配置的转化事件

- `prompt_copied`：用户复制 Prompt，记录风格、模型和剪贴板结果
- `checkout_started`：用户点击购买
- `checkout_failed`：支付因超时、弹窗阻止或服务不可用而失败

事件属性不包含 Prompt 原文、邮箱、订单号或付款信息。

## 发布链接时使用 UTM

示例：

```text
https://drawnkit.vercel.app/?utm_source=x&utm_medium=social&utm_campaign=launch
```

建议不同渠道分别使用：

- X：`utm_source=x`
- Reddit：`utm_source=reddit`
- Product Hunt：`utm_source=producthunt`
- GitHub：`utm_source=github`

这样可以在 Referrers/Campaigns 中比较各渠道带来的真实访客。
