(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{249:function(t,a,s){"use strict";s.r(a);var e=s(28),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vugel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vugel"}},[t._v("#")]),t._v(" Vugel")]),t._v(" "),s("p",[t._v("Vugel is a WebGL runtime for Vue3. This means you can use Vue3 for WebGL the same way as you could for a DOM.\nThis means that it supports all Vue3 features, like props and reactivity.")]),t._v(" "),s("p",[t._v("Vugel is based on the "),s("a",{attrs:{href:"https://github.com/Planning-nl/tree2d",target:"_blank",rel:"noopener noreferrer"}},[t._v("tree2d"),s("OutboundLink")],1),t._v(" library, which is a high-performance WebGL UI library.\nTree2d itself depends on "),s("a",{attrs:{href:"https://github.com/Planning-nl/flexbox.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("flexbox.js"),s("OutboundLink")],1),t._v(" library, which allows you to use flexbox in WebGL.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("Vugel and these docs are still WIP. Use at own risk!")])]),t._v(" "),s("h2",{attrs:{id:"getting-started"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[t._v("#")]),t._v(" Getting started")]),t._v(" "),s("p",[t._v("To get started, first install the Vugel package from NPM:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" vugel \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# OR npm install vugel")]),t._v("\n")])])]),s("p",[t._v("Make sure the "),s("code",[t._v("vue")]),t._v(" package is installed!")]),t._v(" "),s("p",[t._v("Currently, using Vugel requires using our custom loader and requires some custom Webpack configuration.\nThis is to get SFC's to work.")]),t._v(" "),s("p",[t._v("A full example repository can be found "),s("a",{attrs:{href:"https://github.com/Planning-nl/vugel-example",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("h3",{attrs:{id:"webpack-config"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-config"}},[t._v("#")]),t._v(" Webpack config")]),t._v(" "),s("p",[t._v("In order to use Vugel, you need a custom "),s("code",[t._v("vue-loader")]),t._v(", until "),s("a",{attrs:{href:"https://github.com/vuejs/vue-loader/pull/1645",target:"_blank",rel:"noopener noreferrer"}},[t._v("this PR"),s("OutboundLink")],1),t._v(" gets merged.\nThis can be installed as such:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" git+ssh://git@github.com:Planning-nl/vue-loader.git"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#feat/multiple-compilers-build ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# OR npm install git+ssh://git@github.com:Planning-nl/vue-loader.git#feat/multiple-compilers-build")]),t._v("\n")])])]),s("p",[t._v("Then you need to add the following snippet to the "),s("code",[t._v("module.rules")]),t._v(" array in your "),s("code",[t._v("webpack.config.js")]),t._v(" file:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    test"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/\\.vue$/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    use"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        loader"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vue-loader"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        options"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            templateCompilers"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                vugel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" compiler"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vugel"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" compilerOptions"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),s("h3",{attrs:{id:"component"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#component"}},[t._v("#")]),t._v(" Component")]),t._v(" "),s("p",[t._v("To create a canvas with Vugel, you simply use the "),s("code",[t._v("vugel")]),t._v(" component, as such:")]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("vugel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- your code! --\x3e")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("vugel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ts"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Vugel "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vugel"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyBaseComponent"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    components"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Vugel "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("To use custom components which are fully rendered using Vugel, it is required to annotate those components with the "),s("code",[t._v("compiler")]),t._v(" attribute:")]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("compiler")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("vugel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- your code! --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ts"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyWebGLComponent"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h2",{attrs:{id:"nodes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nodes"}},[t._v("#")]),t._v(" Nodes")]),t._v(" "),s("p",[t._v('Vugel exposes a few "native" tags, for example '),s("code",[t._v("<rectangle/>")]),t._v(". Some of these can be compared to their DOM counterparts.")]),t._v(" "),s("p",[t._v("All the attributes passed to these elements will be passed to tree2d.")]),t._v(" "),s("h3",{attrs:{id:"root"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#root"}},[t._v("#")]),t._v(" Root")]),t._v(" "),s("h3",{attrs:{id:"container"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#container"}},[t._v("#")]),t._v(" Container")]),t._v(" "),s("blockquote",[s("p",[t._v("Comparable to "),s("code",[t._v("div")])])]),t._v(" "),s("h3",{attrs:{id:"image"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#image"}},[t._v("#")]),t._v(" Image")]),t._v(" "),s("blockquote",[s("p",[t._v("Comparable to "),s("code",[t._v("image")])])]),t._v(" "),s("h3",{attrs:{id:"rectangle"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rectangle"}},[t._v("#")]),t._v(" Rectangle")]),t._v(" "),s("h3",{attrs:{id:"text"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#text"}},[t._v("#")]),t._v(" Text")]),t._v(" "),s("h3",{attrs:{id:"paragraph"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#paragraph"}},[t._v("#")]),t._v(" Paragraph")]),t._v(" "),s("blockquote",[s("p",[t._v("Comparable to "),s("code",[t._v("p")])])]),t._v(" "),s("h3",{attrs:{id:"special-rectangle"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#special-rectangle"}},[t._v("#")]),t._v(" Special rectangle")]),t._v(" "),s("h3",{attrs:{id:"drawing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#drawing"}},[t._v("#")]),t._v(" Drawing")]),t._v(" "),s("h3",{attrs:{id:"texture"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#texture"}},[t._v("#")]),t._v(" Texture")]),t._v(" "),s("h3",{attrs:{id:"svg"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#svg"}},[t._v("#")]),t._v(" SVG")]),t._v(" "),s("blockquote",[s("p",[t._v("Comparable to "),s("code",[t._v("svg")])])]),t._v(" "),s("h3",{attrs:{id:"grayscale"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#grayscale"}},[t._v("#")]),t._v(" Grayscale")]),t._v(" "),s("h3",{attrs:{id:"rounded"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rounded"}},[t._v("#")]),t._v(" Rounded")]),t._v(" "),s("h3",{attrs:{id:"shader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shader"}},[t._v("#")]),t._v(" Shader")]),t._v(" "),s("h3",{attrs:{id:"box-blur"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#box-blur"}},[t._v("#")]),t._v(" Box-blur")]),t._v(" "),s("h2",{attrs:{id:"events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),s("p",[t._v("Events emitted in Vugel are pretty close to their corresponding DOM events, with some differences.")]),t._v(" "),s("p",[t._v("Every event has a different type than the original event. It was chosen to do it this way as to be able to ensure that the expected behavior is actually followed.")]),t._v(" "),s("h3",{attrs:{id:"mouse-events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mouse-events"}},[t._v("#")]),t._v(" Mouse events")]),t._v(" "),s("p",[t._v("All mouse events supported by DOM are supported by Vugel, and are translated into their own structure.")]),t._v(" "),s("p",[t._v("Every mouse event will include the following fields:")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("canvasOffsetX")]),t._v(" / "),s("code",[t._v("canvasOffsetY")]),t._v(": the offset of the mouse w.r.t. the canvas")]),t._v(" "),s("li",[s("code",[t._v("elementOffsetX")]),t._v(" / "),s("code",[t._v("elementOffsetY")]),t._v(": the offset of the mouse w.r.t. the current element")]),t._v(" "),s("li",[s("code",[t._v("currentElement")]),t._v(": the currently selected element")])]),t._v(" "),s("h2",{attrs:{id:"examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")])])}),[],!1,null,null,null);a.default=n.exports}}]);