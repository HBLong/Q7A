<template>
  <mt-header title="快捷帮助">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="wrap">
    <input class="phoneTextBox" type="text" v-model="phone" name="phone" placeholder="请输入你的联系电话(非必填)" />  
    <textarea class="suggest" v-model="content" placeholder="您的问题或建议"></textarea>
    <mt-button type="primary" size="large" @click="subMsg">提交</mt-button>
  </div>
</template>

<script>
import Bus from '../bus.js';
import { Header, Button, Indicator } from 'mint-ui';
import { showMsg } from '../func/showMsg';
export default {
  data () {
    return {
      phone: '',
      content: '',
      mid: window.myconfig.mid
    }
  },
  components : {
    mtHeader : Header,
    mtButton : Button,
  },
  methods: {
    subMsg : function(){
      if(this.phone.length > 11){
        showMsg('手机号码格式不对');
      } else if(this.phone.length > 0 && isNaN(this.phone)){
        showMsg('手机号码必须全为数字');
      } else if(this.content == ''){
        showMsg('反馈信息不能为空');
      } else {
        Indicator.open('提交中...');


        // TODO
        var url = window.myconfig.apiRoot + '&do=SubMsg&mid='+this.mid+'&qid='+this.qid;
        this.$http.post(url, { phone : this.phone, content : this.content }, { credentials:true }).then((response) => {
            console.log(response.json());
            // success callback
            var resp = response.json();
            if(resp.status !== undefined && resp.status >= 0){
                Bus.$emit('QuesGet', resp.data);
            }

            Indicator.close();
            if(resp.msg != undefined || resp.msg != '') showMsg(resp.msg);

        }, (response) => {
            showMsg('网络异常');
            Indicator.close();
        });
        
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  background-color: rgb(246,246,246);
}

.wrap{
  text-align: center;
  padding: 0px 7%;
}
.phoneTextBox{
  height: 35px;
  width: 100%;
  background-image:url(../assets/img/icon/phone.png);
  background-repeat:no-repeat;
  background-size: auto 40%;
  background-position: 10px center;
  padding-left: 40px;
  
  border: 1px solid rgb(229,229,229);
  
  color: rgb(61,61,61);
  
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  
  margin-top: 20px;
  
  font-family: "微软雅黑";
  font-size: 14px;
}

.suggest{
  width: 100%;
  height: 120px;
  border: 1px solid rgb(229,229,229);
  color: rgb(61,61,61);
  resize: none;
  
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  
  padding: 5px 10px;
  margin: 10px 0px;
  
  font-family: "微软雅黑";
  font-size: 14px;
}


</style>
