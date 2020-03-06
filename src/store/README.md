Although having a limited scope to act upon, from what I can see it's very unlikely that you
would have an app that would render just a screen, and would had a single funcionality like this.
Having this in mind, I designed the app archictecture to resemble more an real App, by this
meaning that scalability and reusability was taken in accountability.

For the redux structure, I've chosen to group up reducers, middleware and selectors by module.
In my opinion, modularizing the redux structure this way, a kind of separation of concerns,
helps a lot with maintainability in the a sense that you retain correlated parts together, avoiding
unwanted collateral effects when adding and editing code.

