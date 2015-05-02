/**
@module ember
@submodule ember-htmlbars
*/

import Component from 'ember-views/views/component';

export default function bindShadowScope(env, parentScope, shadowScope, options) {
  if (!options) { return; }

  var view = options.view;
  if (view && !(view instanceof Component)) {
    newStream(shadowScope.locals, 'view', view, null);
    newStream(shadowScope.locals, 'controller', shadowScope.locals.view.getKey('controller'));

    if (view.isView) {
      newStream(shadowScope, 'self', shadowScope.locals.view.getKey('context'), null, true);
    }
  }

  shadowScope.view = view;

  if (view && options.attrs) {
    shadowScope.component = view;
  }

  shadowScope.attrs = options.attrs;

  return shadowScope;
}

import ProxyStream from "ember-metal/streams/proxy-stream";
import subscribe from "ember-htmlbars/utils/subscribe";

function newStream(scope, key, newValue, renderNode, isSelf) {
  var stream = new ProxyStream(newValue, isSelf ? '' : key);
  if (renderNode) { subscribe(renderNode, scope, stream); }
  scope[key] = stream;
}