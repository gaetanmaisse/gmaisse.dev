---
title: "Exhaustive Type Checking with Zod"
description: "Embrace Exhaustive Type Checking with Zod's Discriminated Unions"
date: "2024-02-20"
categories:
  - blog
tags:
  - TypeScript
  - Zod
cover: "covers/exhaustive-type-checking.jpg"
---

As a TypeScript developer, ensuring that your code is robust and error-free is paramount. One of the most powerful tools
to achieve this is Zod's discriminated union feature, particularly for its exhaustive type checking capability.

## 📚 What is Zod?
Zod is a TypeScript-first schema declaration and validation library. It allows you to define your data types and
validate them at runtime, enhancing type safety and reducing bugs.
 
## 👮 Discriminated Unions in Zod
A discriminated union is a type that enables an object to be one of several defined types, each identified by a common
property, known as a "tag" or "discriminator". This facilitates easy differentiation between the types at runtime.

## ✨ Why Exhaustive Type Checking?

**Ensures Comprehensive Handling**: Exhaustive type checking guarantees that you handle every possible case in a union. This
prevents unhandled cases, making your code more reliable and preventing unexpected errors.

**Enhanced Type Safety**: By verifying that each object conforms to one of the specified types, exhaustive type checking
catches errors at compile time. This ensures that your code is robust and less prone to bugs.

**Clear and Maintainable Code**: Explicitly defining all possible types makes your code easier to read and maintain. It’s
clear what kinds of objects your code can handle, which aids in both development and debugging.

**Improved Error Handling**: With exhaustive type checking, you can handle errors and edge cases more gracefully. Knowing
exactly what types of data you are dealing with allows for more precise error management.

## Example Use Case

Consider a form that can submit different types of content: `text` or `image`. With Zod, you can define a
discriminated union to validate the form input and ensure exhaustive type checking.

First, let's define the schemas for each content type:

```ts
import { z } from 'zod';

const TextContent = z.object({
  type: z.literal('text'),
  text: z.string(),
});

const ImageContent = z.object({
  type: z.literal('image'),
  url: z.string().url(),
});

const Content = z.union([TextContent, ImageContent]);
type Content = z.infer<typeof Content>;
```

Then you can use the `Content` schema to validate the form data and ensure exhaustive type checking:

```ts
// Exhaustive type checking
function handleContent(content: Content) {
  switch (content.type) {
    case 'text':
      // handle text content
      break;
    case 'image':
      // handle image content
      break;
    default:
      // Ensures exhaustive checking
      assertNever(content); 
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}
```

If we add `VideoContent` to the `Content` union: 

```ts
import { z } from 'zod';

const TextContent = z.object({
  type: z.literal('text'),
  text: z.string(),
});

const ImageContent = z.object({
  type: z.literal('image'),
  url: z.string().url(),
});

const VideoContent = z.object({
  type: z.literal('video'),
  url: z.string().url(),
  duration: z.number().positive(),
});

const Content = z.union([TextContent, ImageContent, VideoContent]);
type Content = z.infer<typeof Content>;
```

The TypeScript compiler will enforce that we handle all possible cases in the switch statement, ensuring that our code is robust and error-free:

```ts
function handleContent(content: Content) {
  switch (content.type) {
    case 'text':
      // handle text content
      break;
    case 'image':
      // handle image content
      break;
    default:
      // Ensures exhaustive checking
      // Error: Argument of type 'Content' is not assignable to parameter of type 'never'
      assertNever(content); 
  }
}
```

By using Zod's discriminated unions, you can leverage exhaustive type checking to make your TypeScript projects more
reliable and maintainable. If you haven't tried it yet, now is the perfect time to experience the benefits firsthand!
