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

### Application
To create a canvas with Vugel, you simply use the `vugel` component, as such:
```vue
<template>
    <vugel :settings="{clearColor: 0xff000000}">
        <my-vugel-root-component exampleProp="hello" />
    </vugel>
</template>

<script lang="ts">
import { Vugel } from "vugel";
import { MyVugelRootComponent } from "MyVugelRootComponent.vue";

export default {
    name: "MyBaseComponent",
    components: { Vugel, MyVugelRootComponent },
};
</script>
```

The available vugel settings are used for creating a new tree2d stage. They define, for example, the background of the 
canvas (in hexadecimal argb notation). See [StageOptions.ts](https://github.com/Planning-nl/tree2d/blob/master/src/tree/StageOptions.ts) 
for a full list of options.

> You should only specify your root component(s) in the `<vugel>` tag, not vugel tags. Vugel tags should only be placed
> in pure vugel components, because the vue3 compiler doesn't support mixing html and vugel tags within the same template.

#### Vugel components

To use custom components which are fully rendered using Vugel, it is required to annotate those components with the `compiler` attribute:
```vue
<template compiler="vugel">
    <container>
        <rectangle :x="10" :y="10" :w="width" :h="100" :color="0xffff0000"></rectangle>
        <text :x="10" :y="140" :font-size="10" :font-weight="600">hello world</text>
        <image :x="10" :y="240" src="./logo.png" />
    </container>
</template>

<script lang="ts">
export default {
    name: "MyVugelRootComponent",
    setup() {
        const width = ref(0);
        setInterval(() => {
            width.value++;
        }, 20);
        return {width};
    }
};
</script>
```

## Nodes
Vugel exposes a few "native" tags, for example `<rectangle/>`. Some of these can be compared to their DOM counterparts.

All the attributes passed to these elements will be passed to tree2d. 

### Container
Comparable to a `div` element in HTML.

May contain other elements.  

### `image`
Comparable to the `img` tag.

Render an image specified by the `src` property. 

### `rectangle`
A container that has a solid background or linear gradient. The color can be specified using the properties `color`.

Gradients can be specified by setting the different corner point colors using `colorTop`, `colorRight`, `colorBottom`,
`colorLeft`, `colorUl` (upper-left), `colorUr` (upper-right), `colorBr` (bottom-right), `colorBl` (bottom-left). 

::: tip
These color properties are also available for all other renderable elements, such as `image` and `text` elements. In
that case it provides texture tinting.
:::

### `text`
A simple piece of (non-wrapping) text. Several styling-related properties can be specified.

### `paragraph`
Breaks down the text contents by word and wraps it to the current width of the paragraph. 

::: tip Note
The paragraph element currently only support a single piece of text with the same styles. 
:::

### `special-retangle`
While rectangle is a really lightweight element that is ultra fast to render (because it does not need a texture), it
offers no other features. The `special-rectangle` supports rounded edges, stroke and shadows. It renders to a texture
and is therefor less efficient to create and slightly less efficient to render.

### `drawing`
Allows you to use a canvas2d rendering context to draw a custom texture. The `onDraw` property must be set with your
custom drawing function in the form:

```typescript
export type DrawingFunction = (
    context: CanvasRenderingContext2D,
    w: number,
    h: number,
) => DrawingResult | Promise<DrawingResult>;

export type DrawingResult = {
    permanent?: boolean;
    renderInfo?: any;
    texParams?: Record<GLenum, GLenum>;
    texOptions?: {
        format?: number;
        internalFormat?: number;
        type?: GLenum;
    };
};
```

The `onDraw` function will be invoked automatically when the element dimensions change.

### `texture`
This allows using a [tree2d native texture](https://github.com/Planning-nl/tree2d/tree/master/src/textures) directly 
within an element.

### SVG
Renders an svg file (set by the `src` property) for the available width and height.

### Grayscale
The contents of this element are rendered in grayscale. 

::: tip Note
Notice that the contents are pre-rendered to an 'intermediate' texture with the dimensions of this element. This means 
that if the element has no width or height, nothing will be visible!
:::

### Rounded
The contents of this element are rendered in a rounded shape. The corner radius can be specified the `radius` property. 

### Shader
The contents of this element are rendered using a [tree2d native shader](https://github.com/Planning-nl/tree2d/tree/master/src/renderer/webgl/shaders).

### Box-blur
The contents of this element are rendered box-blurred. Box blur is a very slight but high-performance blur effect.

## Layout
TODO: positioning, mounting, w, h, flexbox.

## Transforms
TODO: scaling, rotation, pivot.

## Rendering
TODO: clipping, renderToTexture, z-index, texture clipping / resize modes

## Lifecycle
TODO: lifecycle events (onSetup etc)

## UI Events
Events emitted in Vugel are pretty close to their corresponding DOM events, with some differences.

Every event has a different type than the original event. It was chosen to do it this way as to be able to ensure that 
the expected behavior is actually followed.

A `VugelEvent` has the following properties:

- `cancelBubble: boolean`: Set to `true` to cancel event bubbeling.
- `currentTarget: Node | null`: 'This' node (while bubbeling).
- `target: Node | null`: The event target node (while bubbeling).
- `type: string`: The event name
- `originalEvent: Event`: The original DOM Event is available using the `originalEvent` property.
 
### Mouse events
All mouse events supported by DOM are supported by Vugel, and are translated into their own structure.

Supported mouse events:
- `mousemove`
- `mouseover`
- `mouseout`
- `mouseenter`
- `mouseleave`

Every mouse event will additionally include the following fields:
- `canvasOffsetX` / `canvasOffsetY`: the offset of the mouse w.r.t. the canvas
- `elementOffsetX` / `elementOffsetY`: the offset of the mouse w.r.t. the current element
- `currentElement: { offsetX: number; offsetY: number; element: Element; }`: The tree2d target and offset.

### Touch events
Touch events are not supported in the regular sense. Instead, we currently only use the first touch and translate it to 
the mouse corresponding event. 

### Focus events
Supported events:
- `focusin`
- `focusout`
- `focus`
- `blur`

Additional event fields:
- `relatedTarget: Node | null`: The previous (in case of `focusin`, `focus` events) or new (`focusout`, `blur`) focused node.

### Keyboard events
Supported events:
- `keypress`
- `keydown`
- `keyup`
