---
title: "openclaw都还没用明白，就有 openclaw RL了"
date: "2026-03-12"
lastmod: "2026-03-12T12:33:00.000Z"
draft: false
series: []
tags:
  - "开源"
categories:
  - "技术"
summary: "OpenClaw-RL 登上 HuggingFace Daily Papers 第一，它在说：AI Agent
  每天都在扔掉它最需要的训练数据。二值强化学习、OPD 事后指导蒸馏，边用边训。"
authors:
  - "Blog"
NOTION_METADATA:
  object: "page"
  id: "32193dc3-968c-816d-8661-d6e48c5fee26"
  created_time: "2026-03-12T12:28:00.000Z"
  last_edited_time: "2026-03-12T12:33:00.000Z"
  created_by:
    object: "user"
    id: "90b94823-f51a-486f-9c1b-be7444b2c4f6"
  last_edited_by:
    object: "user"
    id: "90b94823-f51a-486f-9c1b-be7444b2c4f6"
  cover: null
  icon: null
  parent:
    type: "database_id"
    database_id: "28393dc3-968c-8157-9edc-c528b069ca6f"
  in_trash: false
  is_locked: false
  properties:
    series:
      id: "B%3C%3FS"
      type: "multi_select"
      multi_select: []
    date:
      id: "C%3CqD"
      type: "date"
      date:
        start: "2026-03-12"
        end: null
        time_zone: null
    draft:
      id: "JiWU"
      type: "checkbox"
      checkbox: false
    authors:
      id: "bK%3B%5B"
      type: "people"
      people: []
    custom-front-matter:
      id: "c~kA"
      type: "rich_text"
      rich_text: []
    tags:
      id: "jw%7CC"
      type: "multi_select"
      multi_select:
        - id: "cffc7874-1501-4d26-9c6d-d28b1fc4d225"
          name: "开源"
          color: "pink"
    categories:
      id: "nbY%3F"
      type: "multi_select"
      multi_select:
        - id: "2df927de-e471-4f86-9001-37b594f12911"
          name: "技术"
          color: "gray"
    Last edited time:
      id: "vbGE"
      type: "last_edited_time"
      last_edited_time: "2026-03-12T12:33:00.000Z"
    summary:
      id: "x%3AlD"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "OpenClaw-RL 登上 HuggingFace Daily Papers 第一，它在说：AI Agent
              每天都在扔掉它最需要的训练数据。二值强化学习、OPD 事后指导蒸馏，边用边训。"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "OpenClaw-RL 登上 HuggingFace Daily Papers 第一，它在说：AI Agent
            每天都在扔掉它最需要的训练数据。二值强化学习、OPD 事后指导蒸馏，边用边训。"
          href: null
    Name:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "openclaw都还没用明白，就有 openclaw RL了"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "openclaw都还没用明白，就有 openclaw RL了"
          href: null
  url: "https://www.notion.so/openclaw-openclaw-RL-32193dc3968c816d8661d6e48c5fee26"
  public_url: null
  archived: false
MANAGED_BY_NOTION_HUGO: true

---


上周还在 iWiki 里记 OpenClaw 的使用笔记，这周 Gen-Verse 直接发了 OpenClaw-RL 的论文，登上了 HuggingFace Daily Papers 第一。


我的内心：😭


先说问题出在哪


传统的 Agent RL 训练有个隐性浪费：每次交互结束，模型都收到了一个下一状态信号，包括用户的回复、工具的输出结果、终端的报错、GUI 的状态变化。


这些信号被所有现有系统直接扔掉了，只用来给下一轮提供上下文，不做任何学习。


论文把这个浪费分成两类：


浪费 1，评估信号。用户重新问了一遍，说明上一次回答不够好。用户直接说对的，说明这次答对了。测试通过，代码正确。这些都是天然的过程奖励，完全不需要额外标注，但没人用。


浪费 2，指令信号。用户说你应该先检查文件再修改，这句话不只是告诉模型做错了，还告诉了模型哪几个 token 应该往哪个方向改。scalar reward 把这些方向信息全部压平成了一个数字，丢失了。


OpenClaw-RL 的解法


架构：四个完全解耦的异步循环


策略服务 (SGLang) -> 环境交互 -> PRM 评判 -> 策略训练 (Megatron)


四个组件互不阻塞。模型在处理新请求的同时，PRM 在评判上一条，训练器在更新权重。


对于个人 Agent（OpenClaw 本地部署场景），用户的设备就是环境，通过 HTTP API 连接到 RL 服务器，加密传输，不需要改动任何 OpenClaw 框架代码。


这个设计的核心点是：边用边训。你正常使用 OpenClaw，模型在后台悄悄变好。


方法一：Binary RL（基于 GRPO）


针对评估信号的浪费。给定动作 a_t 和下一状态 s_{t+1}，PRM 打分：PRM(a_t, s_{t+1}) -> r in {+1, -1, 0}


跑 m 次独立评判，多数投票决定最终分数。然后用标准的 PPO 风格 clipped surrogate loss 更新策略。因为是实时对话，没有 GRPO 那种 group 结构，所以 advantage 直接用 A_t = r_final。


方法二：OPD，事后指导的在线策略蒸馏


这个是重点，专门处理指令信号的浪费。


思路很干净：如果用户说你应该先检查文件，那把这个 hint 加到原始 prompt 里，模型会产生一个不同的 token 分布，一个知道应该怎么做的分布。用这个分布和原始分布之间的 token 级差距作为 advantage，就得到了方向性的梯度信号。


四步走：


1. Hint 提取：让 judge 模型从 s_{t+1} 里提炼出 1-3 句关键指令，放在 [HINT_START]...[HINT_END] 标记里。直接用原始下一状态不行，用户的回复可能混杂着其他问题，噪声太多。


2. 质量筛选：多次 judge 调用里，选最长的正向 hint（>10字符）。没有合格 hint 就直接丢弃这个样本，宁缺毋滥。


3. 构建加了 hint 的 Teacher 提示词：把 hint 拼到原始 prompt 后面，生成 s_hint = s_t + hint。


4. Token 级 Advantage：A_t = log pi_teacher(a_t | s_hint) - log pi_theta(a_t | s_t)


A_t > 0 的 token：teacher 认为更应该出现，student 应该提权。A_t < 0 的 token：teacher 认为不该出现，student 应该降权。


这跟 RLHF、DPO 都不一样：不需要更强的 teacher 模型，不需要预标注的偏好对，teacher 就是自己加了 hint 之后的自己。


方法三：两者结合


A_t = w_binary * r_final + w_opd * (log pi_teacher(a_t|s_hint) - log pi_theta(a_t|s_t))


Binary RL 覆盖所有有评分的 turn，提供广度。OPD 只在有明确指令信号的 turn 上发挥，提供精度。默认权重都是 1。


General Agent 部分：过程奖励为什么重要


对于长时任务（terminal/GUI/SWE），只用最终结果奖励会导致中间大量 turn 没有梯度信号。


OpenClaw-RL 的做法是把过程奖励和结果奖励直接加起来：用 o + sum(r_i)/m 作为第 t 步的奖励，r_i 是 PRM 对第 t 步的独立打分。


advantage 计算时，按 step index 分组标准化（不是按 state 聚类，因为 terminal 环境的 state 很难聚类）。


实验结果


论文用了两个场景做个人 Agent 实验：


学生：用 OpenClaw 做作业，老师的批改反馈作为下一状态信号。


老师：用 OpenClaw 批改作业，学生的错误提交作为下一状态信号。


结论：Binary RL 和 OPD 组合效果最好，见效快，几轮交互后就有明显提升。General Agent 部分在 Terminal、GUI、SWE、Tool-call 四个场景都做了测试，过程奖励对长时任务的帮助是实质性的。


这篇论文在说什么


不是在造新 benchmark，也不是在比哪个模型更强。


它在说：AI Agent 每天都在扔掉它最需要的训练数据。


OpenClaw-RL 建立在一个简单观察上：用户的每一次反应、工具的每一次输出，都已经包含了上一步做得怎么样和应该怎么改的信息。把这两个信息都用上，不需要额外标注，不需要更强的 teacher 模型，Agent 就能边用边学。


对于已经在本地跑 OpenClaw 的人来说，这是个很现实的问题：OpenClaw 本身还没完全摸透，现在又多了一层 RL 训练的复杂度。但方向是对的。能从真实使用中学习的 Agent，比只能靠预训练的 Agent，长期差距会越来越大。


代码：https://github.com/Gen-Verse/OpenClaw-RL


论文：https://arxiv.org/abs/2603.10165

