---
title: Making a high-load service boring again
summary: A production performance investigation that reduced a slow path from 9.5 seconds to 650 milliseconds.
featured: true
status: published
result: 9.5 seconds to 650 milliseconds
capabilities:
  - Go
  - profiling
  - SQL
  - production systems
---

The service had become slow enough to affect the product experience. I profiled the real execution path, then worked through goroutine behavior, connection pooling, and SQL queries until the bottleneck became understandable and fixable.

The company and service details remain anonymized, but the result is approved for public use.
