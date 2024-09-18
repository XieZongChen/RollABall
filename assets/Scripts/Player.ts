import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
  Vec2,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
  @property
  public speed: number = 5;

  /**
   * 移动方向
   * - 前和后、左和右均为当前物体的一个轴方向的运动，所以只需要记录轴的正负即可
   * - x 轴正方向为右，负方向为左
   * - y 轴正方向为前，负方向为后
   * - 这个方式控制移动是为了可以同时按下多个不同轴的方向键
   */
  private moveDir: Vec2 = Vec2.ZERO;

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
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.moveDir = new Vec2(-1, this.moveDir.y);
        break;
      case KeyCode.KEY_D:
        this.moveDir = new Vec2(1, this.moveDir.y);
        break;
      case KeyCode.KEY_W:
        this.moveDir = new Vec2(this.moveDir.x, 1);
        break;
      case KeyCode.KEY_S:
        this.moveDir = new Vec2(this.moveDir.x, -1);
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
      case KeyCode.KEY_D:
        this.moveDir = new Vec2(0, this.moveDir.y);
        break;
      case KeyCode.KEY_W:
      case KeyCode.KEY_S:
        this.moveDir = new Vec2(this.moveDir.x, 0);
        break;
    }
  }

  onKeyPressing(event: EventKeyboard) {
    // const pos = this.node.position;
    // switch (event.keyCode) {
    //   case KeyCode.KEY_A:
    //     this.node.setPosition(pos.x, pos.y, pos.z - 0.2);
    //     break;
    //   case KeyCode.KEY_D:
    //     this.node.setPosition(pos.x, pos.y, pos.z + 0.2);
    //     break;
    //   case KeyCode.KEY_W:
    //     this.node.setPosition(pos.x + 0.2, pos.y, pos.z);
    //     break;
    //   case KeyCode.KEY_S:
    //     this.node.setPosition(pos.x - 0.2, pos.y, pos.z);
    //     break;
    // }
  }

  protected update(dt: number): void {
    const pos = this.node.position;
    this.node.setPosition(
      pos.x + this.moveDir.y * this.speed * dt,
      pos.y,
      pos.z + this.moveDir.x * this.speed * dt
    );
  }
}
