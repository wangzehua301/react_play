还不支持 重新渲染，更新视图；
原因：component组件和真实dom暂无无法关联
解法：通过SimpleReact.createElement.call获取到虚拟dom的实例，然后再与真实dom绑定；

todo--实现抽象类组件；