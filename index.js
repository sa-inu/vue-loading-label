import Vue from 'vue';
import Component from './LoadingLabel.vue';

const LoadingLabelConstructor = Vue.extend(Component);

let instance;
const options = {
  msg: '',
  showIcon: true,
  iconClass: '',
  clearTime: 4000,
};

function LoadingLabelAttributeError (message) {
  this.message = message;
  this.name = 'LoadingLabelAttributeError';
}

function LoadingLabelNotSetLoadingLabelDirective(message) {
  this.message = message;
  this.name = 'LoadingLabelNotSetLoadingLabelDirective';
}

const checkAttributes = (opts) => {
  if (typeof(opts.msg) !== 'string')
    throw new LoadingLabelAttributeError(`Msg option expect string, got ${typeof(opts.msg)}`);

  if (typeof(opts.showIcon) !== 'boolean')
    throw new LoadingLabelAttributeError(`ShowIcon option expect boolean, got ${typeof(opts.showIcon)}`);

  if (typeof(opts.iconClass) !== 'string')
    throw new LoadingLabelAttributeError(`IconClass option expect string, got ${typeof(opts.iconClass)}`);

  if (typeof(opts.clearTime) !== 'number')
    throw new LoadingLabelAttributeError(`ClearTime option expect number, got ${typeof(opts.clearTime)}`);

  if (opts.clearTime < 0)
    throw new LoadingLabelAttributeError('ClearTime option expect positive number, got negative number');

  return true;
};

const existDirective = () => {
  throw new LoadingLabelNotSetLoadingLabelDirective('Not found v-loading-label directive. You should call "v-loading-label" directive.');
};

const directive = {
  bind(el) {
    const html = document.createElement('loading-label');
    if (!html) {
      existDirective();
    }
    el.appendChild(html);
    instance = new LoadingLabelConstructor({
      el: html,
    });
  }
};

const service = {
  loading(opts) {
    const payload = Object.assign({}, options, opts);
    checkAttributes(payload);
    instance.loading(payload);
  },
  completed(opts) {
    const payload = Object.assign({}, options, opts);
    checkAttributes(payload);
    instance.completed(payload);
  },
  failed(opts) {
    const payload = Object.assign({}, options, opts);
    checkAttributes(payload);
    instance.failed(payload);
  }
};

const LoadingLabelPlugin = {
  install(_Vue) {
    console.log('[vue] install loading-label');

    Vue.directive('loading-label', directive);

    _Vue.prototype.$loadingLabel = service;
  }
};

export default LoadingLabelPlugin;
