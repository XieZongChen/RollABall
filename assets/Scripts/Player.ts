import { _decorator, Component, EventKeyboard, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
  protected onLoad(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
  }

  protected onDestroy(): void {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
  }

  onKeyDown(event: EventKeyboard) {
    console.log('onKeyDown', event.keyCode);
  }

  onKeyUp(event: EventKeyboard) {
    console.log('onKeyUp', event.keyCode);
  }

  onKeyPressing(event: EventKeyboard) {
    console.log('onKeyPressing', event.keyCode);
  }
}
