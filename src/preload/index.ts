import {contextBridge} from 'electron';

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child);
    }
    return undefined;
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child);
    }
    return undefined;
  },
};

function useLoading() {
  const styleContent = `
    .app-loading-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: #282c34;
      z-index: 9;
      overflow: hidden;
    }
    .app-loading-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
`;
  const oStyle = document.createElement('style');
  const oDiv = document.createElement('div');

  oStyle.id = 'app-loading-style';
  oStyle.innerHTML = styleContent;
  oDiv.className = 'app-loading-wrap';

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const {appendLoading, removeLoading} = useLoading();

domReady().then(() => {
  appendLoading();
});

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading();
};

const ElectronAPI = {}

contextBridge.exposeInMainWorld('ElectronAPI', ElectronAPI);

