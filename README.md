# Full Stack Open

The University Of Helsinki course: [FullStackOpen](https://fullstackopen.com/)

## Web Developer's Oath
The Web Developer's Oath within the course is a list of tips to make your life, and other developers working with you much easier when learning and developing applications.
This will increase over time, so will be continously updated

**Programming is hard, that is why I will use all the possible means to make it easier**
- I will have my browser developer console open all the time
- I progress with small steps
- I will write lots of `console.log` statements to make sure I understand how the code behaves and to help pinpointing problems
- If my code does not work, I will not write more code. Instead I will start deleting the code until it works or just return to a state when everything was still working
- When I ask for help in the course Discord or elsewhere I formulate my questions properly.

## Part 1: Introduction to React

### Introduction To React

Firstly, what is React? React is a JavaScript library used for building user interfaces, with its main 'selling point' beinng that we create our application with components.
That means we can split each part of a web app or page into multiple different components and then combine them altogether in order to create our web app.

The easiest way to create a React App is by using the `create-react-app` command:

```
npx create-react-app test
cd test
```

This initializes a directory called `test`, and downloads all the necessary packages which will be used in creating the react project.
We then follow up with running the application by running `npm start`. Our app, by default, will be hosted locally at `http://localhost:3000`.

#### React Components

At the beginning we briefly defined that React is known for creating components within its app - but what exactly are they?

In React, components are simply our building blocks for the UI - User Interface. Usually, when writing HTML, we would have a layered structure for the DOM, for example a section with divs inside it.
When using React, we instead define the components which will have the HTML already inside it, using JSX - JavaScript XML.
`JSX` allows us to combine both HTML and JavaScript within the same code, and in turn becomes compiled using Babel, which compiles JSX components into pure JavaScript.
Since JSX is `XML-like`, every tag needs to be closed, i.e. if we have an `<img>` tag either create a self closing tag, or add a closing to it.

One of the best things about components in React is the fact we can reuse the same code multiple times.
However, what if we need the same style or design but with different data inside the component?
That is when React props come in handy.
Every parent component can pass data, in the form of props, to its child component, and these can be any form of data that we can store using JavaScript.
In order to pass specific props to a component we simply just add the variable name of the props, and its value - if this is a variable we use curly brackets:

```JS
const exampleVariable = [1,2,3,4];
    return (
        <Example
        propOne = {1}
        propTwo = {exampleVariable}
        />
    );
```

Now, inside the component itself, we read the props by defining them within the input of our component:

```JS
function Example({propOne, propTwo}) {
    // Component stuff
}
```

Another way we can read components is simply by defining the input as an object, from which we can read all the possible properties it contains by destructuring:

```JS
const Example = (props) => {
    return (
        <div>
        {props.propOne}
        {props.propTwo}
        </div>
    )
}
```

Another way to destructure the variables would be like so:

```JS
const Example = (props) => {
    const [propsOne, propsTwo] = props;
}
```

Note how yet again we are using curly brackets to reference the variables - this is key in JSX as it separates markup text from any variables we might want to pass on.

#### Some quick notes and remarks

One of the best things React does is it states very clear error messages - however that should not stop us from constant error checking and debugging.
A good practice, as with all other coding and programming, is making sure we have plenty `console.log()` statements to see it's working as intended, and of course: KEEPING THE BROWSER CONSOLE OPEN AT ALL TIMES!

Another thing to note when using React components - their names MUST be capitalized, as it will possibly confused the React component with a HTML tag.

Also, every React component should have a root element, i.e. a parent element - an easy way of doing this is storing the entire component as a `div`, or a empty tag `<></>`, i.e. creating fragments which will prevent our DOM tree to be flooded with extra `div` elements.

One final remark before we move on - Do Not Render Objects in components. The data passed on into a component should be primitive values - strings, numbers etc, as well as arrays but only those containing those allowed primitive values inside it.

### JavaScript

Since React is a JavaScript library, it will be useful to quickly recap and go over some important features of JS that we will be using with React

#### Variables

We can assign variables in JS using three different ways:

- `const` which assigns a constant value, and its valued cannot be changed - immutable
- `let` defines a block scoped variable, i.e. within the same block as we are currently working in
- `var` defines a function scoped variable which value we can change, or when declared outside of a function it is global.

#### Arrays

Arrays are used to store different types of data in a list, which within JS have many useful methods.
`forEach`, `map`, `reduce` and `filter` are some of the most commonly used ones, and their use will be extremely helpful when using React.

#### Objects

We previously saw that we MUST NOT use objects as props, as this in turn will error, however we can use the individual values of an object.
Objects will be really useful for us when storing any large chunks of data, as it allows us to store specific information which we can call.

#### Functions

We can define a function in many different ways, most commonly the arrow functions:

```JS
const sum = (p1, p2) => {
    return p1 + p2;
}
```

Throughout the course, majority of the functions will be defined using the arrow syntax.

#### Object methods, "this" and Classes

We will soon be introduced to React Hooks, which will replace the need for defining objects with methods, however it will still be worth covering it.
When we create an object, we can either define a property for it to store a value, or a method to do an action, or run a function.
We can then call that method on the object in order to specifically use that function with the data inside the object, as an example:

```JS
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet();
```

In our case here, we use `this` to reference the object, however this differs when we use arrow function and normal function definitions.

Although JS is not an object-orientated programming language, with ES6 came the introduction of classes to JavaScript.
Defining classes is quite intuitive, and they behave similary to objects in some ways - but we can use a class in order to extend it to multiple objects.
So classes, are a bit like React Components, where we can reuse them with our data.

### Component state, event handlers

#### Component helper functions and destructuring

We can create logic within our components before we return the HTML & JS mix, and then use it to alternate our data and output.

Destructuring is a JavaScript expression using which we can unpack multiple values from an array or an object into separate variables.
It will come greatly useful when related to React props as we can destructure the general props object into separately stored variables.
Here is an example [from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```JS
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// Expected output: 10

console.log(b);
// Expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// Expected output: Array [30, 40, 50]

```

So, we can destructure our props in two different ways:

```JS
// First way
const Example = (props) => {
    const {propOne, propTwo} = props;
};

// Second way
const AnotherExample = ({propOne, propTwo}) => {};
```

#### Stateful components and event handling

We can now move onto the idea of `state` in React, and with that one of the first [React hook](https://react.dev/reference/react).
Hooks are essentially different features we can use within React, and later on we will also be able to combine different hooks in hope to create our own ones.
The State Hook's main purpose is to store or 'remember' information within a component.
So, an example of this would be a form component using the state to store the input value of the form, either for an individual value or the entire form in JSON form.

In order to use the State Hook we need to do two things:
- Import the hook from React:
```JS
import { useState } from 'react';
```
- Initialize the hook in the following form:
```JS
const [state, setState] = useState(initialState);
```
Where `state` is the value reference to our state, `setState` allows us to change the value of our state and `initialState` is the beginning value at the time of rendering the app.


## Part 2: Communicating with the server

## Part 3: Programming a server with NodeJS and Express

## Part 4: Testing Express servers, user administration

## Part 5: Testing React Apps
