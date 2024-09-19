import {
  _decorator,
  Collider,
  Component,
  EventKeyboard,
  ICollisionEvent,
  Input,
  input,
  KeyCode,
  Node,
  RigidBody,
  Vec2,
  Vec3,
} from 'cc';
import { Food } from './Food';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
  /**
   * 施加力的放大倍数
   */
  @property
  public moveForce: number = 5;

  /**
   * 移动方向
   * - 前和后、左和右均为当前物体的一个轴方向的运动，所以只需要记录轴的正负即可
   * - x 轴正方向为右，负方向为左
   * - y 轴正方向为前，负方向为后
   * - 这个方式控制移动是为了可以同时按下多个不同轴的方向键
   */
  private moveDir: Vec2 = Vec2.ZERO;

  private rgd: RigidBody = null;
  private collider: Collider = null;

  protected onLoad(): void {
    this.initInput();
  }

  protected start(): void {
    this.rgd = this.getComponent(RigidBody);
    this.initCollision();
  }

  protected onDestroy(): void {
    this.destroyInput();
    this.destroyCollision();
  }

  initCollision() {
    this.collider = this.getComponent(Collider);

    // 为了不改变小球吃食物时的运动轨迹，改为触发器触发
    // this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
    // this.collider.on('onCollisionExit', this.onCollisionExit, this);
    // this.collider.on('onCollisionStay', this.onCollisionStay, this);
    this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
    this.collider.on('onTriggerExit', this.onTriggerExit, this);
    this.collider.on('onTriggerStay', this.onTriggerStay, this);
  }

  destroyCollision() {
    // this.collider.off('onCollisionEnter', this.onCollisionEnter, this);
    // this.collider.off('onCollisionExit', this.onCollisionExit, this);
    // this.collider.off('onCollisionStay', this.onCollisionStay, this);
    this.collider.off('onTriggerEnter', this.onTriggerEnter, this);
    this.collider.off('onTriggerExit', this.onTriggerExit, this);
    this.collider.off('onTriggerStay', this.onTriggerStay, this);
  }

  onTriggerEnter(event: ICollisionEvent) {
    const food = event.otherCollider.getComponent(Food);
    if (food != null) {
      food.node.destroy();
    }
  }
  onTriggerExit(event: ICollisionEvent) {}
  onTriggerStay(event: ICollisionEvent) {}

  onCollisionEnter(event: ICollisionEvent) {
    const food = event.otherCollider.getComponent(Food);
    if (food != null) {
      food.node.destroy();
    }
  }
  onCollisionExit(event: ICollisionEvent) {}
  onCollisionStay(event: ICollisionEvent) {}

  initInput() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
  }

  destroyInput() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        if (this.moveDir.x > 0) return;
        this.moveDir = new Vec2(-1, this.moveDir.y);
        break;
      case KeyCode.KEY_D:
        if (this.moveDir.x < 0) return;
        this.moveDir = new Vec2(1, this.moveDir.y);
        break;
      case KeyCode.KEY_W:
        if (this.moveDir.y < 0) return;
        this.moveDir = new Vec2(this.moveDir.x, 1);
        break;
      case KeyCode.KEY_S:
        if (this.moveDir.y > 0) return;
        this.moveDir = new Vec2(this.moveDir.x, -1);
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        if (this.moveDir.x > 0) return;
        this.moveDir = new Vec2(0, this.moveDir.y);
        break;
      case KeyCode.KEY_D:
        if (this.moveDir.x < 0) return;
        this.moveDir = new Vec2(0, this.moveDir.y);
        break;
      case KeyCode.KEY_W:
        if (this.moveDir.y < 0) return;
        this.moveDir = new Vec2(this.moveDir.x, 0);
        break;
      case KeyCode.KEY_S:
        if (this.moveDir.y > 0) return;
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
    // const pos = this.node.position;
    // this.node.setPosition(
    //   pos.x + this.moveDir.y * this.speed * dt,
    //   pos.y,
    //   pos.z + this.moveDir.x * this.speed * dt
    // );
    /**
     * 通过给刚体施加力来移动物体
     * - multiplyScalar 方法用于将向量的每个分量乘以一个标量用于放大向量
     */
    this.rgd.applyForce(
      new Vec3(this.moveDir.y, 0, this.moveDir.x).multiplyScalar(this.moveForce)
    );
  }
}
