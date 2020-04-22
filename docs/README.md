---
sidebar: auto
sidebarDepth: 3
---

# Vugel
Vugel is a WebGL-powered 2d renderer for Vue 3. It provides an alternative to DOM rendering, with less features, but better
 performance in terms of element creation and rendering.

Vugel is designed to be part of a 'normal' Vue 3 DOM-based application. This means that you can
share the same state (vuex) and properties. 
 
Typical use cases for Vugel include games and charts, or other many-elements cases where runtime performance is essential.

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

A repository containing several examples can be found on [https://vugel-example.planning.nl](https://vugel-example.planning.nl).

### Web bundle
Have a look at [this codepen](https://codepen.io/basvanmeurs/pen/vYNGRGP?editors=1010) on how to include Vugel.

### Webpack config
In order to use Vugel with SFC components, you need a custom `vue-loader`, until [this PR](https://github.com/vuejs/vue-loader/pull/1645) gets merged. 
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

Working with Vugel is just like you'd normally do with HTML elements in Vue3. In general you can use all Vue3 features. 
The available tags, events and attributes are different. 

Vugel itself provides a component which spawns a HTMLCanvasElement. To create a canvas with Vugel, you simply use 
the `vugel` component, as such:
```vue
<template>
    <vugel :settings="{clearColor: 0xff000000}" style="width: 500px; height: 500px">
        <my-vugel-root-component example-prop="hello world" />
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

Notice that in the `<vugel>` tag you must always use a single vugel root component (also without v-if).

> The reason for this limitation is that Vugel requires its own compiler, and in this scope the DOM compiler is still active.

The available vugel `:settings` are used for creating a new tree2d stage. They define, for example, the background of the 
canvas (in hexadecimal argb notation). See [StageOptions.ts](https://github.com/Planning-nl/tree2d/blob/master/src/tree/StageOptions.ts) 
for a full list of options.

::: warning
You should only specify your root component(s) in the `<vugel>` tag, not vugel tags. Vugel tags should only be placed
in pure Vugel components, because the Vue3 compiler doesn't support mixing HTML and Vugel tags within the same template.
:::

#### Vugel components

To use custom SFC components which are fully rendered using Vugel, it is required to annotate those components with the
 `compiler` attribute:
 
```vue
<template compiler="vugel">
    <container>
        <rectangle :x="10" :y="10" :w="width" :h="100" :color="0xffff0000" />
        <text :x="10" :y="140" :font-size="10" :font-weight="600">{{ exampleProp }}</text>
    </container>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
    props: {
        exampleProp: { type: String, default: "" },
    },
    setup() {
        const width = ref(0);
        setInterval(() => {
            width.value++;
        }, 20);
        return { width };
    },
};
</script>
```

## Nodes
Vugel provides a set of native tags and attributes comparable, but different, to HTML DOM.

### [`container`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/Container.ts)
Comparable to a `div` html element.

### [`picture`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Picture.ts)
Comparable to the `img` html element.

Render an image specified by the `src` property. 

> Make sure that your pictures are local or allow CORS. This is required for WebGL to be able to use them. 

### [`rectangle`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Rectangle.ts)
A container that has a solid background or linear gradient. The color can be specified using the properties `color`.

Gradients can be specified by setting the different corner point colors using `colorTop`, `colorRight`, `colorBottom`,
`colorLeft`, `colorUl` (upper-left), `colorUr` (upper-right), `colorBr` (bottom-right), `colorBl` (bottom-left). 

::: tip
These color properties are also available for all other renderable elements, such as `image` and `text` elements. In
that case it provides texture tinting.
:::

### [`text`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/TextTexture.ts)
A simple piece of (non-wrapping) text. Several styling-related properties [can be specified](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/TextTextureSettings.ts).

### [`paragraph`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/Paragraph.ts)
Breaks down the text contents by word and wraps it to the current width of the paragraph. 

::: tip Note
The paragraph element currently only support a single piece of text with the same styles. 
:::

### [`styled-retangle`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/StyledRectangle.ts)
While rectangle is a really lightweight element that is ultra fast to render, it offers features other than linear gradients. 
The `styled-rectangle` supports rounded edges, stroke and shadows. It needs to be created using a canvas2d and uploaded 
to the GPU. This causes a hefty performance penalty (but only upon the first frame that it is shown). 

### [`drawing`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Drawing.ts)
Allows you to use a canvas2d rendering context to draw a custom texture. The `onDraw` property must be set with your
custom drawing function in the form:

```typescript
export type DrawingFunction = (options: DrawingFunctionOptions) => DrawingResult | Promise<DrawingResult>;

export type DrawingFunctionOptions = {
    context: CanvasRenderingContext2D;
    w: number;
    h: number;
};

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

> You can trigger a manual redraw by invoking the update() method on a drawing tag. You can use a `ref` to obtain a 
> reference to the element first. 

### [`texture`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Texture.ts)
There are advanced use cases where the `drawing` tag is not flexible enough. For example if you'd want to upload an 
UInt8Array as a WebGL texture source. The `texture` tag allows you to use a [tree2d native texture](https://github.com/Planning-nl/tree2d/tree/master/src/textures) directly. 

### [`svg`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Svg.ts)
Renders an svg file (set by the `src` property) for the available width and height.

### [`grayscale`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/Grayscale.ts)
The contents of this element are rendered in grayscale. 

::: tip Note
Notice that the contents are pre-rendered to an 'intermediate' texture with the dimensions of this element. This means 
that if the `grayscale` element receives no width or height, nothing will be visible!
:::

### [`rounded`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/Rounded.ts)
The contents of this element are rendered in a rounded shape. The corner radius can be specified the `radius` property.

An intermediate texture is used, so you should make sure that the element has width and height. 

### [`shader`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/Shader.ts)
The contents of this element are rendered using a [tree2d native shader](https://github.com/Planning-nl/tree2d/tree/master/src/renderer/webgl/shaders).

An intermediate texture is used, so you should make sure that the element has width and height. 

### [`box-blur`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/BoxBlur.ts)
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
UI Events supported by Vugel are kept similar to DOM UI events.

There are some differences.

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
Touch events are not supported in the regular sense. Instead, we provide basic touch support by converting the first 
touch and translating it to the corresponding mouse event. 

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
