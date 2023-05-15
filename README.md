# fullstackopen

The University Of Helsinki course: [FullStackOpen](https://fullstackopen.com/)

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


## Part 2: Communicating with the server

## Part 3: Programming a server with NodeJS and Express

## Part 4: Testing Express servers, user administration

## Part 5: Testing React Apps
