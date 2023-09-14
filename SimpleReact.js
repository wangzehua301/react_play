//组件类
class Component {
  constructor(props){
    this.props = props;
    this.state = {};
    //将组件实例与真实的dom关联起来
    this.__dom = null;
  }
  setState(newState) {
    //更新state
    this.state = {...this.state, ...newState};
    this.__update()
  }
  __update(){
    console.log('gengxn',this)
    if(this.__dom){
      const newElement = this.render()
      console.log(newElement, this.__dom.parentNode)
      render(newElement, this.__dom.parentNode, this.__dom)
    }
  }
}

//创建虚拟DOM元素的函数
// 接收类型、属性、子元素
function createElement(type, props, ...children){
  const self = this
  // 返回虚拟DOM对象
  return {
    type,
    props: {
      ...props,
      // 处理子元素,转化为虚拟DOM对象
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)  
      )
    },
    self,
  };
}

// 创建文本类型的虚拟DOM元素
function createTextElement(text) {
  
  // 返回文本虚拟DOM对象
  return {
    type: 'TEXT_ELEMENT', 
    props: {
      nodeValue: text,
      children: []  
    }
  };
}

// 将虚拟DOM渲染到真实DOM中的函数 
function render(element, container, oldDom = null){
  // 创建对应类型的真实DOM
  const dom = element.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(element.type);
  // 过滤非children的属性,设置到DOM上
  const isProperty = key => key !== 'children';
  const isEvent = key => key.startsWith('on');
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      //处理事件绑定
      if(isEvent(name)){
        //获取事件名
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, element.props[name])
      }else{
        dom[name] = element.props[name];
      }
    });

    //关联__dom
    if(element.self){
      element.self.__dom = dom
    }
  

  // 处理children属性 递归渲染子元素
  element.props?.children?.forEach(child => 
    render(child, dom)
  );

  if(oldDom){
    console.log('geng')
    container.replaceChild(dom, oldDom);
  }else{
    // 添加到容器中
    container.appendChild(dom);
  }
}


// 导出方法
export default {
  Component,
  createElement,
  render
};