<template>
  <div>
    <Preview></Preview>
    <div class="box">
      <a class="btn" href="javascript:;">保存并发布</a>
    </div>
  </div>
</template>

<script>
import Preview from '@/pages/preview'

export default {
  name: 'App',
  components: {
    Preview
  }
}
</script>

<style>
/* css reset */
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,
form,fieldset,legend,button,input,textarea,th,td {margin:0;padding:0;}
body,button,input,select,textarea{font:12px/1.5,arial,\5b8b\4f53;}
h1,h2,h3,h4,h5,h6{font-size:100%;}
address,cite,dfn,em,var{font-style:normal;}
code,kbd,pre,samp{font-family:courier new,courier,monospace;}
small{font-size:12px;}
ul,ol{list-style:none;}
a{text-decoration:none;}
sup{vertical-align:text-top;}
sub{vertical-align:text-bottom;}
legend{color:#000;}
fieldset,img{border:0;}
button,input,select,textarea{font-size:100%;}
table{border-collapse:collapse;border-spacing:0;}

/* 通用样式 */
a {
  color: #5c5c5c;
}
a:hover {
  color: #32b16c;
}
.active a {
  color: #32b16c;
  border: 1px solid #32b16c;
}
.btn {
  padding: 10px 35px;
  border-radius: 3px;
  background-color: #32b16c;
  color: white;
}
.btn:hover {
  color: white;
  background-color: #229556;
}
.box {
  display: flex;
  justify-content: center;
}
</style>
