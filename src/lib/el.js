export default (tagName, attrs, children, listeners) => {
  const el = document.createElement(tagName);

  if (attrs) {
    Object.keys(attrs).forEach((name) => {
      el.setAttribute(name, attrs[name]);
    });
  }

  if (children) {
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
  }

  if (listeners) {
    Object.keys(listeners).forEach((eventName) => {
      el.addEventListener(eventName, listeners[eventName]);
    });
  }

  return el;
};
