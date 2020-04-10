---
sidebar: auto
sidebarDepth: 3
---

# Vugel
Vugel is a WebGL runtime for Vue3. This means you can use Vue3 for WebGL the same way as you could for a DOM. 
This means that it supports all Vue3 features, like props and reactivity.

Vugel is based on the [tree2d](https://github.com/Planning-nl/tree2d) library, which is a high-performance WebGL UI library.
Tree2d itself depends on [flexbox.js](https://github.com/Planning-nl/flexbox.js) library, which allows you to use flexbox in WebGL.

::: warning
Vugel and these docs are still WIP. Use at own risk!
:::

## Getting started
To get started, first install the Vugel package from NPM:
``` bash
yarn add vugel 
# OR npm install vugel
```
Make sure the `vue` package is installed!

Currently, using Vugel requires using our custom loader and requires some custom Webpack configuration. 
This is to get SFC's to work.

A full example repository can be found [here](https://github.com/Planning-nl/vugel-example).

### Webpack config
In order to use Vugel, you need a custom `vue-loader`, until [this PR](https://github.com/vuejs/vue-loader/pull/1645) gets merged. 
This can be installed as such:
``` bash
yarn add git+ssh://git@github.com:Planning-nl/vue-loader.git#feat/multiple-compilers-build 
# OR npm install git+ssh://git@github.com:Planning-nl/vue-loader.git#feat/multiple-compilers-build
```

Then you need to add the following snippet to the `module.rules` array in your `webpack.config.js` file:
```js
{
    test: /\.vue$/,
    use: {
        loader: "vue-loader",
        options: {
            templateCompilers: {
                vugel: { compiler: require("vugel"), compilerOptions: {} },
            },
        },
    },
},
```

### Component
To create a canvas with Vugel, you simply use the `vugel` component, as such:
```vue
<template>
    <vugel>
        <!-- your code! -->
    </vugel>
</template>

<script lang="ts">
import { Vugel } from "vugel";

export default {
    name: "MyBaseComponent",
    components: { Vugel },
};
</script>
```

To use custom components which are fully rendered using Vugel, it is required to annotate those components with the `compiler` attribute:
```vue
<template compiler="vugel">
    <!-- your code! -->
</template>

<script lang="ts">
export default {
    name: "MyWebGLComponent",
};
</script>
```

## Nodes
Vugel exposes a few "native" tags, for example `<rectangle/>`. Some of these can be compared to their DOM counterparts.

All the attributes passed to these elements will be passed to tree2d. 

### Root

### Container
> Comparable to `div`

### Image
> Comparable to `image`

### Rectangle

### Text

### Paragraph
> Comparable to `p`

### Special rectangle

### Drawing

### Texture

### SVG
> Comparable to `svg`

### Grayscale

### Rounded

### Shader

### Box-blur

## Events
Events emitted in Vugel are pretty close to their corresponding DOM events, with some differences.

Every event has a different type than the original event. It was chosen to do it this way as to be able to ensure that the expected behavior is actually followed.

### Mouse events
All mouse events supported by DOM are supported by Vugel, and are translated into their own structure.

Every mouse event will include the following fields:
- `canvasOffsetX` / `canvasOffsetY`: the offset of the mouse w.r.t. the canvas
- `elementOffsetX` / `elementOffsetY`: the offset of the mouse w.r.t. the current element
- `currentElement`: the currently selected element

## Examples
