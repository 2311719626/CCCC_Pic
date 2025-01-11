### 关于Picgo集成

    -- author: wendisx
    -- 关于集成picgo的一个构想

#### 需求

1、开发测试环境:`github`

2、生产环境:`aliyun oss`

3、作为项目图片存储解决方案

#### 想法

在查阅了相关文档后，发现`Picgo`提供了集成到nodejs项目功能，同时允许通过配置文件定向上传到指定图床仓库，因此可以通过一个接口直接集成到现有项目当中

相关配置文件目录:`~/.picgo/config.json`，由于集成性，建议直接在项目初始化`picgo`时指定项目中的配置文件：

```javascript
import {Picgo} from 'picgo'
const picgo = new Picgo('/path/to/config')
```

> github配置文件

```json
{
    "picBed": {
        "uploader": "github",
        "github": {
            "repo": "2311719626/CCCC_Pic",
            "token": "<github-token>",
            "path": "img/",
            "customUrl": "http://ccccproject/img/${filename}",
            "branch": "main"
        }
    },
    "picgoPlugins": {}
}
```

> aliyun配置文件

```json
{
    "picBed": {
        "accessKeyId": "",
        "accessKeySecret": "",
        "bucket": "",
        "area": "",
        "path": "",
        "customUrl": "",
        "options": ""
    },
    "picgoPlugins": {}
}
```

> 通过`ssh`将配置文件送到远程服务器(仅当使用默认配置文件时需要操作):

```shell
scp /path/to/local/config username@hostname:/home/cccc/.picgo
```

#### 实现思路

1、定义相关接口

2、编写实现逻辑，结合express.js和node:fs模块实现

3、测试接口

4、修改问题
