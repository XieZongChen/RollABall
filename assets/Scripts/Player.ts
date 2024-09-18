import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
} from 'cc';
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
    const pos = this.node.position;
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.node.setPosition(pos.x, pos.y, pos.z - 0.2);
        break;
      case KeyCode.KEY_D:
        this.node.setPosition(pos.x, pos.y, pos.z + 0.2);
        break;
      case KeyCode.KEY_W:
        this.node.setPosition(pos.x + 0.2, pos.y, pos.z);
        break;
      case KeyCode.KEY_S:
        this.node.setPosition(pos.x - 0.2, pos.y, pos.z);
        break;
    }
  }
}
