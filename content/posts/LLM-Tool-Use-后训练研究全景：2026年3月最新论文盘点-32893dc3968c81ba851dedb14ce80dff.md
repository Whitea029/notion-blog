---
title: "LLM Tool Use 后训练研究全景：2026年3月最新论文盘点"
date: "2026-03-19"
lastmod: "2026-03-19T10:49:00.000Z"
draft: false
series: []
tags:
  - "LLM"
  - "开源"
categories:
  - "技术"
summary: "梳理 2026 年 3 月 arXiv 最新一批 LLM Tool Use
  后训练研究，涵盖工具规划搜索（ToolTree）、数据多样性合成（DIVE）、安全对齐（MOSAIC）、分治框架（Tool-DC）等多个方向。"
authors:
  - "Blog"
NOTION_METADATA:
  object: "page"
  id: "32893dc3-968c-81ba-851d-edb14ce80dff"
  created_time: "2026-03-19T10:45:00.000Z"
  last_edited_time: "2026-03-19T10:49:00.000Z"
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
  is_archived: false
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
        start: "2026-03-19"
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
        - id: "a5bfce5f-98e3-48c2-944a-c61a04b9d1e4"
          name: "LLM"
          color: "green"
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
      last_edited_time: "2026-03-19T10:49:00.000Z"
    summary:
      id: "x%3AlD"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "梳理 2026 年 3 月 arXiv 最新一批 LLM Tool Use
              后训练研究，涵盖工具规划搜索（ToolTree）、数据多样性合成（DIVE）、安全对齐（MOSAIC）、分治框架（Tool-DC）\
              等多个方向。"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "梳理 2026 年 3 月 arXiv 最新一批 LLM Tool Use
            后训练研究，涵盖工具规划搜索（ToolTree）、数据多样性合成（DIVE）、安全对齐（MOSAIC）、分治框架（Tool-DC）等多\
            个方向。"
          href: null
    Name:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "LLM Tool Use 后训练研究全景：2026年3月最新论文盘点"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "LLM Tool Use 后训练研究全景：2026年3月最新论文盘点"
          href: null
  url: "https://www.notion.so/LLM-Tool-Use-2026-3-32893dc3968c81ba851dedb14ce80dff"
  public_url: null
  archived: false
MANAGED_BY_NOTION_HUGO: true

---


2026 年 3 月，arXiv 上关于 LLM Tool Use 和 Function Call 后训练的论文密度明显上升。工具调用已不再只是「让模型学会格式」的工程问题，而是成为 Agentic RL 的核心能力之一。本文梳理本月最值得关注的研究，覆盖规划算法、数据合成、安全对齐、泛化训练、RL 架构效率五个维度。


如果用一句话概括最近这批论文的共性：工具调用的瓶颈正在从「能不能调用」转移到「如何更聪明地规划、如何在陌生工具集下泛化、如何在多步操作中保持安全」。


早期的工具调用研究（Toolformer、ToolBench 时代）主要解决两件事：让模型知道工具存在，让它学会格式化输出。这两件事基本被 SFT 解决了。现在的问题更深：在几十上百个工具并存时如何做出最优规划？合成数据多样性不足导致 OOD 场景崩塌怎么办？多步工具使用中的安全漏洞如何用后训练修补？


下面逐一拆解本月最有代表性的工作。


**二、工具规划搜索：ToolTree 用 MCTS 替代贪心**


**论文：**ToolTree: Efficient LLM Agent Tool Planning via Dual-Feedback MCTS and Bidirectional Pruning（arXiv:2603.12740，ICLR 2026，墨尔本大学 & 西澳大学）


多步工具规划里一个老问题：贪心选择（每步挑当前最优工具）会错过需要「绕路」才能到达的最优路径。ToolTree 把工具规划重新建模成树搜索问题，以 MCTS 为骨架，加了两个关键改造：

- 执行前评估（pre-evaluation）：用轻量 LLM 打分，在调用工具前过滤掉明显不靠谱的分支
- 执行后评估（post-evaluation）：根据工具实际返回的结果再次评分剪枝，让搜索有实际依据

两个信号形成「向前预判 + 向后反馈」的双向剪枝闭环。


_↑ ToolTree 架构图（来源：arXiv:2603.12740 Figure 2）：输入 query 经过迭代双评估 MCTS 循环（选择→预评估→扩展→执行→后评估→反向传播），Answer Predictor 综合最优轨迹生成最终答案。_


在 GTA、m&m、ToolBench、RestBench 四个基准上，ToolTree 平均超出 SOTA 规划范式约 10%，同时保持最高的 accuracy-per-second 效率。这套方案免训练——不需要在特定工具集上微调，直接插入现有 Agent 框架即可用。


这个结果的含义是：当前大多数 Agent 框架用贪心工具选择，大约白白损失了 10% 的性能。ToolTree 的 MCTS 框架也为后续引入学习型价值函数、从工具轨迹做离线 RL 打开了空间。


_论文链接：https://arxiv.org/abs/2603.12740_


**三、数据多样性合成：DIVE 翻转合成顺序**


**论文：**DIVE: Scaling Diversity in Agentic Task Synthesis for Generalizable Tool Use（arXiv:2603.11076，复旦大学 & MiniMax）


Tool Use 训练数据合成有个隐患：大多数合成 pipeline 从固定工具集出发，先生成 query 再验证能否执行。这导致任务分布过窄——模型在训练工具集上效果好，换一批工具就崩。


DIVE 的核心洞见：翻转合成顺序。

- 传统做法：固定工具集 → 生成 query → 事后验证能否执行（经常失败）
- DIVE 做法：先执行真实工具收集「证据」（evidence） → 从证据反向推导 query-answer 对

这样「可执行性」和「可验证性」由构造本身保证，不需要事后过滤。DIVE 沿两个维度扩展多样性：工具池覆盖率（373 个工具，跨通用和 4 个专业领域）和每个任务的工具集多样性（per-task toolset variety）。


_↑ DIVE 框架图（来源：arXiv:2603.11076 Figure 1）：灰色=基础模型；蓝色=用固定工具集合成数据训练（域内强但泛化弱）；紫色=DIVE 训练（各维度鲁棒泛化）。_


用 DIVE 数据（48k SFT + 3.2k RL）训练 Qwen3-8B，在 9 个 OOD 基准上平均提升 +22 分，比最强 8B 基线高出 +68%。更关键的发现：

- 多样性扩展 > 数量扩展：在相同数据量下，提升多样性比增加数量对 OOD 泛化更有效
- RL 收益被多样性放大：多样数据上 RL 训练的提升比单一分布更明显

这对工程实践有直接启示：与其花大量成本收集更多数据，不如先检查数据的工具集多样性。


_论文链接：https://arxiv.org/abs/2603.11076_


**四、长上下文工具调用：Tool-DC 分治框架**


**论文：**Try, Check and Retry: A Divide-and-Conquer Framework for Boosting Long-context Tool-Calling Performance（arXiv:2603.11495，武汉大学 & 南洋理工大学）


当可用工具从几个增加到几十上百个时，模型面临两个问题：候选工具太多导致上下文太长，以及噪声工具干扰判断。Tool-DC 用分治（Divide-and-Conquer）思路拆解这个问题，核心是 Try-Check-Retry 循环：

- Try：从候选工具池中选择一部分尝试调用
- Check：检查调用结果是否满足任务需求
- Retry：若不满足，利用 LLM 的自我反思能力调整策略重试

Tool-DC 提供两个变体：TF（免训练，即插即用）和 TB（SFT 训练版，推理效率更高）。在 BFCL 和 ACEBench 上，TF 版平均提升 +25.10%；TB 版让 Qwen2.5-7B 达到与 OpenAI o3、Claude-Haiku-4.5 相当的水平。


_论文链接：https://arxiv.org/abs/2603.11495_


**五、安全对齐：MOSAIC 让拒绝成为一等公民**


**论文：**MOSAIC: Learning When to Act or Refuse for Safe Multi-Step Tool Use（arXiv:2603.03205）


多步工具使用的安全问题和单轮对话不同：Agent 会执行文件访问、凭证提交、数据库写入等不可逆操作，一步出错可能造成连锁损害。MOSAIC 把安全对齐嵌进推理结构本身：

- 推理循环：Plan → Check → Act/Refuse，拒绝（Refuse）是一个显式的 first-class action，而不是模型的「副产品」
- 训练方式：偏好 RL（pairwise trajectory comparison），不需要轨迹级安全标签
- 覆盖 Qwen2.5-7B、Qwen3-4B-Thinking、Phi-4 三个模型家族的零样本测试

结果：有害行为降低最高 50%，提示注入攻击拒绝率提升超 20%，良性任务性能保持或提升。


关键设计取舍：用偏好 RL 而非标量奖励，是因为安全决策的「好坏」往往体现在轨迹对比中，而非单一维度的评分。这和 RLHF 里偏好学习的直觉一致。


_论文链接：https://arxiv.org/abs/2603.03205_


**六、RL 泛化研究：RFT 什么时候能迁移？**


**论文：**Can RL Improve Generalization of LLM Agents? An Empirical Study（arXiv:2603.12011，复旦大学）


强化微调（RFT）训练的 LLM Agent 到底能泛化到什么程度？这篇论文系统研究了三个维度：

- 同环境内跨任务难度泛化：从简单任务训练后能否泛化到复杂任务？
- 跨环境迁移：在环境 A 训练后能否泛化到未见的环境 B？
- 顺序多环境训练：先在 A 再在 B 训练，是否遗忘 A？

主要发现：

- 域内跨难度泛化：RFT 效果好，难度较低任务上学到的能力能迁移到更难任务
- 跨环境迁移：效果偏弱，当 semantic prior（任务语义）或 action/observation 接口变化时，泛化明显下降
- 顺序训练：正向迁移为主，遗忘极少；混合训练策略能改善整体平衡

这个结论有实际意义：如果想训一个通用工具调用模型，在单一环境反复刷分意义有限，需要覆盖多样化的工具和交互接口。


_论文链接：https://arxiv.org/abs/2603.12011_


**七、信息自锁：RL 训练的一个被忽视的陷阱**


**论文：**On Information Self-Locking in Reinforcement Learning for Active Reasoning of LLM Agents（arXiv:2603.12109，香港中文大学）


「信息自锁」是这篇论文命名的一个新现象：在主动推理场景（Agent 需要主动提问来获取信息）下，RL 训练的 Agent 会逐渐停止提出有信息量的问题，并且难以内化已获取的信息。


论文把主动推理分解为两个核心能力：动作选择（AS，决定问什么问题）和信念追踪（BT，整合已获取信息更新内部状态）。AS 和 BT 的能力缺陷会互相强化，形成负反馈循环：

- AS 能力弱 → 提出无信息量的问题 → BT 得不到有价值的输入 → BT 能力无法提升
- BT 能力弱 → 无法利用已获取信息 → 无法判断哪些信息有价值 → AS 退化

解决方案：在训练中注入「方向性批评信号」（directional critiques），对 AS 和 BT 的缺陷分别提供反馈，重新分配学习梯度。在 7 个主动推理数据集上带来最高 60% 的性能提升。


这个发现对 Agentic RL 训练设计有警示意义：单纯优化最终结果的稀疏奖励，可能让模型陷入信息自锁而无法自行突破。


_论文链接：https://arxiv.org/abs/2603.12109_


**八、系统效率：ARL-Tangram 让 Agentic RL 训练不再浪费资源**


**论文：**ARL-Tangram: Unleash the Resource Efficiency in Agentic Reinforcement Learning（arXiv:2603.13019，北京大学 & 小米大模型团队）


Agentic RL 训练有一个工程问题：Agent 在与环境交互时需要调用外部工具（代码执行、搜索引擎、数据库等），这些工具的响应时间高度异构，导致 GPU 大量空等。ARL-Tangram 提出动作级编排（action-level orchestration）：

- 细粒度资源调度：不按「整个 rollout」分配资源，而是按「单个工具调用动作」动态调度
- 弹性资源共享：多个 rollout 的外部资源请求统一排队，空闲时分给其他任务
- 最小化动作完成时间（ACT）：用弹性调度算法减少工具等待造成的 GPU 空置

系统已部署于小米 MiMo 系列大模型的 Agentic RL 训练。实测：ACT 提升最高 4.3 倍，训练步骤时长加速最高 1.5 倍，外部资源节省最高 71.2%。


这类系统论文通常不受学术社区重视，但对实际落地影响很大：如果 Agentic RL 训练成本能降低 70%，很多之前不划算的实验就变得可行了。


_论文链接：https://arxiv.org/abs/2603.13019_


**九、蒸馏加速：REOPOLD 让小模型以 1/10 的样本逼近大模型**


**论文：**REOPOLD: Scaling Reasoning Efficiently via Relaxed On-Policy Distillation（arXiv:2603.11137，Microsoft Research）


On-policy 蒸馏（让小模型模仿大模型的推理轨迹）是迁移工具使用能力的常用方法，但容易出现训练不稳定和负迁移。REOPOLD 把 on-policy 蒸馏重新解释为一种策略优化：teacher-student 的 log-likelihood 比率充当 token-level reward。


基于这个统一视角，REOPOLD 引入三个机制：

- 混合奖励裁剪：防止策略更新步子太大
- 基于熵的 token 级动态采样：对不确定的 token 投入更多探索
- 统一探索-精炼训练策略：先广泛探索，再精炼收敛

结果：样本效率比标准 RL 高 6.7~12 倍，7B 学生模型以 3.32x 推理加速逼近 32B 教师模型。在 agentic tool-use 任务上提升显著。


_论文链接：https://arxiv.org/abs/2603.11137_


**十、整体趋势小结**


梳理完这批论文，可以看到几条比较清晰的研究线索：

- 规划从贪心走向搜索：ToolTree 代表了一个方向——把工具调用的规划问题用树搜索框架来解，引入前瞻性和反馈修正。这个框架天然兼容后续的学习型优化。
- 数据多样性成为泛化的关键变量：DIVE 的结论直接挑战了「多就是好」的直觉，多样性比数量更重要。这对工程侧的数据采集策略有直接影响。
- 安全对齐需要结构性设计：MOSAIC 把「拒绝」内嵌进推理循环，而不是事后打补丁。这是比单纯添加安全 SFT 数据更系统的做法。
- RL 训练的泛化边界需要更清晰：复旦的实证研究揭示了 RFT 的泛化局限。这意味着在特定工具集上刷榜的策略，对构建通用工具调用能力帮助有限。
- 信息自锁是主动推理中被忽视的问题：香港中文大学的工作提醒我们，稀疏结果奖励在主动信息获取场景下可能会产生意外的退化效应。

从整体来看，Tool Use 后训练正在从「能调用」走向「会规划」，从「单工具」走向「多工具泛化」，从「完成任务」走向「安全完成任务」。三个维度同时演进，也意味着这个方向在 2026 年还有大量未解决的问题。


**附：本文涉及论文列表**

- ToolTree（ICLR 2026，墨尔本大学）：https://arxiv.org/abs/2603.12740
- DIVE（复旦 & MiniMax）：https://arxiv.org/abs/2603.11076
- Tool-DC（武汉大学 & 南洋理工）：https://arxiv.org/abs/2603.11495
- MOSAIC：https://arxiv.org/abs/2603.03205
- Can RL Improve Generalization（复旦）：https://arxiv.org/abs/2603.12011
- Information Self-Locking（香港中大）：https://arxiv.org/abs/2603.12109
- ARL-Tangram（北大 & 小米）：https://arxiv.org/abs/2603.13019
- REOPOLD（Microsoft Research）：https://arxiv.org/abs/2603.11137
- AVR（MBZUAI & McGill）：https://arxiv.org/abs/2603.12823
- Reasoning LLMs-as-Judges（Meta & Yale）：https://arxiv.org/abs/2603.12246
