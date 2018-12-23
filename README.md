# how to create Alfred workflow to upload image from clipboard to s3, using nodejs

* inspired by this excellent [post](https://tonyxu.io/zh/posts/2018/create-alfred-workflow-for-uploading-screenshot-to-s3/)


## How to create this workflow from scatch:

* copy clipboard to file, by using [png paste](https://github.com/jcsalterego/pngpaste)

```
brew install pngpaste
```
* write a [nodejs program](https://github.com/marvinwu/clipboardToS3/blob/master/cli.js) to call pngpaste and upload to s3

* [package up](https://www.npmjs.com/package/pkg) to make an executable program of the the nodejs program

```
pkg cli.js
```

* [create alfred workflow to connect everything together](https://tonyxu.io/zh/posts/2018/create-alfred-workflow-for-uploading-screenshot-to-s3/)

* copy the generated cli-macos and pngpaste binary to the workflow directory


## mandatory env variables

![](http://take.ms/03Dx0)
