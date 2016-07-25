<template>
  <my-search></my-search>
  <ques-list></ques-list>
  <div class="footer">
      <a v-link="{ path : 'quickhelp' }">
          <span>
              <img src="../assets/img/icon/help.png" />
              快捷帮助
          </span>
      </a>
      <a v-link="{ path : 'feedback' }">
          <span>
              <img src="../assets/img/icon/fback.png" />
              意见反馈
          </span>
      </a>
  </div>
</template>

<script>
import quesList from './QuesList'
import mySearch from './Search'

export default {
  components: {
    quesList,
    mySearch
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footer{
  background-color: rgb(249,249,249);
  border-top: 1px solid rgb(204,204,204);
  padding: 5px 0px;
  height: 35px;
  font-size: 0px;
  
  width: 100%;
  
  position: fixed;
  bottom: 0px;
}

.footer span{
  display: inline-block;
  width: 50%;
  
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  
  font-size: 16px;
  line-height: 35px;
  font-family: "microsoft yahei";
  color: rgb(62,62,62);
  
  text-align: center;
}

.footer span:first-child{
  border-right: 1px solid rgb(204,204,204);
}

.footer span img{
  height: 16px;
  vertical-align: middle;
}
</style>
