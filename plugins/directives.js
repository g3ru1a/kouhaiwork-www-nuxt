import Vue from "vue";

// Vue.directive("click-outside", {
// 	bind: function(el, binding, vnode) {
// 		el.clickOutsideEvent = function(event) {
// 			// here I check that click was outside the el and his children
// 			if (!(el.contains(event.target))) {
// 				// and if it did, call method provided in attribute value
// 				vnode.context[binding.expression](event);
//             console.log(el);
// 			}
// 		};
// 		document.body.addEventListener("click", el.clickOutsideEvent);
// 	},
// 	unbind: function(el) {
// 		document.body.removeEventListener("click", el.clickOutsideEvent);
// 	}
// });
