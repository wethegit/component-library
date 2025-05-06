---
"@wethegit/components": patch
---

Fixes an issue with the InViewItem component, where the delays were being caluculated incorrectly. For example, using a delay value of `8` would return a `0.4s` value instead of a `0.8s` value.
