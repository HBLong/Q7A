import { Toast } from 'mint-ui';
export function showMsg(msg){
    Toast({
      message: msg,
      position: 'bottom',
      duration: 2000
    });
}