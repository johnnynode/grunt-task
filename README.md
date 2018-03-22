# grunt-task

> 相比较于gulp， Grunt的配置起来较为麻烦，不过也是一个很好的构建工具，社区也很大，周边的插件也很全面，下面我们用官网上的一个小例子来分析一下它

### 安装

- 全局安装 grunt-cli：$ `sudo cnpm i -g grunt-cli ` 
- 全局安装 grunt：$ `sudo cnpm i -g grunt` 
- 项目依赖安装：$ `sudo cnpm i --save-dev grunt`
- 备注：sudo在Mac或linux系统下使用

### 需要安装的相关插件

- grunt-contrib-uglify
- grunt-contrib-jshint
- grunt-contrib-qunit
- grunt-contrib-watch
- grunt-contrib-concat


### Grunt 实例与注释详解：

```javascript

// 第一部分是"wrapper" 函数，它包含了整个Grunt配置信息
// module.exports = function(grunt) {}

module.exports = function(grunt) {
  
  // 在这个函数中，我们可以初始化 configuration 对象：
  // grunt.initConfig({});
  
  grunt.initConfig({
    
    // 从package.json 文件读入项目配置信息，并存入pkg 属性内
    // pkg: grunt.file.readJSON('package.json')
    
    pkg: grunt.file.readJSON('package.json'),
    // 合并任务 concat
    concat: {
      // 定义一个用于插入合并输出文件之间的字符
      options: {
        separator: ';'
      },
      // 将要被合并的文件
      dist: {
        src: ['src/**/*.js'], // 将要被合并的文件
        dest: 'dist/<%= pkg.name %>.js' // 合并后的JS文件的存放位置
      }
    },
    // 压缩任务 uglify
    uglify: {
      // 此处定义的banner注释将插入到输出文件的顶部
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      // 配置uglify自动压缩concat任务中生成的文件
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // QUnit插件的设置非常简单。 你只需要给它提供用于测试运行的文件的位置，注意这里的QUnit是运行在HTML文件上的 如果不用测试可忽略
    qunit: {
      files: ['test/**/*.html']
    },
    // jshint 任务检测
    jshint: {
      // 需要检测的文件数组
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        //这里是覆盖JSHint默认配置的选项
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    // watch 任务：检测到指定的文件(在这里我使用了JSHint任务中需要检测的相同的文件)发生变化时，它就会按照你所指定的顺序执行指定的任务
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  // 最后，加载所需要的Grunt插件，注意：它们应该已经全部通过npm安装好了
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 注册test任务
  grunt.registerTask('test', ['jshint', 'qunit']);
  // 注册默认任务
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};
```

### 测试仓库

- [github测试仓库](https://github.com/johnnynode/grunt-task)
- 备注：在正式项目中需要处理更多的逻辑和任务，需要按需配置

### 插件列表
[官方插件集合](http://www.gruntjs.net/plugins)

### 更多API的使用
[Apis](http://www.gruntjs.net/api/grunt)