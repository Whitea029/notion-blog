---
title: "面经（持续更新）"
slug: "mianjing"
type: "page"
---

## 日常实习

### 字节-中台

- SSE介绍、包结构、http chunked
- redis作为消息队列和 mysql 落库的分布式事务问题
- TCP和UDP的区别
- 一个服务器能承载多少个TCP连接
- TCP是怎么控制流量的
- 多进程和多线程的关系和区别以及使用场景
- golang 字符串转化成byte数组会发生内存拷贝么
- 如何优化golang GC

### Minimax-服务端

- 乐观锁与分布式锁
- 分布式锁的实现细节

### 华为一面

面试官迟到15分钟😅

1. 问了一点学校的比赛，课程
2. 简单的问了一下简历上的项目
3. 基础八股——Golang的协程调度模型是怎样的
4. 基础八股——Golang的GC流程是怎样的，对比别的GC算法有什么区别，内存碎片Golang是怎么处理的
5. 你有线上观测过Golang服务的性能么，内存？Goroutine？等
6. 手撕——[去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/description/)

### 华为二面

面试官迟到16分钟😅

1. 纯聊天，聊学校，项目，社团，生活，压力，未来学习规划和路线
2. 反问环节

总结来说挺水的，不知道是不是因为我是27届的。

### 腾讯一面（1h）

1. 介绍实习需求（K8S 和 Casbin RBAC 相关）
2. 为啥初创实习两个月离职
3. Go 为什么支持高并发
4. GMP模型原理
5. Goroutine Work-Stealing 的目的
6. P的角色的作用，如果在M上维护Goroutine队列有什么不好
7. GMP对CPU密集型任务能提高并发么
8. IO操作需要CPU么，什么时候需要，磁盘IO和网络IO的区别
9. Channel的作用和底层实现
10. Channel的缓冲区在用户态还是内核态
11. Goroutine阻塞等待的时候由谁来唤醒，需要额外的goroutine来遍历所有的channel么
12. M上的G0是干嘛的
13. 介绍select/poll/epoll
14. 网络IO的流程
15. 了解过Go Runtime么

算法：求两个数的最大公约数

### 腾讯二面（1h）

1. 介绍实习需求，最有挑战的部分
2. RocksDB了解么，说一下LsmTree
3. 详细介绍一下Raft协议
4. Raft协议和Paxos协议的区别，有哪些优化
5. 介绍一下React Agent
6. LangChain 和 LangGraph 的区别
7. Agent 和 LLM 的区别
8. Function Call 和 MCP 的区别
9. RPC的全流程
10. 负载均衡算法有哪些
11. 介绍一致性Hash算法，服务扩缩容之后有什么影响
12. 网络编程
13. 介绍一下TCP和UDP
14. 介绍一下HTTP各个版本及实现

算法：

1. 编辑距离
2. 两两交换链表中的节点

### 腾讯三面（30min）

1. 介绍实习，你做了什么
2. 介绍项目
3. 实习时长，到岗时间，推HR面

### 腾讯HR面（15min）

1. 离职原因
2. 实习时长，到岗时间
3. 聊聊天

### 快手一面（1h）

1. 拷打实习项目（云相关问的比较多）
2. 介绍K8S的架构，核心资源对象
3. 详细介绍创建一个Deployment的全流程
4. 介绍一下 Raft 协议及工业实践
5. 介绍一下 AP 和 CP 及工业实践
6. client-go 的 Informer 的底层原理

算法

1. 二叉树中序遍历（ACM手动构建树）
2. 数组中的第K个最大元素

### 快手二面（1h）

1. 介绍OSPP和实习（主要跟client-go相关）
2. 介绍 Informer 全流程
3. shardIndexInformer 注册的每个handler，如果一个阻塞会影响其他的 handler 么
4. 为什么需要 DetlaFIFO
5. WorkQueue 怎么保证顺序性
6. 介绍K8s控制器原理，控制器和 WebHook 的作用和场景
7. Linux容器的实现原理，Cgroup是怎么实现资源隔离的

算法：

1. 寻找两个正序数组的中位数

### 快手三面（30min）

1. 介绍OSPP和实习
2. 介绍K8s调度器原理
3. 如何扩展K8s调度器
4. Informer的ListWatch的实现原理
5. Watch 的是 APIServer 还是 etcd
6. 资源对象在 etcd 中怎么存的
7. Watch 是yaml文件级别的变化还是字段级别的变化
8. resourceVersion 是什么，干什么用的