<template>
  <div class="content">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottom-status.sync="bottomStatus">
      <ul id="ques-list" class="ques-list">
          <li v-for="ques in quesList" rack-by="ques.qid"  @click="goDetail(ques.qid)">
              {{ ques.title }}<br />
              <span class="time">{{ ques.time }}</span>
          </li>
      </ul>
      <!--
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus === 'drop'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
        <span v-show="bottomStatus === 'loading'">
          <mt-spinner type="snake" :size="28" color="rgb(38, 162, 255)"></mt-spinner>
        </span>
      </div>
      -->
    </mt-loadmore>
  </div>
</template>

<script>
import Bus from '../bus.js'
import { Loadmore, Spinner, Indicator } from 'mint-ui'
import { showMsg } from '../func/showMsg'

export default {

  data () {
    return {
      quesList: [],
      page : 1,
      bottomStatus : '',
      mid: window.myconfig.mid,
      search : '',
      allLoaded : false
    }
  },
  components: {
    mtLoadmore : Loadmore,
    mtSpinner : Spinner
  },
  ready() {
    console.log(window.myconfig);
    // 监听问题列表变化消息
    Bus.$on('QuesListChange', data => {
      console.log(data);
      this.quesList = data;
    });

    // 监听问题列表变化消息
    Bus.$on('QuesListAdd', data => {
      console.log(data);
      this.quesList = this.quesList.concat(data);
    });

    // 监听问题列表页数配置变化消息
    Bus.$on('QuesListPageChange', data => {
      console.log(data);
      this.page = data;
    });
/*
    // 无法加载更多
    Bus.$on('BottomLoadedEnd', data => {
      console.log(data);
      this.allLoaded = true;
    });
*/
    // 加载热门问题
    Bus.$on('HotQuesList', data => {
      console.log(data);
      Indicator.open('加载中...');

      this.page = 1;
      this.search = '';
      this.allLoaded = false;

      // 请求热点问题列表
      var url = window.myconfig.apiRoot + '&do=listHot&mid='+this.mid
      this.$http.get(url, { credentials:true }).then((response) => {
          console.log(response);
          console.log(response.json());
          // success callback
          var resp = response.json();
          if(resp.status !== undefined && resp.status >= 0){
              Bus.$emit('QuesListChange', resp.data.data);
              Bus.$emit('QuesListPageChange', resp.data.pageCur);
          }

          Indicator.close();
      }, (response) => {
          showMsg('网络异常');
          Indicator.close();
      });
    });

    // 根据关键词加载问题列表
    Bus.$on('SearchQuesList', data => {
      console.log(data);
      // 初始化数据
      this.search = data;
      this.page = 1;
      this.allLoaded = false;

      // 查找列表
      Indicator.open('加载中...');

      var url = window.myconfig.apiRoot + '&do=search&keyWord='+this.search+'&mid='+this.mid
      this.$http.get(url, { credentials:true }).then((response) => {
          console.log(response);
          console.log(response.json());
          // success callback
          var resp = response.json();
          if(resp.status !== undefined && resp.status >= 0){
              Bus.$emit('QuesListChange', resp.data.data);
              Bus.$emit('QuesListPageChange', resp.data.pageCur);
          }

          Indicator.close();
      }, (response) => {
          showMsg('网络异常');
          Indicator.close();
      });
    });

    Bus.$emit('HotQuesList', '');

  },
  computed:{
    nextPage: function(){
      return this.page + 1;
    } 
  },
  methods:{
    goDetail(qid){
      console.log('search :'+qid);
      router.go({
        name:"detail",
        query:{ 'qid' : qid, 'mid' : this.mid }
      });
    },
    loadBottom(id) {
      // 加载更多数据
      var searchUrl = window.myconfig.apiRoot + '&do=search&keyWord='+this.search+'&mid='+this.mid+'&page='+this.nextPage;
      var hotUrl = window.myconfig.apiRoot + '&do=listHot&mid='+this.mid+'&page='+this.nextPage;

      var url = (this.search == '') ? hotUrl : searchUrl;

      this.$http.get(url, { credentials:true }).then((response) => {
          // success callback
          var resp = response.json();
          if(resp.status !== undefined && resp.status >= 0){
              Bus.$emit('QuesListAdd', resp.data.data);
              Bus.$emit('QuesListPageChange', resp.data.pageCur);
              // 全部加载完毕
              if(resp.data.pageCur >= resp.data.pageSum){
                this.allLoaded=true;
                //Bus.$emit('BottomLoadedEnd', resp.data.pageCur);
                console.log('到底了');
              }
          }

          this.$broadcast('onBottomLoaded', id);
      }, (response) => {
          showMsg('网络异常');
          this.$broadcast('onBottomLoaded', id);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kebab-spinner-snake{
  margin: 0 auto;
}
.content{
  margin-bottom: 45px;
}
.ques-list{
  margin: 0 0;
  padding:0 0;
}
.ques-list li{
  display: inline-block;
  width: 100%;
  z-index: -1;
  
  background-image:url(../assets/img/icon/arrow.png);
  background-repeat:no-repeat;
  background-size: auto 25%;
  background-position: 95% center;
  background-color: white;
  
  border-bottom: 1px solid rgb(229,229,229);
  
  padding: 8px 0px 8px 20px;
  
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}

.ques-list a{
  font-size: 15px;
  font-family: "microsoft yahei";
  color: rgb(62,62,62);
}

.time{
  color: rgb(154,154,154);
  font-size: 13px;
}
</style>
