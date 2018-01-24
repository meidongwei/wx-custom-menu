<template>
  <div class="container">
    <div class="preview">
      <Preview></Preview>
    </div>
    <div class="info">
      <Info></Info>
    </div>
  </div>
</template>

<script>
import Preview from '@/components/preview'
import Info from '@/components/info'
export default {
  name: 'App',
  components: {
    Preview,
    Info
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
/* a:hover{text-decoration:underline;} */
sup{vertical-align:text-top;}
sub{vertical-align:text-bottom;}
legend{color:#000;}
fieldset,img{border:0;}
button,input,select,textarea{font-size:100%;}
table{border-collapse:collapse;border-spacing:0;}

.container {
  display: flex;
}
.preview {
  padding: 20px;
}
.info {
  padding: 20px;
  width: 100%;
}
.pageTitle {
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pageTitle > h1 {
  font-size: 20px;
  padding: 10px 0;
}
.pageTitle > a {
  padding: 13px 0;
}
.tip {
  color: #b6b6b6;
  font-size: 14px;
  margin-bottom: 30px;
}
.form-item {
  margin-bottom: 20px;
}
.form-item > span {
  margin-right: 15px;
}
.form-item > input {
  height: 38px;
  width: 300px;
  padding-left: 10px;
  border-radius: 3px;
  /* border: none; */
  border: 1px solid #e3e3e3;
}
</style>
