# react basic

## Always start component names with a capital letter

React treats components starting with lowercase letters as DOM tags. For example, &lt;div /&gt; represents an HTML div tag, but &lt;Welcome /&gt; represents a component and requires Welcome to be in scope.

You can read more about the reasoning behind this convention here.

## Event bind function

* use class methods

In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.

* use arrow function

```jsx
<button onClick={(e) => this.handleClick(e)}>
  Click me
</button>
```

However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.