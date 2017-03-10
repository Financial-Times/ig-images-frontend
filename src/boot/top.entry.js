// see if browser cuts the mustard
{
  const supportsDragAndDrop = (() => {
    const div = document.createElement('div');
    return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
  })();

  const supportsFileReader = 'FormData' in window && 'FileReader' in window;

  const supportsAsyncFunctions = (() => {
    try {
      Function('async () => {}')(); // eslint-disable-line no-new-func
    } catch (error) {
      return false;
    }

    return true;
  })();

  window.cutsTheMustard = supportsDragAndDrop && supportsFileReader && supportsAsyncFunctions;
}

const addScript = (src, attributes, cb) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;

  if (attributes) {
    Object.keys(attributes).forEach((name) => {
      script.setAttribute(name, attributes[name]);
    });
  }

  const head = document.head || document.getElementsByTagName('head')[0];

  if (typeof cb === 'function') {
    let called;
    const onScriptLoaded = () => {
      const readyState = script.readyState;
      if (!readyState || /loaded|complete/.test(readyState)) {
        if (!called) {
          called = true;
          cb();
        }
      }
    };

    script.onload = onScriptLoaded;
    script.onerror = onScriptLoaded;
    script.onreadystatechange = onScriptLoaded;
  }

  head.appendChild(script);

  return script;
};

// set up page (for ctm-passing browsers)
if (window.cutsTheMustard) {
  // make a global boot-controlling singleton
  const bootController = Object.create(null, {
    waitForCondition: {
      value: (name, action) => {
        const key = `condition${name}`;

        const listener = (event) => {
          document.removeEventListener(key, listener);
          action(event);
        };

        if (window[key]) action();
        else document.addEventListener(key, listener);
      },
    },

    fireCondition: {
      value: (name) => {
        const key = `condition${name}`;

        if (!window[key]) {
          let ev;
          try {
            ev = new CustomEvent(key);
          } catch (e) {
            ev = document.createEvent('CustomEvent');
            ev.initCustomEvent(key, false, false, null);
          }
          document.dispatchEvent(ev);
          window[key] = 1;
        }
      },
    },
  });

  Object.defineProperty(window, 'bootController', { value: bootController });

  // fix <html> classes
  const classList = document.documentElement.classList;
  classList.remove('core');
  classList.add('enhanced');

  // add polyfill
  {
    const features = [
      'default',
    ].join(',');

    const polyfillUrl = `https://cdn.polyfill.io/v2/polyfill.min.js?features=${features}`;

    addScript(polyfillUrl, { crossorigin: 'anonymous' }, () => {
      bootController.fireCondition('Polyfilled');
    });
  }

  // add main script
  addScript('main.entry.js');
}
