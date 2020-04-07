import { EventEmitter, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

let timer = null;
let count = 0;
const event: EventEmitter<boolean> = new EventEmitter();

@Injectable()
export class SpinService {
  constructor(private msg: NzMessageService) {}

  emit = (flag?: boolean): void => {
    if (flag) {
      count++;
      event.emit(true);
      // 加载超时处理
      // this.timeout();
    } else {
      count--;
      if (count < 1) {
        this.clearStatus();
      }
    }
  };

  subscribe = (val): void => {
    event.subscribe(val);
  };

  timeout(): void {
    // 30s 超时处理，强制关闭 loading,并提示消息
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.clearStatus();
      this.msg.remove();
      this.msg.error('请求超时！');
    }, 30000);
  }

  clearStatus(): void {
    clearTimeout(timer);
    count = 0;
    event.emit(false);
  }
}
