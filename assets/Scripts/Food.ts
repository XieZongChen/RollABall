import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Food')
export class Food extends Component {
  @property
  public rotateSpeed: number = 90;

  start() {}

  update(deltaTime: number) {
    // 给食物添加自旋转动画
    const eulerAngles = this.node.eulerAngles;
    const newY = eulerAngles.y + this.rotateSpeed * deltaTime;
    this.node.eulerAngles = new Vec3(eulerAngles.x, newY, eulerAngles.z);
  }
}
