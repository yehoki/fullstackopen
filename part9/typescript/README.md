# TypeScript

## Background and Introduction
So, what is TypeScript? Sounds similar to JavaScript, and it actually is, as it gets transformed into JavaScript before being properly compiled - it's a superset of JavaScript, meaning it has everything JavaScript has but a bit more stuff with it, kind of like this:
```
---------------------------------- 
|             TypeScript         |
|   ------------------------     |
|   |        JavaScript     |    |
|   |                       |    |
|   ------------------------|    |
|                                |
----------------------------------

```

### Main Principle
As we mentioned already, TypeScript is a superset of JavaScript, and eventually it gets compilled into plain JavaScript.
**Note: From now on we refer to TypeScript and JavaScript as TS and JS respectively.**

TS has 3 main parts to it:
- The language, its syntax keywords and types.
- The compiler, responsible for taking out the type information and code transformations before being transpiled (source-to-source compilation).
- The language service which collects the type information from our code, and allow dev tools to assist with our code in write-time.

### Key Features
So why should TS appeal to anyone, apart from just being a potential JS alternative? Let's take a look at some of its main features

#### Type annotations
If you've ever heard or came across TS this will be the main reason why - typing. Not keyboard typing, but typing of variables and functions.
It's a way to agree on the type being used, see here in the example from [FullStackOpen](https://fullstackopen.com/en/part9/background_and_introduction#main-principle):
```JS
const birthdayGreeter = (name: string, age: number): string => {
    return `Happy birthday ${name}, you are now ${age} years old!`;
}
const birthday = "User";
const age = 22;

console.log(birthdayGreeter(birthday, age));
```
We can see two main parts to it: there is a type to each parameter entered to the function, and there is an expected return type.
Now, whenever this function is invoked, it will check the type of the input and potentially error before compiling if it's not agreeing with what we declared.
Similarly, if we pass the function value somewhere else, we need to make sure it accepts strings.

#### Structural typing
TS is a structurally-typed language, meaning that two elements are considered to be compatible with one another if for every feature within the type of the first element, a corresponding and identical feature exists within the type of the second element.
They are considered to be identical if they are compatible with each other.

#### Type inference
The TS compiler attempts to infer the type information, in the case where no information is specified when intializing variables, setting parameter default values and determining function return types.

#### Type erasure
As we mentioned before, when TS gets transpiled into JS it removed all types from its code, so no type information remains at runtime, however it's safe enough to compile by checking everything prior to compilation.

### Why should I use TypeScript?
Many people are either for or against TS, but having seen the main features you can judge for yourself if it feeds your personal needs.
With that being said, here are some more reasons for it:

1. TS offers type checking and static code analysis, where we can require values to be of a specific type meaning less runtime errors and potentially reduce the number of unit tests necessary as we won't need to check 'if function xyz() returns a string'. The static code analysis warns us about using the wrong types, but also about mispelinng variables or trying to use a function outside its scope.

2. Type annotating might seem annoying and long at first, but the truth is it acts as a sort of documentation to the code itself. It makes the code more readable and explicit to the reader, not having to wonder what goes in and out of a function or what to expect to happen.

3. IDEs can provide more specific information regarding your code, whether it is during errors or mistakes.

