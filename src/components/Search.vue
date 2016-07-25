<template>
  <div class="header">
    <div class="search-line">
      <input class="searchText" type="text" v-model="keyWord" placeholder="请输入你想提问的问题" />
      <input class="searchBtn" type="button" @click="search()" value="搜索" />
    </div>
  </div>
</template>

<script>
import Bus from '../bus.js'
import { Indicator, Toast } from 'mint-ui';

export default {
  data () {
    return {
      keyWord : ''
    }
  },
  components: {
    Indicator, 
    Toast
  },
  methods : {
    search : function(){
      Indicator.open('加载中...');
      if(this.keyWord != ''){
        Bus.$emit('SearchQuesList', this.keyWord);
      } else {
        Bus.$emit('HotQuesList', this.keyWord);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  background-color: rgb(52,187,255);
  padding: 25px 5%;
  text-align: center;
  z-index: 100;
}
.search-line{
  font-size: 0px; 
}

.search-line .searchText{
  height: 35px;
  width: 78%;
  background-image:url(../assets/img/icon/search.png);
  background-repeat:no-repeat;
  background-size: auto 40%;
  background-position: 10px center;
  padding-left: 30px;
  padding-right: 10px;
  
  border: none;
  
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */

  font-family: "微软雅黑";
  font-size: 13px;
  color: rgb(61,61,61);
  
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  
  vertical-align: top;
}

.search-line .searchBtn{
  width: 20%;
  height: 35px;
  
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  
  border: none;
  
  margin-left: 1px;
  
  font-family: "微软雅黑";
  font-size: 15px;
  color: rgb(52,187,255);
  font-weight: 600;
  
  background-color: white;
  
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  
  vertical-align: top;
}
</style>
