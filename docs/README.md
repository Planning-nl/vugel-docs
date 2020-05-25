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

Vugel does not (directly) allow WebGL based 3d graphics. However, it does support custom shaders.

## Getting started
To get started, first install the Vugel package from NPM:
``` bash
yarn add vugel 
# OR npm install vugel
```
Vugel has a peer dependency on vue3. Make sure that the `vue` (version 3) package is installed!

A repository containing several examples can be found on [https://vugel-example.planning.nl](https://vugel-example.planning.nl).

### Web bundle
Have a look at [this codepen](https://codepen.io/basvanmeurs/pen/vYNGRGP?editors=1010) on how to include Vugel.

### Webpack config
In order to use Vugel with SFC components, you need a custom `vue-loader`, until [this PR](https://github.com/vuejs/vue-loader/pull/1645) gets merged. 
This can be installed as such:
``` bash
yarn add git+https://github.com/Planning-nl/vue-loader.git#feat/multiple-compilers-build 
# OR npm install git+https://github.com/Planning-nl/vue-loader.git#feat/multiple-compilers-build
```

Then you need to add the following snippet to the `module.rules` array in your `webpack.config.js` file:
```js
{
    test: /\.vue$/,
    use: {
        loader: "vue-loader",
        options: {
            templateCompilers: {
                vugel: [ require("vugel"), {} ],
            },
        },
    },
},
```

### Application

Working with Vugel is just like you'd normally do with HTML elements in Vue3. In general you can use all Vue3 features. 

The available tags, events and attributes are different. 

Vugel itself provides a component which spawns a `HTMLCanvasElement`. To create a canvas with Vugel, you simply use 
the `vugel` component, as such:
```vue
<template>
    <vugel :settings="{clearColor: 'black'}" style="width: 500px; height: 500px">
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

::: warning
You should only specify your root component(s) (without using `v-if`) in the `<vugel>` tag, not Vugel tags. Vugel tags should only be placed
in pure Vugel components, because the Vue3 compiler currently doesn't support mixing HTML and Vugel tags within the same template.
:::

::: warning
The vugel tag creates a `HTMLCanvasElement` wrapped by a `HTMLDivElement`. All styles are applied to this wrapper element.
The wrapper element needs to detect the width and height of the canvas automatically. For this purpose it specifies a
single inline style rule: `position:relative`. This can potentially interfere with your own stylesheets.
:::

The available Vugel `:settings` are used for creating a new tree2d stage. They define, for example, the background of the 
canvas and memory settings. 

## Vugel Settings

| Name | Type | Description |
| ---- | ---- | ----------- |
| eventsTarget | `HTMLElement` | Target to bind event listeners to. Defaults to the canvas element |
| clearColor | `number` or `string` or `null` | Background color |
| gpuPixelsMemory | `number` | When this amount of pixels is reached, no longer used textures are cleaned up |
| bufferMemory | `number` | Defines the amount of items that can be drawn on a single frame |
| defaultFontFace | `string[]` | The default font face (+ fallbacks) to use |
| useImageWorker | `boolean` | Use off-threaded image parsing (default is `true`) |
| autostart | `boolean` | When set to `false`, you must manually invoke `stage.drawFrame()` to re-render |
| pixelRatio | `number` | The pixelRatio to use. It is advisable to use 1, 1.5 or 2.0 to avoid artifacts |
| canvas2d | `boolean` | Enables canvas2d mode rendering, even when WebGL is available |

#### Vugel components

To use custom SFC components which are fully rendered using Vugel, it is required to annotate those components with the
 `compiler` attribute:
 
```vue
<template compiler="vugel">
    <container>
        <rectangle :x="10" :y="10" :w="width" :h="100" color="#ff0000" />
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
To view the available properties, please click on the tag name and view the source code of the class (and parent 
classes). *Use the force, read the source!*

Many of these tags are covered in the the [vugel-examples repository](https://vugel-example.planning.nl/).

### [`container`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/Container.ts)
Contains other nodes. Comparable to a `div` html element.

### [`picture`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Picture.ts)
Comparable to the `img` html element.

Loads and renders an image specified by the `src` property. 

> Make sure that your pictures are local or allow CORS. This is required for WebGL to be able to use them. 

### [`rectangle`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Rectangle.ts)
A container that has a solid background or linear gradient. The color can be specified using the properties `color`.

Gradients can be specified by setting the different corner point colors using `color-top`, `color-right`, `color-bottom`,
`color-left` etc.  

::: tip
These color properties are also available for all other renderable elements, such as `image` and `text` elements. In
that case it provides texture tinting.
:::

### [`text`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/TextTexture.ts)
A simple piece of (non-wrapping) text. Several styling-related properties [can be specified](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/TextTextureSettings.ts).

### [`paragraph`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/Paragraph.ts)
Breaks down the text contents by word and wraps it to the current width of the paragraph. 

::: tip Note
The paragraph element currently only supports a single piece of text with the same styles. 
:::

### [`styled-retangle`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/StyledRectangle.ts)
While rectangle is a really lightweight element that is ultra fast to render, it offers features other than linear gradients. 
The `styled-rectangle` supports rounded edges, stroke and shadows. It needs to be created using a canvas2d and uploaded 
to the GPU. This causes a hefty performance penalty (but only upon the first frame that it is shown). 

### [`drawing`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Drawing.ts)
Allows you to use a canvas2d rendering context to draw a custom texture. The `draw` event must be set with your
custom drawing function with the following type:

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

The `draw` event will be invoked automatically when the element dimensions change.

> You can trigger a manual redraw by invoking the `update()` method on a drawing tag. You can use a `ref` to obtain a 
> reference to the element first. 

### [`texture`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Texture.ts)
There are advanced use cases where the `drawing` tag is not flexible enough. For example if you'd want to upload an 
UInt8Array as a WebGL texture source. Or when you want to reuse the same texture object for performance reasons. 
The `texture` tag allows you to use a [tree2d native texture](https://github.com/Planning-nl/tree2d/tree/master/src/textures) directly. 

### [`svg`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/textures/Svg.ts)
Renders an svg file (set by the `src` property) for the available width and height.

### [`grayscale`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/Grayscale.ts)
The contents of this element are rendered in grayscale. 

::: tip Note
Notice that the contents are pre-rendered to an 'intermediate' texture with the dimensions of this element. This means 
that if the node has no width or height, nothing will be visible!
:::

### [`rounded`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/Rounded.ts)
The contents of this element are rendered in a rounded shape. The corner radius can be specified the `radius` property.

An intermediate texture is used, so you should make sure that the element has width and height. 

### [`shader`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/Shader.ts)
The contents of this element are rendered using a [tree2d native shader](https://github.com/Planning-nl/tree2d/tree/master/src/renderer/webgl/shaders).

An intermediate texture is used, so you should make sure that the element has width and height. 

### [`box-blur`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/effects/BoxBlur.ts)
The contents of this element are rendered box-blurred. Box blur is a very slight but high-performance blur effect.

### [`direct-container`](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/DirectContainer.ts)
In very specific cases you may wish to work around Vue templates/reactivity. Vue is great in almost all use cases, but 
direct mutations can be faster and offers more fine-grained control.

The direct container, in contrast to a normal container, allows you to add, remove and iterate over children directly
via several child-related methods. You can use the `create(type: Constructor<Node>)` method to create nodes that can be 
added to this direct container. These nodes are direct-containers themselves, allowing you to add children to them as
well.

For a list of child-mutating methods, see [https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/direct.ts#L11](https://github.com/Planning-nl/vugel/blob/master/src/runtime/nodes/direct.ts#L11).

> The `direct-container` tag should not contain children in a vue template.

## Layout
Vugel offers basic layouting that uses relative positioning. Additionally, it contains a flexbox layout engine which
covers more advanced use cases.

### Positioning
The `x` and `y` properties can be used to position the node relative to the parent node.
 
> A feature like `position:fixed` is not supported. We advice to use the vue **Teleport** feature.

Width and height can be set using `w` and `h`. When not specified (or set to `0`, the width and/or height of the current 
texture (picture, text, drawing, styled-rectangle, etc) are used instead.

The `mount-x` and `mount-y` properties are used to specify how the node should be aligned on the specified `x` and `y`
coordinates. When set to `0`, `(x, y)` defines the position of the top-left corner of the node. When set to `1` it 
defines the position of the bottom-right corner, and using a value of `0.5` for mount causes the node to be centered on
the `(x, y)` coordinates. The `mount` property is especially handy to align nodes for which the dimensions are not yet
known beforehand - or are dynamic.

### Relative functions
Like CSS has the `calc(..)` expression, Vugel offers something similar known as *relative functions*. Using
the properties `func-x`, `func-y`, `func-w` and `func-h` you can calculate the coordinates and dimensions dynamically.

```html
<rectangle func-x="0.5*w" func-y="0.5*h" func-w="0.25*w" func-h="Math.sqrt(0.25*w+0.5*h)+10" />
```  

All relative functions receive arguments `w` and `h`, which refer to the parent's (calculated) width and height. 

> You can either use a string to provide the function body, or refer to an actual function (like `<rectangle :func-x="myFunc" ..`). 
> String functions are usually more convenient. On top of that they are cached and reused, allowing them to be better 
> optimized by the javascript engine.

### Layout-related properties

| Property | type | CSS equivalent | Notes |
| -------- | ---- | -------------- |-----|
| `x` | `number` |  | Offset |
| `y` | `number` |  |  |
| `w` | `number` |  | Size; when 0 then texture's dimensions are inherited |
| `h` | `number` |  |  |
| `func-x` | `(w: number, h: number)` |  | When set, overrules the `x` property and (re)calculates it from the parent dimensions |
| `func-y` | `(w: number, h: number)` |  | |
| `func-w` | `(w: number, h: number)` |  |  |
| `func-h` | `(w: number, h: number)` |  |  |
| `mount` | `number` |  | Number between 0 and 1, sets both `mount-x` and `mount-y` |
| `mount-x` | `number` |  | Number between 0 and 1 |
| `mount-y` | `number` |  | Number between 0 and 1 |

### Layout-related methods

These Node methods can be used to obtain information on the Node's dynamic layout. 

| Method | Description |
| ------ | ----------- |
| `getLayoutX() : number` | post-layout `x` position |
| `getLayoutY() : number` | post-layout `y` position |
| `getLayoutW() : number` | post-layout width |
| `getLayoutH() : number` | post-layout height |

> The getLayout methods will return the value that was calculated during the last update cycle (what is currently 'on 
> screen'). Notice that you could manually force an update by invoking `node.stage.root.core.update()`;

### Layout-related events

| Event | arg | Description |
| ------ | --- | ----------- |
| `resize` | `{ node: Node; stage: Stage; w: number; h: number }` | Called whenever the node changes dimensions |

## Flexbox

Flexbox layouting is also supported. It's almost identical to the CSS Flexbox layout engine, but uses different 
properties.

### Flex container properties

These properties define the behavior of a flex container.

| Property | Type | CSS equivalent | Notes |
| -------- | ---- | -------------- |-----|
| `flex` | `true,false` | | When true, this node behaves as a flex container  |
| `flex-direction`| `'row','row-reverse','column','column-reverse'` | `flex-direction` | |
| `flex-wrap` | `true,false` | `flex-wrap` | `wrap-reverse` is not supported |
| `flex-align-items` | `'flex-start','flex-end','center','stretch'` | align-items | `baseline` not supported |
| `flex-align-content` | `'flex-start','flex-end','center','space-between','space-around','space-evenly','stretch'` | align-content | |
| `flex-justify-content` | `'flex-start','flex-end','center','space-between','space-around','space-evenly'` | justify-content | |
| `flex-padding` | `number` | `padding` | in pixels |
| `flex-padding-top` | `number` | `padding-top` | |
| `flex-padding-left` | `number` | `padding-left` | |
| `flex-padding-bottom` | `number` | `padding-bottom` | |
| `flex-padding-right` | `number` | `padding-right` | |

> When flex layout is active, the `x` and `y` properties will be added to the positions calculated by the flexbox layout engine.

>> When the `w` and/or `h` is set to the number `0`, it will **fit to the contents** in those directions.

### Flex item properties

These properties define the behavior of the child items of a flex container.

| Property | Type | CSS equivalent | Notes |
| -------- | ---- | -------------- |----|
| `flex-item` | `true,false` | | When false, this item will not affect the flex layout and will be positioned relatively |
| `flex-grow`| `number` | `flex-grow` | |
| `flex-shrink`| `number` | `flex-shrink` | The default value is 0 (in CSS it defaults to 1) |
| `flex-align-self` | `'flex-start','flex-end','center','stretch'` | `align-self` | |
|  |  | `order` | Not supported |
|  |  | `flex-basis` | Not supported (behavior is always as `flex-basis:auto`) |
| `min-width` | `number` | `min-width` | in pixels |
| `max-width` | `number` | `max-width` | in pixels |
| `min-height` | `number` | `min-height` | in pixels |
| `max-height` | `number` | `max-height` | in pixels |
| `margin` | `number` | `margin` | in pixels |
| `margin-top` | `number` | `margin-top` | |
| `margin-left` | `number` | `margin-left` | |
| `margin-bottom` | `number` | `margin-bottom` | |
| `margin-right` | `number` | `margin-right` | |

> Notice that nodes with the `visibile` property set to `false` are ignored in the layout. In contrast, nodes that have 
>`visibile` on `true`, but the `alpha` property set to `0` still take up space.

### Layout skipping
The `skip-in-layout` property can be used to **skip** the node while layouting. It's pretty advanced and usually you
won't need it. It can be handy in combination with vue component slots. By setting `skip-in-layout` to true on the nodes 
between the component root and the slot itself, you could layout the slot children as if they were immediate children of the component.

In this mode, flexbox behaves as if this skipped node was replaced by it's own children. This means that if the node 
itself was a flex item of a flex container, it's children will now become flex items of that flex container. 

It also affects relative layout function arguments (`w` or `h`). If the parent has `skip-in-layout` set to true, the 
grandparent's width and height will be used.

## Transforms

All Vugel nodes support a couple of linear transformations, available using a couple of properties:

| Property | Type | Default | Notes |
| -------- | ---- | ------- | ------ |
| `scale` | `number` | `1.0` | Horizontal and vertical scaling |
| `scale-x` | `number` | `1.0` | Horizontal scaling |
| `scale-y` | `number` | `1.0` | Vertical scaling |
| `rotation` | `number` | `0.0` | Rotation (radians) |
| `pivot` | `number` | `0.5` | Horizontal and vertical pivot position |
| `pivot-x` | `number` | `0.5` | Horizontal pivot position (0 = left, 0.5 = center, 1 = right) |
| `pivot-y` | `number` | `0.5` | Vertical pivot position (0 = top, 0.5 = center, 1 = bottom) |

## Textures
All visible tags (`picture`, `rectangle`, `text`, etc.) internally render a texture. You can control several aspects of
these textures and how they are being rendered.

### Visibility & tinting
All textures can be tinted to a specific color. Different corner points or sides can receive different colors to 
implement linear gradients.

| Property | Type | Default | Notes |
| -------- | ---- | ------- | ------ |
| `alpha` | `number` | `0.0` | Opacity, between 0.0 and 1.0 |
| `visible` | `boolean` | `true` | Visibility. When set to false, has same effect as `display:none` in CSS |
| `color` | `number` or `string` | `0xffffffff` | Color |
| `color-left` | `number` or `string` | `0xffffffff` | Left-side color |
| `color-right` | `number` or `string` | `0xffffffff` | Right-side color |
| `color-top` | `number` or `string` | `0xffffffff` | Top-side color |
| `color-bottom` | `number` or `string` | `0xffffffff` | Bottom-side color |
| `color-top-left` | `number` or `string` | `0xffffffff` | Top-left corner color |
| `color-top-right` | `number` or `string` | `0xffffffff` | Top-right corner color |
| `color-bottom-left` | `number` or `string` | `0xffffffff` | Bottom-left corner color |
| `color-bottom-right` | `number` or `string` | `0xffffffff` | Bottom-right corner color |

::: tip Note
The supported color formats are [CSS colors](https://github.com/Planning-nl/tree2d/blob/master/src/tree/ColorUtils.ts#L185), RGB(A), Hex and hexadecimal ARGB.
Using hexadecimal ARGB will be the fastest, as it won't require a conversion.
:::

### Texture clipping
Textures can be clipped. This means that, instead of the full texture, only a part of it is used and rendered. This 
allows you to implement a way of using spritemaps, for example.

| Property | Type | Default | Notes |
| -------- | ---- | ------- | ------ |
| `clip-x` | `number` | `0.0` | Horizontal clipping position (in pixels) |
| `clip-y` | `number` | `0.0` | Vertical clipping position (in pixels) |
| `clip-w` | `number` | `0.0` | Horizontal clipping size (in pixels); when set to `0`, the texture width is used |
| `clip-h` | `number` | `0.0` | Vertical clipping size (in pixels); when set to `0`, the texture height is used |
| `pixel-ratio` | `number` | `1.0` | The pixel ratio of the texture. This 'scales' the texture. |

> Notice that if the clipping region expands the actual texture source's bounds, they are capped on those bounds.

> Clipping coordinates are `pixel-ratio` dependent.

## Clipping
The `clipping` property results in the same effect as `overflow:hidden` in CSS. 

> In Vugel, clipping is implemented using the WebGL `scissor()` operation. It is incredibly fast, but it doesn't support
> non-rectangular shapes. This means that the `clipping` property won't work when the Vugel node (or one of its ancestors) 
> is rotated. In this case `render-to-texture` can be used, which doesn't have this limitation. It achieves clipping by 
> rendering the node to a separate texture and that makes it a bit slower.

## Z-Index
Defines the stacking order of elements, behaves exactly like its' CSS counterpart. You can use the `z-index` property, 
which takes a (floating point) number, to define a z-index. Notice that it is also possible to set a negative number, which means
that the texture should be 'behind' the z-index context root's texture (if it has one). 

In CSS there are several rules for when a **z-index context** is created. In Vugel, a node is a z-index context if (and 
only if):
* non-zero `z-index` is specified
* `force-z-index-context` is set to `true`
* `render-to-texture` is enabled

## Lifecycle Events
There are a couple of Node lifecycle-related methods available.

Example usage: `<container @attach="doSomething">...</container>`.

| Name | Event argument | Description |
| ---- | -------------- | ----------- |
| attach | `{ node: Node; stage: Stage }` | Node becomes attached to the render tree |
| setup | `{ node: Node; stage: Stage }` | Node becomes attached to the render tree for the first time | 
| detach | `{ node: Node; stage: Stage }` | Node becomes (no longer attached from the render tree) |
| enabled | `{ node: Node; stage: Stage }` | Node becomes (attached and visible) |
| disabled | `{ node: Node; stage: Stage }` | Node is no longer (attached and visible) |
| active | `{ node: Node; stage: Stage }` | Node becomes (attached and visible and within *visible bounds*) |
| inactive | `{ node: Node; stage: Stage }` | Node is no longer (attached and visible and within *visible bounds*) |
| texture-error | `{ node: Node; stage: Stage; texture: Texture; error: Error }` | An error occurred while loading the texture of this node |
| texture-loaded | `{ node: Node; stage: Stage; texture: Texture }` | Texture of this node was loaded |
| texture-unloaded | `{ node: Node; stage: Stage; texture: Texture }` | Texture of this node was unloaded (garbage collected) |

> Visible bounds uses the viewport size and clipping to determine which elements are (partly) on screen. An additional 
> *visible bounds margin* can be set using the `bounds-margin` property. 

## UI Events
Vugel attempts to offer UI Events that are similar to DOM UI events.

However, there are some differences.

Every event has a different type than the original event. It was chosen to do it this way as to be able to ensure that 
the expected behavior is actually followed.

A `VugelEvent` has the following properties:

- `cancelBubble: boolean`: Set to `true` to cancel event bubbeling.
- `currentTarget: Node | null`: 'This' node (while bubbeling).
- `target: Node | null`: The event target node (while bubbeling).
- `type: string`: The event name
- `originalEvent: Event`: The original DOM Event is available using the `originalEvent` property.

> In HTML you can invoke `event.preventDefault()` to disable the default event. The same can be done in Vugel using `event.originalEvent.preventDefault()`.

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

> To get the relative offset to the event handling node use: `e.currentTarget!.getLocalOffset(e.canvasOffsetX, e.canvasOffsetY)`.

### Touch events
Touch events are not supported in the regular sense. Instead, we provide basic touch support by converting the first 
touch and translating it to the corresponding mouse event. 

### Focus events
Vugel allows one node to be the *focused* node. The focused node, like in HTML, reveices keypresses.
You may set the focus by obtaining a reference to the node (using template refs) and invoking the `focus()` method:
`myRef.value.focus()` 

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

You can find the key-related details in the `originalEvent`.